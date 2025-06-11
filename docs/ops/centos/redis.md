# linux安装redis

### 一、下载并解压Redis

1、执行下面的命令下载redis：
 cd /usr/local
mkdir redis

cd redis

wget https://download.redis.io/releases/redis-6.2.6.tar.gz
2、解压redis：
tar xzf redis-6.2.6.tar.gz
3、移动redis目录，一般都会将redis目录放置到 /usr/local/redis目录：
mv redis-6.2.6/* /usr/local/redis
### 二、编译并安装redis
1、进入redis安装目录，执行make命令编译redis：
cd /usr/local/redis
make
等待make命令执行完成即可。
如果执行make命令报错：cc 未找到命令，原因是虚拟机系统中缺少gcc，执行下面命令安装gcc：
yum -y install gcc automake autoconf libtool make
如果执行make命令报错：致命错误:jemalloc/jemalloc.h: 没有那个文件或目录，则需要在make指定分配器为libc。执行下面命令即可正常编译：
make MALLOC=libc
make命令执行完，redis就编译完成了。
2、执行下面命令安装redis，并指定安装目录
make install PREFIX=/usr/local/redis

![img](https://pics5.baidu.com/feed/ac6eddc451da81cbdb8e52841f3c161f082431f7.jpeg@f_auto?token=8d4d4460e94651d1032a58f0b12af450)

至此，redis即安装成功。
### 三、启动redis
1、进入redis安装目录，执行下面命令启动redis服务
/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf

/usr/local/redis/bin/redis-cli -p 50003 shutdown

ps -ef | grep redis

此时，可以看到redis服务被成功启动：

![img](https://pics7.baidu.com/feed/7e3e6709c93d70cfa0eb8e7db5861709baa12b14.jpeg@f_auto?token=ec485096d3962c19ebc8a85a409c1902)

但这种启动方式不能退出控制台，如果退出，那么redis服务也会停止。如果想要redis以后台方式运行，需要修改redis的配置文件：**redis.conf**。将该配置文件中的**daemonize no**改为**daemonize yes**即可：
修改完成后，重新执行启动命令启动redis，然后通过下面命令查看redis进程，可以发现redis服务已经被启动了：
ps -ef | grep redis

![img](https://pics3.baidu.com/feed/0ff41bd5ad6eddc4a81748b3768170f45366336e.jpeg@f_auto?token=4fcf5b31a848064cbd4c4edb94663690)

2、通过redis-cli测试redis是否可用，在redis安装目录执行下面命令：
**./bin/redis-cli**

![img](https://pics1.baidu.com/feed/9d82d158ccbf6c81f7fd06e6f264773c32fa405d.jpeg@f_auto?token=fa287ee6da1534013e341bd507c8dcf8)

此处我们通过下面命令随便set一个字符串类型的值，key是test，value是hello：
**set test hello**

![img](https://pics0.baidu.com/feed/58ee3d6d55fbb2fb3416c1040210e6ad4623dc4f.jpeg@f_auto?token=506d3d9abf57072fc2a3fc0d8aab348b)

然后通过下面命令get出test这个key的value值：
**get test**

![img](https://pics1.baidu.com/feed/060828381f30e924f9416e480152a80f1c95f742.jpeg@f_auto?token=c7d0a720658da69d1313b4573bd5cc77)

测试没有问题，至此，redis在我们的Linux服务器上就已经安装完成了。
