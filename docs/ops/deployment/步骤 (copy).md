## 部署





```bash
# 所有相关文件放到目录/mydata/deployment下
# docker-29.1.2.tgz  git_latest.tar  maven_3.9.11.tar  my.cnf         nginx_1.22.tar  server_info.sh docker.service     jdk_21.tar      mime.types        mysql_8.2.tar  nginx.conf node_24.12.tar
# 压缩 
tar -zcf /mydata/mydata.tar.gz /mydata/deployment/*
# 进入部署服务器(内网)，通过scp下载mydata.tar.gz 121.237.178.252 YFZX2025@
mkdir /mydata && cd /mydata && scp root@121.237.178.252:/mydata/mydata.tar.gz /mydata
# 解压mydata.tar.gz到/mydata/deployment
tar -zxf /mydata/mydata.tar.gz -C /mydata/deployment/
```

### 执行脚本

```bash
# 1. 递归创建所有目录（-p 自动创建父目录，已存在则不报错）
mkdir -p \
/mydata/deployment \
/mydata/backup/logs \
/mydata/backup/jar \
/mydata/backup/mysql \
/mydata/environment/docker \
/mydata/environment/git/.ssh \
/mydata/environment/maven \
/mydata/environment/nginx \
/mydata/environment/node/node_modules \
/mydata/environment/node/repositories \
/mydata/environment/mysql/conf \
/mydata/environment/mysql/data \
/mydata/environment/mysql/logs \
/mydata/project/scsmp-java/code \
/mydata/project/scsmp-java/files \
/mydata/project/scsmp-java/logs \
/mydata/project/scsmp-java/jars \
/mydata/project/scsmp-vue/code \
/mydata/project/scsmp-vue/jars \
/mydata/project/scsmp-vue/dist \
/mydata/project/scsmp-vue/logs \
/mydata/project/scsmp-vue/conf \
/mydata/project/scsmp-h5/code \
/mydata/project/scsmp-h5/jars \
/mydata/project/scsmp-h5/dist \
/mydata/project/scsmp-h5/logs \
/mydata/project/scsmp-h5/conf;
# 2. 初始化空的服务器信息文件
touch /mydata/backup/server_info.txt
# 3. 目录放开写入权限
chmod -R 775 /mydata
# 进入部署服务器(内网)，通过scp下载mydata.tar.gz
scp root@121.237.178.252:/mydata/mydata.tar.gz /mydata
# 解压mydata.tar.gz到/mydata/deployment
tar -zxf /mydata/mydata.tar.gz -C /
# 解压docker安装包
tar -zxf /mydata/deployment/docker-29.1.2.tgz -C /mydata/environment
# 将解压后的 docker 文件移到 /usr/bin 目录下
sudo cp /mydata/environment/docker/* /usr/bin/
# 将 docker 注册成系统服务 
sudo cp /mydata/deployment/docker.service /etc/systemd/system
# 给服务文件增加可执行权限并重载系统服务
chmod +x /etc/systemd/system/docker.service
systemctl daemon-reload 
# 设置 docker 开机自启动
systemctl enable docker.service
# 启动 docker 服务
systemctl start docker
# 测试 docker 是否启动成功
sudo systemctl status docker
# 导入docker镜像
docker load -i /mydata/deployment/mysql_8.2.tar
docker load -i /mydata/deployment/jdk_21.tar
docker load -i /mydata/deployment/nginx_1.22.tar
docker load -i /mydata/deployment/git_latest.tar
docker load -i /mydata/deployment/maven_3.9.11.tar
docker load -i /mydata/deployment/node_24.12.tar
# 查看docker镜像
docker images
# 配置 git 密钥 
sudo cp /mydata/deployment/id_rsa /mydata/environment/git/.ssh
sudo cp /mydata/deployment/id_rsa.pub /mydata/environment/git/.ssh
chmod 700 /mydata/environment/git/.ssh
chmod 600 /mydata/environment/git/.ssh/id_rsa
chmod 644 /mydata/environment/git/.ssh/id_rsa.pub
# 拉取源码 docker stop git_scsmp_vue && docker rm git_scsmp_vue
docker run --rm \
  --user root \
  --name git_scsmp_vue \
  --entrypoint /bin/sh \
  -v /mydata/environment/git/.ssh:/root/.ssh \
  -v /mydata/project/scsmp-vue/code:/code \
  -w /code \
  alpine/git:latest \
  -c "
    if [ -d \"/code/.git\" ]; then
      GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git pull;
    else
      GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-vue.git .;
    fi
  ";
docker run --rm \
  --user root \
  --name git_scsmp_h5 \
  --entrypoint /bin/sh \
  -v /mydata/environment/git/.ssh:/root/.ssh \
  -v /mydata/project/scsmp-h5/code:/code \
  -w /code \
  alpine/git:latest \
  -c "
    if [ -d \"/code/.git\" ]; then
      GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git pull;
    else
      GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-app.git .;
    fi
  ";
docker run --rm \
  --user root \
  --name git_scsmp_java \
  --entrypoint /bin/sh \
  -v /mydata/environment/git/.ssh:/root/.ssh \
  -v /mydata/project/scsmp-java/code:/code \
  -w /code \
  alpine/git:latest \
  -c "
    if [ -d \"/code/.git\" ]; then
      GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git pull;
    else
      GIT_SSH_COMMAND='ssh -o StrictHostKeyChecking=no' git clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-admin.git .;
    fi
  ";
# node编译vue源码
cat > /mydata/node/repositories << 'EOF'
https://mirrors.aliyun.com/alpine/v3.23/main/
https://mirrors.aliyun.com/alpine/v3.23/community/
EOF
# node编译前备份
echo "【备份】开始备份dist目录..."
zip -q -r project/scsmp-vue/jars/dist_$(date +"%Y%m%d_%H%M%S").zip project/scsmp-vue/dist/
# 检查备份是否成功，失败则直接退出
if [ $? -ne 0 ]; then
    echo "【错误】dist目录备份失败，终止编译流程！"
    exit 1
fi
echo "【备份】dist目录已成功备份至 /mydata/git/jars/dist_20251215.zip"

# node编译vue源码
docker run -it --rm \
  --user root \
  --name node_scsmp_vue \
  --entrypoint /bin/sh \
  -v /mydata/git/code:/code \
  -v /mydata/node1/repositories:/etc/apk/repositories \
  node:24.12.0-alpine \
  -c "
    apk add --no-cache libc6-compat git && \
    cd /code && \
    npm config set registry https://registry.npmmirror.com && \
    npm install && \
    npm run build
    ";
# node编译失败，还原备份
# ==================== node编译失败，还原备份 ====================
# 判断编译命令是否失败（$? 为0表示成功，非0表示失败）
if [ $? -ne 0 ]; then
    echo "【编译】vue源码编译失败，开始还原备份..."
    
    # 先清理编译失败的dist目录（避免残留文件）
    if [ -d "/mydata/git/dist" ]; then
        rm -rf /mydata/git/dist/* || {
            echo "【错误】清理编译失败的dist目录失败！"
            exit 1
        }
    fi
    
    # 解压备份文件还原（-o 覆盖已有文件、静默输出）
    unzip -o /mydata/git/jars/dist_20251215.zip -d /mydata/git/ > /dev/null 2>&1
    # 检查还原是否成功
    if [ $? -eq 0 ]; then
        echo "【还原】dist目录已从备份文件还原成功！"
    else
        echo "【错误】备份文件还原失败，请检查备份文件是否存在！"
        exit 1
    fi
else
    echo "【编译】vue源码编译成功！"
fi

# 导出主依赖+插件依赖（SpringBoot打包依赖插件），包含传递依赖，同时导出pom文件
mvn clean dependency:copy-dependencies dependency:resolve-plugins -DoutputDirectory=/mydata/maven/maven-deps  -DincludeScope=runtime -Dtransitive=true -DcopyPom=true -DexcludeTypes=pom

tar -zcf /mydata/maven/maven-jar.tar.gz /mydata/java/maven-jar
tar -zxf /mydata/maven/maven-jar.tar.gz -C /mydata/maven/maven-jar
mv /mydata/maven/maven-jar/mydata/java/maven-jar/* /mydata/maven/maven-jar
rm -rf /mydata/maven/maven-jar/mydata

# maven编译java源码
docker maven 3.9.11-amazoncorretto-21-debian
源码/mydata/git/code
仓库/mydata/maven/maven-jar
docker run -it --rm \
  --user root \
  --name maven_scsmp_java \
  --entrypoint /bin/sh \
  -v /mydata/git/code:/code \
  -v /mydata/maven/maven-jar:/root/.m2/repository \
  maven:3.9.11-amazoncorretto-21-debian \
  -c "cd /code && mvn clean package -DskipTests";
  
# 使用自定义 mysql 配置文件
sudo cp /mydata/deployment/my.cnf /mydata/environment/mysql/conf
# 启动 mysql 容器
docker run \
--name mysql8.2 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=zhao_new@sina.com863 \
-e MYSQL_USER=wencong \
-e MYSQL_PASSWORD=wencong863 \
-v /mydata/environment/mysql/logs:/var/log/mysql \
-v /mydata/environment/mysql/data:/var/lib/mysql \
-v /mydata/environment/mysql/conf:/etc/mysql/conf.d \
-p 0.0.0.0:50105:3306 \
-d mysql:8.2;
# 创建数据库 新账号 赋权，限制账号对应操作数据库权限
docker exec -it mysql8.2 /bin/bash
mysql -u wencong -p 
	# 输入密码
create database scsmp_admin;
create user 'yykj'@'%' identified by 'Hh6@yykj';
grant select,insert,delete,update on demodata.* to 'demouser'@'%';
flush privileges;
show grants for 'yykj'@'%';
-- 授权：仅给 user_test 授予 test_db 数据库的安全权限，排除DROP类
GRANT 
  SELECT, INSERT, UPDATE,  -- 数据操作权限（如需删行可加 DELETE，否则去掉）
  CREATE, ALTER, INDEX,    -- 表结构操作（创建表、修改表、创建/删索引）
  CREATE VIEW, SHOW VIEW   -- 视图相关权限（如需执行存储过程可加 EXECUTE）
ON test_db.* TO 'user_test'@'%'; 

SELECT, INSERT, UPDATE, CREATE, ALTER, INDEX, CREATE VIEW, SHOW VIEW 
ON scsmp%.* TO 'yykj'@'%'; 

# 启动后端服务
docker run \
    --user root \
    --name scsmp_admin_java \
    --restart unless-stopped \
    -e TZ=Asia/Shanghai \
    -p 0.0.0.0:50055:50001 \
    -v /home/scsmp/admin_java/jar:/var/jar \
    -v /home/scsmp/admin_java/files:/var/files \
    -v /home/scsmp/admin_java/logs:/var/logs \
    -d openjdk:21-jdk \
    /bin/sh -c "cd /var/jar && java -Duser.timezone=Asia/Shanghai -Dspring.profiles.active=test -jar admin_java.jar"

# 使用自定义 nginx 配置文件
sudo cp /mydata/deployment/nginx.conf /mydata/project/scsmp-vue/conf
sudo cp /mydata/deployment/mime.types /mydata/project/scsmp-vue/conf
sudo cp /mydata/deployment/nginx.conf /mydata/project/scsmp-h5/conf
sudo cp /mydata/deployment/mime.types /mydata/project/scsmp-h5/conf
# 启动 nginx 容器
docker run \
--user root \
--name scsmp_vue \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:50106:10001 \
-v /mydata/project/scsmp-vue/conf:/etc/nginx \
-v /mydata/project/scsmp-vue/dist:/usr/share/nginx \
-v /mydata/project/scsmp-vue/logs:/var/log/nginx \
-v /mydata/project/scsmp-java/files:/var/files \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22;

docker run \
--user root \
--name scsmp_h5 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:50107:10001 \
-v /mydata/project/scsmp-h5/conf:/etc/nginx \
-v /mydata/project/scsmp-h5/dist:/usr/share/nginx \
-v /mydata/project/scsmp-h5/logs:/var/log/nginx \
-v /mydata/project/scsmp-java/files:/var/files \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22;

后端 50101
前端vue 50103
前端h5 50104
mysql 50105


```

### 解决大日志

`logrotate` 是 Linux 系统自带的日志轮转工具，可按「大小 / 时间」切割日志、压缩旧日志、自动删除过期日志，完美解决 `error.log` 过大问题。

#### 1. 创建 logrotate 配置文件

```bash
# 新建MySQL日志轮转配置（命名为mysql，放在logrotate默认目录）
vim /etc/logrotate.d/mysql
```

#### 2. 写入轮转规则（适配 MySQL 8）

```conf
# 要轮转的日志文件（对应my.cnf中的error.log路径）
/var/log/mysql/error.log /var/log/mysql/slow.log {
    daily               # 按天轮转（可选：weekly/monthly，或size 100M按大小轮转）
    rotate 30           # 保留30份旧日志（超过则删除）
    compress            # 压缩旧日志（.gz格式，节省空间）
    delaycompress       # 延迟压缩（保留最新的1份未压缩日志，方便查看）
    missingok           # 日志文件不存在时不报错
    notifempty          # 日志为空时不轮转
    create 640 mysql mysql  # 轮转后新建日志文件，权限640，属主mysql:mysql
    postrotate          # 轮转后执行的命令（通知MySQL重新加载日志，避免日志写入失效）
        if [ -f /var/run/mysqld/mysqld.pid ]; then
            kill -USR1 $(cat /var/run/mysqld/mysqld.pid)
        fi
    endscript
}
```

