# mysql8关系型数据库

### 挂载目录

```bash
rm -rf /mydata/mysql/logs
rm -rf /mydata/mysql/data
rm -rf /mydata/mysql/conf
mkdir -p /mydata/mysql/logs
mkdir -p /mydata/mysql/data
mkdir -p /mydata/mysql/conf
sudo chmod +x /mydata/mysql/*
```

### 镜像

```bash
docker pull mysql:8.2
文档地址（需要翻墙）：https://hub.docker.com/_/mysql
docker images
```

### 使用自定义 MySQL 配置文件

```
touch /mydata/mysql/conf/my.cnf
my.cnf内容比较长，放最下面，待增加中文说明和验证
```

### 端口号

```bash
# 查看服务的运行状态：
systemctl status firewalld
# 查看防火墙开放端口
firewall-cmd --zone=public --list-ports
# 开启端口50001
firewall-cmd --zone=public --add-port=50001/tcp --permanent
# 重新载入配置信息而不中断服务：
systemctl reload firewalld
```

### 容器

```bash
# 创建容器
docker run \
--name mysql8.2 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=zhao_new@sina.com863 \
-e MYSQL_USER=wencong \
-e MYSQL_PASSWORD=wencong863 \
-v /mydata/mysql/logs:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql/conf.d \
-p 0.0.0.0:50001:3306 \
-d mysql:8.2 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_general_ci \
--collation_database=utf8mb4_general_ci \
--collation-connection=utf8mb4_general_ci \
--lower_case_table_names=1

# 查看启动日志
docker logs mysql8.2

# 停止容器 删除容器
docker stop mysql8.2
docker rm mysql8.2

# 查看容器运行状态 
docker ps --filter "name=mysql8.2"
# 查看容器的详细信息，包括容器的配置、网络设置、挂载点、进程状态
docker inspect 容器id

$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
其中some-mysql是要分配给容器的名称，my-secret-pw是要为 MySQL root 用户设置的密码，tag是指定所需 MySQL 版本的标签。请参阅上面的列表以获取相关标签。
许多配置选项可以作为标志传递给mysqld. 这将使您能够灵活地自定义容器，而无需文件cnf。例如，如果您想要更改所有表的默认编码和排序规则以使用 UTF-8 ( utf8mb4)，只需运行以下命令：
```

### 操作数据库

#### 容器

```bash
# 进入容器
docker exec -it mysql8.2 /bin/bash
# 登录 回车键后 输入密码
mysql -u root -p 
# 查看当前用户表
select user,host from mysql.user;
# 查看默认账号wencong权限
show grants for 'wencong'@'%';
# 给默认账号wencong赋权
grant all on *.* to 'wencong'@'%' with grant option;
# 刷新权限 可切换账号验证
flush privileges;

# 创建数据库 新账号 赋权，限制账号对应操作数据库权限
create database demodata;
# 创建账号 %表示可远程
create user 'demouser'@'%' identified by 'demopassword';
# 赋权, GRANT 权限1,权限2,…权限n ON 数据库1.表1,数据库2.表2, TO 用户名@用户地址
grant select,insert,delete,update on demodata.* to 'demouser'@'%';
# 刷新权限 可切换账号验证
flush privileges;
show grants for 'demouser'@'%';

# 实际项目
create database admin_net;
create user 'admin_net'@'%' identified by 'admin_net';
grant all on admin_net.* to 'admin_net'@'%' with grant option;
flush privileges;
show grants for 'admin_net'@'%';
```

#### my.cnf

```
###########################################################################
##客户端参数配置
###########################################################################
[client]
port	= 3306
socket	=/var/lib/mysql/mysqld.sock

[mysql]
#prompt="\u@mysqldb \R:\m:\s [\d]> "
#关闭自动补全sql命令功能
no-auto-rehash

###########################################################################
##服务端参数配置
###########################################################################
[mysqld]
port	= 3306
datadir	= /var/lib/mysql
socket	= /var/lib/mysql/mysqld.sock
log-error = /var/log/mysql/error.log
pid-file = /var/lib/mysql/mysqld.pid

#只能用IP地址检查客户端的登录，不用主机名
skip_name_resolve = 1

#若你的MySQL数据库主要运行在境外，请务必根据实际情况调整本参数
default_time_zone = "+8:00"

#数据库默认字符集, 主流字符集支持一些特殊表情符号（特殊表情符占用4个字节）
character-set-server = utf8mb4

#数据库字符集对应一些排序等规则，注意要和character-set-server对应
collation-server = utf8mb4_bin

#设置client连接mysql时的字符集,防止乱码
init_connect='SET NAMES utf8mb4'

#是否对sql语句大小写敏感，1表示不敏感
lower_case_table_names = 1

# 执行sql的模式，规定了sql的安全等级, 暂时屏蔽，my.cnf文件中配置报错
#sql_mode = STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
sql_mode = ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

#事务隔离级别，默认为可重复读，mysql默认可重复读级别（此级别下可能参数很多间隙锁，影响性能）
transaction_isolation = READ-COMMITTED

#TIMESTAMP如果没有显示声明NOT NULL，允许NULL值
explicit_defaults_for_timestamp = true

#它控制着mysqld进程能使用的最大文件描述(FD)符数量。
#需要注意的是这个变量的值并不一定是你设定的值，mysqld会在系统允许的情况下尽量获取更多的FD数量
open_files_limit = 65535

#最大连接数
max_connections = 1000

#最大错误连接数
max_connect_errors = 600

#在MySQL暂时停止响应新请求之前的短时间内多少个请求可以被存在堆栈中
#官方建议 back_log = 50 + (max_connections / 5),封顶数为65535,默认值= max_connections
back_log = 250

#所有线程打开的表数
#例如，对于200个并发运行的连接，表缓存大小至少为200*N。
#其中N是您执行的任何查询中每个联接的最大表数。
table_open_cache = 600

# 可以存储在定义缓存中的表定义的数量 
# MIN(400 + table_open_cache / 2, 2000)
table_definition_cache = 700

# 为了减少会话之间的争用，可以将opentables缓存划分为table_open_cache/table_open_cache_instances个小缓存
table_open_cache_instances = 64

# 每个线程的堆栈大小 如果线程堆栈太小，则会限制执行复杂SQL语句
thread_stack = 32M

# 禁止外部系统锁
external-locking = FALSE

#SQL数据包发送的大小，如果有BLOB对象建议修改成1G
max_allowed_packet = 256M

#order by 或group by 时用到
#建议先调整为4M，后期观察调整
sort_buffer_size = 4M

#inner left right join时用到
#建议先调整为4M，后期观察调整
join_buffer_size = 4M

# How many threads the server should cache for reuse.
# 如果您的服务器每秒达到数百个连接，则通常应将thread_cache_size设置得足够高，以便大多数新连接使用缓存线程
# default value = 8 + ( max_connections / 100) 上限为100
thread_cache_size = 40

#MySQL连接闲置超过一定时间后(单位：秒)将会被强行关闭
#MySQL默认的wait_timeout  值为8个小时, interactive_timeout参数需要同时配置才能生效
interactive_timeout = 1800
wait_timeout = 1800

#Metadata Lock最大时长（秒）， 一般用于控制 alter操作的最大时长sine mysql5.6
#执行 DML操作时除了增加innodb事务锁外还增加Metadata Lock，其他alter（DDL）session将阻塞
lock_wait_timeout = 3600

#内部内存临时表的最大值。
#比如大数据量的group by ,order by时可能用到临时表，
#超过了这个值将写入磁盘，系统IO压力增大
tmp_table_size = 64M
max_heap_table_size = 64M

#--###########################-- 慢SQL日志记录 开始 --##########################################

#是否启用慢查询日志，1为启用，0为禁用  
slow_query_log = 1

#记录系统时区
log_timestamps = SYSTEM

#指定慢查询日志文件的路径和名字
slow_query_log_file = /var/log/mysql/slow.log

#慢查询执行的秒数，必须达到此值可被记录
long_query_time = 2

#将没有使用索引的语句记录到慢查询日志  
log_queries_not_using_indexes = 0

#设定每分钟记录到日志的未使用索引的语句数目，超过这个数目后只记录语句数量和花费的总时间  
log_throttle_queries_not_using_indexes = 60

#对于查询扫描行数小于此参数的SQL，将不会记录到慢查询日志中
min_examined_row_limit = 5000

#记录执行缓慢的管理SQL，如alter table,analyze table, check table, create index, drop index, optimize table, repair table等。  
log_slow_admin_statements = 0

#作为从库时生效, 从库复制中如何有慢sql也将被记录
#对于ROW格式binlog，不管执行时间有没有超过阈值，都不会写入到从库的慢查询日志
log_slow_slave_statements = 1

#--###########################-- 慢SQL日志记录 结束 --##########################################

#--###########################-- Bin-Log设置 开始 --############################################
server-id = 110

#开启bin log 功能
log-bin=mysql-bin

#binlog 记录内容的方式，记录被操作的每一行
binlog_format = ROW

#对于binlog_format = ROW模式时，FULL模式可以用于误操作后的flashBack。
#如果设置为MINIMAL，则会减少记录日志的内容，只记录受影响的列，但对于部分update无法flashBack
binlog_row_image = FULL

#bin log日志保存的天数
#如果 binlog_expire_logs_seconds 选项也存在则 expire_logs_days 选项无效
#expire_logs_days 已经被标注为过期参数
#expire_logs_days = 7
binlog_expire_logs_seconds = 1209600

#master status and connection information输出到表mysql.slave_master_info中
master_info_repository = TABLE

#the slave's position in the relay logs输出到表mysql.slave_relay_log_info中
relay_log_info_repository = TABLE

#作为从库时生效, 想进行级联复制，则需要此参数
log_slave_updates

#作为从库时生效, 中继日志relay-log可以自我修复
relay_log_recovery = 1

#作为从库时生效, 主从复制时忽略的错误
#如果在备份过程中执行ddl操作，从机需要从主机的备份恢复时可能会异常，从而导致从机同步数据失败
#如果对数据完整性要求不是很严格，那么这个选项确实可以减轻维护的成本
slave_skip_errors = ddl_exist_errors

#####RedoLog日志 和 binlog日志的写磁盘频率设置 BEGIN ###################################
# RedoLog日志（用于增删改事务操作） +  binlog日志（用于归档，主从复制）
# 为什么会有两份日志呢？ 
# 因为最开始MySQL没有 InnoDB 引擎,自带MyISAM引擎没有 crash-safe能力，binlog日志只用于归档
# InnoDB 引擎是另一个公司以插件形式引入MySQL的，采用RedoLog日志来实现 crash-safe 能力

# redo log 的写入（即事务操作）拆成两阶段提交（2PC）：prepare阶段 和 commit阶段
#(事务步骤1) 执行commit命令，InnoDB redo log 写盘，然后告知Mysql执行器:[你可以写binlog了，且一并提交事务]，事务进入 prepare 状态
#(事务步骤2) 如果前面 prepare 成功，Mysql执行器生成 binlog 并且将binlog日志写盘
#(事务步骤3) 如果binlog写盘成功，Mysql执行器一并调用InnoDB引擎的提交事务接口，事务进入 commit 状态，操作完成，事务结束

#参数设置成 1，每次事务都直接持久化到磁盘
#参数设置成 0，mysqld进程的崩溃会导致上一秒钟所有事务数据的丢失。
#参数设置成 2，只有在操作系统崩溃或者系统掉电的情况下，上一秒钟所有事务数据才可能丢失。
#即便都设置为1，服务崩溃或者服务器主机crash，Mysql也可能丢失但最多一个事务

#控制 redolog 写磁盘频率 默认为1
innodb_flush_log_at_trx_commit = 1

#控制 binlog 写磁盘频率
sync_binlog = 1

#####RedoLog日志 和 binlog日志的写磁盘频率设置 END #####################################

#一般数据库中没什么大的事务，设成1~2M，默认32kb
binlog_cache_size = 4M

#binlog 能够使用的最大cache 内存大小
max_binlog_cache_size = 1G

#单个binlog 文件大小 默认值是1GB
max_binlog_size = 512M

#开启GTID复制模式
gtid_mode = on

#强制gtid一致性，开启后对于create table ... select ...或 CREATE TEMPORARY TABLE 将不被支持
enforce_gtid_consistency = 1

#解决部分无主键表导致的从库复制延迟问题
#其基本思路是对于在一个ROWS EVENT中的所有前镜像收集起来，
#然后在一次扫描全表时，判断HASH中的每一条记录进行更新
#该参数已经被标注为过期参数
#slave-rows-search-algorithms = 'INDEX_SCAN,HASH_SCAN'

# default value is CRC32
#binlog_checksum = 1

# default value is ON
#relay-log-purge = 1

#--###########################-- Bin-Log设置 结束 --##########################################

#--###########################-- 可能用到的MyISAM性能设置 开始 --#############################

#对MyISAM表起作用，但是内部的临时磁盘表是MyISAM表，也要使用该值。
#可以使用检查状态值 created_tmp_disk_tables 得知详情
key_buffer_size = 15M

#对MyISAM表起作用，但是内部的临时磁盘表是MyISAM表，也要使用该值，
#例如大表order by、缓存嵌套查询、大容量插入分区。
read_buffer_size = 8M

#对MyISAM表起作用 读取优化
read_rnd_buffer_size = 4M

#对MyISAM表起作用 插入优化
bulk_insert_buffer_size = 64M
#--###########################-- 可能用到的MyISAM性能设置 开始 --################################

#--###########################-- innodb性能设置 开始 --##########################################
# Defines the maximum number of threads permitted inside of InnoDB. 
# A value of 0 (the default) is interpreted as infinite concurrency (no limit)
innodb_thread_concurrency = 0

#一般设置物理存储的 60% ~ 70%
innodb_buffer_pool_size = 8G

#当缓冲池大小大于1GB时，将innodb_buffer_pool_instances设置为大于1的值，可以提高繁忙服务器的可伸缩性
innodb_buffer_pool_instances = 4

#默认启用。指定在MySQL服务器启动时，InnoDB缓冲池通过加载之前保存的相同页面自动预热。 通常与innodb_buffer_pool_dump_at_shutdown结合使用
innodb_buffer_pool_load_at_startup = 1

#默认启用。指定在MySQL服务器关闭时是否记录在InnoDB缓冲池中缓存的页面，以便在下次重新启动时缩短预热过程
innodb_buffer_pool_dump_at_shutdown = 1

# Defines the name, size, and attributes of InnoDB system tablespace data files
innodb_data_file_path = ibdata1:1G:autoextend

#InnoDB用于写入磁盘日志文件的缓冲区大小（以字节为单位）。默认值为16MB
innodb_log_buffer_size = 32M

#InnoDB日志文件组数量
innodb_log_files_in_group = 3

#InnoDB日志文件组中每一个文件的大小
innodb_log_file_size = 2G

#是否开启在线回收（收缩）undo log日志文件，支持动态设置，默认开启
innodb_undo_log_truncate = 1

#当超过这个阀值（默认是1G），会触发truncate回收（收缩）动作，truncate后空间缩小到10M
innodb_max_undo_log_size = 4G

#The path where InnoDB creates undo tablespaces
#没有配置则在数据文件目录下
#innodb_undo_directory = /var/lib/mysql/undolog

#用于设定创建的undo表空间的个数
#已经弃用了，只能手动添加undo表空间
#The innodb_undo_tablespaces variable is deprecated and is no longer configurable as of MySQL 8.0.14
#innodb_undo_tablespaces = 95

#提高刷新脏页数量和合并插入数量，改善磁盘I/O处理能力
#根据您的服务器IOPS能力适当调整
#一般配普通SSD盘的话，可以调整到 10000 - 20000
#配置高端PCIe SSD卡的话，则可以调整的更高，比如 50000 - 80000
innodb_io_capacity = 4000
innodb_io_capacity_max = 8000

#如果打开参数innodb_flush_sync, checkpoint时，flush操作将由page cleaner线程来完成，此时page cleaner会忽略io capacity的限制，进入激烈刷脏
innodb_flush_sync = 0
innodb_flush_neighbors = 0

#CPU多核处理能力设置，假设CPU是4颗8核的，设置如下
#读多，写少可以设成 2:6的比例
innodb_write_io_threads = 8
innodb_read_io_threads = 8
innodb_purge_threads = 4
innodb_page_cleaners = 4
innodb_open_files = 65535
innodb_max_dirty_pages_pct = 50

#该参数针对unix、linux，window上直接注释该参数.默认值为 NULL
#O_DIRECT减少操作系统级别VFS的缓存和Innodb本身的buffer缓存之间的冲突
innodb_flush_method = O_DIRECT

innodb_lru_scan_depth = 4000
innodb_checksum_algorithm = crc32

#为了获取被锁定的资源最大等待时间，默认50秒，超过该时间会报如下错误:
# ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
innodb_lock_wait_timeout = 20

#默认OFF，如果事务因为加锁超时，会回滚上一条语句执行的操作。如果设置ON，则整个事务都会回滚
innodb_rollback_on_timeout = 1

#强所有发生的死锁错误信息记录到 error.log中，之前通过命令行只能查看最近一次死锁信息
innodb_print_all_deadlocks = 1

#在创建InnoDB索引时用于指定对数据排序的排序缓冲区的大小
innodb_sort_buffer_size = 67108864

#控制着在向有auto_increment 列的表插入数据时，相关锁的行为，默认为2
#0：traditonal （每次都会产生表锁）
#1：consecutive （mysql的默认模式，会产生一个轻量锁，simple insert会获得批量的锁，保证连续插入）
#2：interleaved （不会锁表，来一个处理一个，并发最高）
innodb_autoinc_lock_mode = 1

#表示每个表都有自已独立的表空间
innodb_file_per_table = 1

#指定Online DDL执行期间产生临时日志文件的最大大小，单位字节，默认大小为128MB。
#日志文件记录的是表在DDL期间的数据插入、更新和删除信息(DML操作)，一旦日志文件超过该参数指定值时，
#DDL执行就会失败并回滚所有未提交的当前DML操作，所以，当执行DDL期间有大量DML操作时可以提高该参数值，
#但同时也会增加DDL执行完成时应用日志时锁定表的时间
innodb_online_alter_log_max_size = 4G

#--###########################-- innodb性能设置 结束 --##########################################

[mysqldump]
quick
max_allowed_packet = 128M
```



```
-- 查看某个数据库的表的用的字符集
SELECT
	TABLE_SCHEMA '数据库',
	TABLE_NAME '表',
	TABLE_COLLATION '原排序规则',
	CONCAT( 'ALTER TABLE ', TABLE_NAME, ' CHARACTER SET=utf8mb4,  COLLATE=utf8mb4_general_ci;' ) '修正SQL' 
FROM
	information_schema.`TABLES` 
WHERE
	TABLE_SCHEMA = '你的数据库名' 
	AND TABLE_COLLATION != 'utf8mb4_general_ci';

-- 查看数据库中所有字段用的排序规则
SELECT
	TABLE_SCHEMA '数据库',
	TABLE_NAME '表',
	COLUMN_NAME '字段',
	CHARACTER_SET_NAME '原字符集',
	COLLATION_NAME '原排序规则',
	CONCAT(
	'ALTER TABLE ',
	TABLE_NAME,
	' MODIFY COLUMN ',
	COLUMN_NAME,
	' ',
	COLUMN_TYPE,
	-- - 设置新的编码和排序规则
	' CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci',
	( CASE WHEN IS_NULLABLE = 'NO' THEN ' NOT NULL' ELSE '' END ),
	( CASE WHEN COLUMN_COMMENT = '' THEN ' ' ELSE concat( ' COMMENT''', COLUMN_COMMENT, '''' ) END ),
	';' 
) '修正SQL' 
FROM
	information_schema.`COLUMNS` 
WHERE
	-- -过滤正确排序规则
	COLLATION_NAME != 'utf8mb4_general_ci'
	-- -数据库名称
	AND TABLE_SCHEMA = '你的数据库名';
```

