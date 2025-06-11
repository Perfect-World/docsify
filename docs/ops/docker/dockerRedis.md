# mysql8关系型数据库

### 挂载目录

```bash
rm -rf /mydata/redis/logs
rm -rf /mydata/redis/data
rm -rf /mydata/redis/conf
mkdir -p /mydata/redis/logs
mkdir -p /mydata/redis/data
mkdir -p /mydata/redis/conf
sudo chmod +x /mydata/redis/*
```

### 镜像

```bash
docker pull redis:6.2
文档地址（需要翻墙）：https://hub.docker.com/_/redis
docker images
```

### 使用自定义 redis 配置文件

```
touch /mydata/redis/conf/my.cnf
my.cnf内容比较长，放最下面，待增加中文说明和验证
```

### 端口号

```bash
# 查看服务的运行状态：
systemctl status firewalld
# 查看防火墙开放端口
firewall-cmd --zone=public --list-ports
# 开启端口50001
firewall-cmd --zone=public --add-port=50002/tcp --permanent
# 重新载入配置信息而不中断服务：
systemctl reload firewalld
```

### 容器

```bash
# 创建容器
docker run \
--name redis6.2 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-v /mydata/redis/logs:/var/logs \
-v /mydata/redis/data:/var/rdb \
-v /mydata/redis/conf:/usr/local/etc/redis/redis.conf \
-p 0.0.0.0:50002:6379 \
-d redis:6.2 redis-server /usr/local/etc/redis/redis.conf 

# 查看启动日志
docker logs redis6.2

# 停止容器 删除容器
docker stop redis6.2
docker rm redis6.2

# 查看容器运行状态 
docker ps --filter "name=mysql6.2"
# 查看容器的详细信息，包括容器的配置、网络设置、挂载点、进程状态
docker inspect 容器id

```

### 操作数据库

#### 容器

```bash
# 进入容器
docker exec -it redis6.2 redis-cli
ping

# 停止 Redis 容器
docker stop my-redis

# 删除 Redis 容器
docker rm my-redis    
```

#### my.cnf

```
# 绑定的 IP 地址，默认绑定 127.0.0.1，即只允许本地访问。若要允许外部访问，可设置为 0.0.0.0
bind 0.0.0.0

# Redis 监听的端口号，默认是 6379
port 6379

# 是否以守护进程模式运行，设置为 yes 时，Redis 会在后台运行
daemonize yes

# Redis 进程的 PID 文件路径
pidfile /var/rdb/redis_6379.pid

# 日志级别，可设置为 debug、verbose、notice、warning
loglevel notice

# 日志文件路径，设置为 stdout 时，日志会输出到标准输出
logfile /mydata/redis/logs

# 数据库数量，默认有 16 个数据库，编号从 0 到 15
databases 16

# 持久化配置
# RDB 持久化，在满足一定条件时，将内存中的数据快照保存到磁盘
save 900 1
save 300 10
save 60 10000

# RDB 文件的名称
dbfilename dump.rdb

# RDB 文件的保存目录
dir /var/rdb

# 是否开启 AOF 持久化，设置为 yes 时开启
appendonly yes

# AOF 文件的名称
appendfilename "appendonly.aof"

# AOF 持久化的同步策略，可设置为 always、everysec、no
appendfsync everysec

# 密码认证，设置密码后，客户端连接时需要提供密码
requirepass wencong863

# 最大客户端连接数
maxclients 10000

# 最大内存使用量，达到该限制后，Redis 会根据指定的策略进行内存回收
maxmemory 20mb

# 内存回收策略，可设置为 volatile-lru、allkeys-lru、volatile-random 等
maxmemory-policy volatile-lru

# 慢查询日志的时间阈值，单位为微秒，设置为 10000 表示执行时间超过 10 毫秒的命令会被记录到慢查询日志中
slowlog-log-slower-than 10000

# 慢查询日志的最大记录数
slowlog-max-len 128    
```

