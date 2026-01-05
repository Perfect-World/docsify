## Mysql安装

#### 配置文件

```bash
# cp /yykj/deployment/mysql-config/my.cnf /yykj/environment/mysql/conf/
```

#### 创建容器 
> 注意替换root密码
>

```bash
docker run \
--name mysql8.2 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=zhao_new@sina.com \
-e MYSQL_USER=wencong \
-e MYSQL_PASSWORD=wencong863 \
-v /yykj/environment/mysql/logs:/var/log/mysql \
-v /yykj/environment/mysql/data:/var/lib/mysql \
-v /yykj/environment/mysql/conf:/etc/mysql/conf.d \
-p 0.0.0.0:50061:3306 \
-d mysql:8.2;
```

#### sql语句

```bash
# 进入容器
docker exec -it mysql8.2 /bin/bash
# 登录 回车键后 输入密码 zhao_new@sina.com
mysql -u root -p 
# 创建数据库 新账号 赋权，限制账号对应操作数据库权限
create database scsmp_prod;
# 创建账号 %表示可远程
create user 'yykj'@'%' identified by 'Hh6@yykj';
# 赋权, GRANT 权限1,权限2,…权限n ON 数据库1.表1,数据库2.表2, TO 用户名@用户地址
grant all on *.* to 'yykj'@'%';
# 刷新权限 可切换账号验证
flush privileges;
show grants for 'yykj'@'%';
```

#### 插入基础数据

```bash

```

#### 注意

1.创建容器前，保证/yykj/environment/mysql/data为空

2.端口号不冲突
