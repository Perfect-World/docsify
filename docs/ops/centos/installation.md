# linux安装mysql8

> 安装步骤，主从配置，官方表示 MySQL 8 要比 MySQL 5.7 快 2 倍

## 安装步骤

- 登录linux服务器之后，切换到 /use/local下

```linux
cd /usr/local
```

- 创建mysql文件夹

```linux
mkdir mysql
```

- 切换到mysql文件夹下

```linux
cd mysql
```

- 下载mysql8.0安装包（官网地址：https://downloads.mysql.com/archives/community/）

```linux
wget https://cdn.mysql.com/archives/mysql-8.0/mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz
```

- 解压mysql8.0安装包（切换到/use/local/mysql文件夹下）

```linux
tar -xvJf mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz 
```

- 重命名解压出来的文件夹（这里改成mysql8）

```linux
mv mysql-8.0.27-linux-glibc2.12-x86_64 mysql8
```

- 创建data文件夹（ 存储文件，/use/local/mysql文件夹下创建）

```linux
mkdir data
```

- 分别创建用户组以及用户和密码（如果提示已存在说明之前有创建过了）

```linux
groupadd mysql
useradd -g mysql mysql
```

- 授权刚刚新建的用户

```linux
chown -R mysql.mysql /usr/local/mysql/mysql8
chmod 750 /usr/local/mysql/data -R
```

- 配置环境，编辑/etc/profile文件

```linux
vim /etc/profile
```

- 在最后一行加（新手提示：按“i”后编辑，添加完之后，按“esc”，打出“:wq”，用来保存文件并退出）

```linux
export PATH=$PATH:/usr/local/mysql/mysql8/bin:/usr/local/mysql/mysql8/lib
```

- 创建mysql配置文档（/etc/my.cnf）

```linux
vim /etc/my.cnf
```

- 把下面复制进去，#开头为注释，注意port、bind-address、user

```linux
[mysql]
default-character-set=utf8mb4
[client]
port=50001
socket=/var/lib/mysql/mysql.sock
default-character-set=utf8

[mysqld]
port=50001
bind-address=0.0.0.0
server-id=1
user=mysql
general_log = 1
general_log_file= /var/log/mysql/mysql.log
socket=/var/lib/mysql/mysql.sock
basedir=/usr/local/mysql/mysql8
datadir=/usr/local/mysql/data
log-bin=/usr/local/mysql/data/mysql-bin
innodb_data_home_dir=/usr/local/mysql/data
innodb_log_group_home_dir=/usr/local/mysql/data/
character-set-server=utf8mb4
lower_case_table_names=1
autocommit=1
default_authentication_plugin=mysql_native_password
symbolic-links=0
# Disabling symbolic-links is recommended to prevent assorted security risks
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd

[mysqld_safe]
log-error=/usr/local/mysql/data/mysql.log
pid-file=/usr/local/mysql/data/mysql.pid

#
# include all files from the config directory

```

- 切换到/usr/local/mysql/mysql8/bin目录下

```linux
cd /usr/local/mysql/mysql8/bin
```

- 初始化基础信息,得到数据库的初始密码（在/usr/local/mysql/mysql8/bin目录下执行）

```linux
./mysqld --user=mysql --basedir=/usr/local/mysql/mysql8 --datadir=/usr/local/mysql/data/ --initialize
```

- 复制出初始密码，保存到本地，后面需要使用到。（如果因为路径等各种问题需要重新初始化的，需要清空上面创建的data文件，在data所在的目录下使用 rm -rf /usr/local/mysql/data 命令）

```linux
A temporary password is generated for root@localhost: 初始密码Ucr%;w0GO#Pl
```

- 复制 mysql.server 文件，在/usr/local/mysql/mysql8目录下执行

```linux
cd /usr/local/mysql/mysql8
cp -a ./support-files/mysql.server /etc/init.d/mysql 
cp -a ./support-files/mysql.server /etc/init.d/mysqld
```

- 赋予权限

```linux
chown 777 /etc/my.cnf;
chmod +x /etc/init.d/mysql;
chmod +x /etc/init.d/mysqld;
```

- 检查一下/var/lib/mysql是否存在，否则进行创建

```linux
mkdir /var/lib/mysql 
```

- 然后再赋予权限

```linux
chown -R mysql:mysql /var/lib/mysql/ 
```

- 启动数据库，有SUCCESS字眼说明MySQL安装完成

```linux
启动 service mysql start
查看状态：service mysql status
关闭命令：service mysql stop  
查看进程命令：ps -ef|grep mysql
查看端口号：lsof -i:端口号
杀掉进程： kill 进程号
```

- 将mysql命令添加到服务

```linux
ln -s /usr/local/mysql/mysql8/bin/mysql /usr/bin
```

- 登录数据库

```linux
mysql -u root -p
密码：上面步骤保存过
遇到如下错误：
[root@VM-32-10-centos bin]# mysql -u root -p
mysql: error while loading shared libraries: libtinfo.so.5: cannot open shared object file: No such file or directory
解决办法：
sudo ln -s /usr/lib64/libtinfo.so.6.1 /usr/lib64/libtinfo.so.5
```

- 修改数据库root账号的密码

```linux
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

- 执行flush privileges;使密码生效

```linux
flush privileges;
```

- 退出mysql

```linux
exit;
```

- 再次登录

```linux
mysql -u root -p
```

- 输入密码

```linux
12345678
```

- 选择数据库

```linux
use mysql;
```

- 创建账号（示例“wencong”可操作所有数据库，%可远程访问）

```linux
create user 'wencong'@'%' identified by 'password';
```

- 授予wencong所有权限（需要用root账号），并设置密码（默认的端口号改一下，root账号都不要设置远程）

```linux
grant all privileges on *.* to 'wencong'@'%';
```

- 执行flush privileges;使密码生效

```linux
flush privileges;
```

- 退出

```linux
exit;
```

- 远程连接

```linux
ip地址 端口号 用户名 密码
0.0.0.0 50001 wencong wencong863
```

- 创建新用户、新数据库，并授予权限

```linux
-- 创建用户 %表示可远程访问
CREATE user '用户名'@'%'; 
alter user '用户名'@'%' identified with mysql_native_password by '密码'; 
-- 创建新的数据库
create database 数据库名 default character set utf8mb4 collate utf8mb4_unicode_ci;
-- 把新的数据库授权给新用户
grant all privileges on 数据库名.* to '用户名'@'%';
-- 刷新权限
flush privileges; 
```

## 主从配置

为什么要用主从配置？实际根本目的是为了读写分离。https://blog.csdn.net/agonie201218/article/details/121499881

### 主从同步机制

![](https://img-blog.csdnimg.cn/img_convert/168c460e3d035ddf8169196afbca6536.png)

- slave 服务器执行 start slave，开启主从复制开关， slave 服务器的 IO 线程请求从 master 服务器读取 binlog（如果该线程追赶上了主库，会进入睡眠状态）。
- master 服务器的更新SQL(update、insert、delete)被写到binlog, 主库的 binlog dump thread，把 bin log 的内容发送到从库。
- 从库启动之后，创建一个 I/O 线程，读取主库传过来的 bin log 内容并写到 relay log（会记录位置信息，以便下次继续读取）。
- slave 服务器的 SQL 线程会实时检测 relay log 中新增的日志内容，把 relay log解析成 SQL 语句，并执行。

### 配置主服务器

- 更改配置文件，首先检查你的主服务器上的my.cnf文件中是否已经在[mysqld]模块下配置了log-bin和server-id（注意上面的log-bin和server-id的值都是可以改为其他值的，如果没有上面的配置，首先关闭mysql服务器，然后添加上去，接着重启服务器）

```linux
[mysqld]
log-bin=/usr/local/mysql/data/mysql-bin
server-id=1
```

- 创建用户，每一个从服务器都需要用到一个账户名和密码来连接主服务器，可以为每一个从服务器都创建一个账户，也可以让全部服务器使用同一个账户。下面就为同一个ip网段的所有从服务器创建一个只能进行主从同步的账户。
	首先登陆mysql，然后创建一个用户名为rep，密码为123456的账户，该账户可以被192.168.253网段下的所有ip地址使用，且该账户只能进行主从同步

```linux
create user 'wencongSync'@'%' identified by 'password';
注意 replication slave
grant replication slave on *.* to 'wencongSync'@'%';
flush privileges; 
```

- 然后执行下面的语句获取二进制日志的信息（`File`的值是当前使用的二进制日志的文件名，`Position`是该日志里面的位置信息（不需要纠结这个究竟代表什么），记住这两个值，会在下面配置从服务器时用到。）

```
mysql > show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000002 |     2117 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
```

- 数据库手动备份

### 配置从服务器

- 首先检查从服务器上的my.cnf文件中是否已经在[mysqld]模块下配置leserver-id（注意上面的server-id的值都是可以改为其他值的（建议更改为ip地址的最后一个字段），如果没有上面的配置，首先关闭mysql服务器，然后添加上去，接着重启服务器

	如果有多个从服务器上，那么每个服务器上配置的server-id都必须不一致。从服务器上没必要配置log-bin，当然也可以配置log-bin选项，因为可以在从服务器上进行数据备份和灾难恢复，或者某一天让这个从服务器变成一个主服务器）

```linux
[mysqld]
server-id=2
## 忽略表
replicate-wild-ignore-table=mysql.*
replicate-wild-ignore-table=sys.*
```

- 如果主数据库有数据现在手动导入
- 创建用户

```
create user 'wencongSync'@'%' identified by 'password';
grant all privileges on *.* to 'wencongSync'@'%';
```

- 配置同步参数，登陆mysql，输入如下信息：

```linux
change master to master_host='42.192.7.48',master_port=50001,master_user='wencongSync',master_password='password',master_log_file='mysql-bin.000002',master_log_pos=3161;
```

![连接主数据库配置图片](https://img-blog.csdnimg.cn/img_convert/886a02a6c8e6585737cb3cbeccd4a9f7.png)

- 启动主从同步进程

```linux
mysql > start slave;
停止：stop slave;
```

- 检查状态

```linux
show slave status \G
```

<img src="https://img-blog.csdnimg.cn/img_convert/611b3b76177a375211376d71106e6441.png" style="zoom:75%;" />

### 半同步复制（做不做，看实际情况，本项目未做）

```
plugin-load="rpl_semi_sync_master=semisync_master.so;rpl_semi_sync_slave=semisync_slave.so"
rpl-semi-sync-master-enabled = 1
rpl-semi-sync-slave-enabled = 1rpl_semi_sync_master_wait_no_slave = 1

第 1 行要求数据库启动时安装半同步插件；
第 2、3 行表示分别启用半同步 Master 和半同步 Slave 插件；
第 4 行表示半同步复制过程中，提交的事务必须至少有一个 Slave 接收到二进制日志。
```



## Linux下卸载MySQL8.0版本

- 关闭MySQL

```
[root@VM-32-10-centos ~]# service mysqld stop
Redirecting to /bin/systemctl stop  mysqld.service
```

- 查看当前安装mysql情况，查找以前是否装有mysql

```
[root@VM-32-10-centos ~]# rpm -qa|grep -i mysql
mysql-community-server-8.0.27-1.el8.x86_64
mysql80-community-release-el8-2.noarch
mysql-community-libs-8.0.27-1.el8.x86_64
mysql-community-client-plugins-8.0.27-1.el8.x86_64
mysql-community-common-8.0.27-1.el8.x86_64
mysql-community-client-8.0.27-1.el8.x86_64
```

- 执行命令删除安装的MySQL

```
rpm -ev mysql-community-server-8.0.27-1.el8.x86_64 --nodeps;
rpm -ev mysql80-community-release-el8-2.noarch --nodeps;
rpm -ev mysql-community-libs-8.0.27-1.el8.x86_64 --nodeps;
rpm -ev mysql-community-client-plugins-8.0.27-1.el8.x86_64 --nodeps;
rpm -ev mysql-community-common-8.0.27-1.el8.x86_64 --nodeps;
rpm -ev mysql-community-client-8.0.27-1.el8.x86_64 --nodeps;
```

- 查看之前安装的MySQL的目录并删除

```
[root@VM-32-10-centos ~]# find / -name mysql
/var/lib/selinux/targeted/active/modules/100/mysql
/var/lib/selinux/targeted/tmp/modules/100/mysql
/var/lib/mysql
/var/lib/mysql/mysql
/usr/lib64/mysql
/usr/local/minio/data/common/docsify/mysql
/usr/local/minio/data/.minio.sys/buckets/common/docsify/mysql
/usr/share/bash-completion/completions/mysql
/usr/share/selinux/targeted/default/active/modules/100/mysql
```

- 查看之前安装的MySQL的目录并删除

```
rm -rf /var/lib/mysql;
rm -rf /var/lib/mysql/mysql;
rm -rf /usr/lib64/mysql;
```

- 删除my.cnf（卸载后/etc/my.cnf不会删除，需要进行手工删除）

```
[root@VM-32-10-centos ~]# rm -rf /etc/my.cnf
```

- 最后查看一下是否卸载完毕，无结果说明卸载完成。

```
[root@VM-32-10-centos ~]# rpm -qa|grep -i mysql
```

