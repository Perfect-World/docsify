# docker nginx

## 终端

### 创建目录

```bash
# 日志
mkdir -p /mydata/nginx/${项目名}/logs
# 存放编译后项目文件目录
mkdir -p /mydata/nginx/${项目名}/code
# 配置和证书 按需修改
mkdir -p /mydata/nginx/${项目名}/conf
```

### 镜像文件

```
docker pull nginx:1.22
docker images
```

### 启动容器前准备工作

存放编译后项目文件  => /mydata/nginx/${项目名}/code

存放配置文件和证书 => /mydata/nginx/${项目名}/conf

[nginx.conf](nginx.conf) 	[mime.types](mime.types)

### 启动容器

```bash
sudo chmod -R 777 /mydata/nginx/${项目名}/*
# 启动容器
docker run \
--user root \
--name ${容器名} \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:${port}:10001 \
-v /mydata/nginx/${项目名}/conf:/etc/nginx \
-v /mydata/nginx/${项目名}/code:/usr/share/nginx \
-v /mydata/nginx/${项目名}/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
docker ps -a
```

### 访问

```bash
http://${ip}:${port}
https://${域名}:${port}
```

### 日志

#### 切割(logrotate)

> https://blog.csdn.net/weixin_45070175/article/details/124638893

/etc/logrotate.d/nginx

```bash
/mydata/nginx/${项目名}/logs/*.log {
    daily      # 每天分割一次
    size 5M    # 源文件小于5M时不分割
    rotate 30  # 保留最近30个分割后的日志文件
    create
    notifempty # 当日志文件为空时不分割
    missingok
    dateext  # 切割后的文件添加日期作为后缀
    dateyesterday # 配合dateext使用，添加前一天的日期作为分割后日志的后缀
    dateformat -%Y-%m-%d  # 格式为2022-02-08
}
```

### nginx日志导入mysql

需要先对nginx日志按日期分割

#### 进入容器

#### 下载mysql命令

```
cd
wget https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
rpm -ivh mysql80-community-release-el9-1.noarch.rpm
yum -y install mysql mysql-server mysql-devel
mysql -V
```

#### 编写mysql脚本

/mydata/nginx/sh/mysql.sh

```bash
#!/bin/sh

# 数据库信息
hostname="${host}:"
port="${port}"
username="${账号}"
password="${密码}"
dbname="${库名}"
tablename="${表名}"

# 昨天
yesterday=$(date -d "yesterday" +%Y-%m-%d-%H-%M) 
# 日志文件路径, 可以想想是否可以多个日志文件error.log
log_path="/mydata/nginx/logs/access_${yesterday}.log"
# sql语句
sql_path="/mydata/nginx/sh/insert.sql"

echo "insert into ${tablename} (字段1,字段2,...) values " > ${sql_path}

# 查看日志文件 读取行
cat $log_path | while read line
do
    if [ -n "$line" ]
    then
        value1=$line
        value2=$line
        echo "('value1','value2',...)," >> ${sql_path}

    fi
done

# 去掉最后一个符号(逗号)，加上分号
sed -i '$s/.$//' ${sql_path}
echo ";" >> ${sql_path}

# 执行sql文件
nohup mysql -h ${hostname} -P ${port} -u ${username} -p ${password} ${dbname} < ${sql_path} > /mydata/nginx/sh/mysql.log 2>&1 &

#日志清除
rm -rf ${log_path}
rm -rf ${sql_path}
```

### 设置定时任务运行脚本

```bash
# 添加相应的任务
vim /etc/crontab
# nginx日志导入mysql
10 0 * * * * root sh /mydata/nginx/sh/mysql.sh
```

### nginx视图页面

1. nginx日志导入mysql库，日志格式该调整就调整
2. 熟悉op_nginx_log表，字段该调整就调整
3. 多找些nginx监控视图，参考后，确定几个html页面
4. 根据html数据结构，确定对应的查询sql
5. 前后端联调接口
6. 提交代码，结束
