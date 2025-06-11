# linux安装nginx

## 源码编译安装nginx

> https://blog.csdn.net/shallow72/article/details/123878716

- 安装gcc环境（编译时依赖gcc环境）

```
yum -y install gcc gcc-c++ autoconf automake make
```

- 安装 pcre（提供nginx支持重写功能）

```
yum -y install pcre pcre-devel
```

- 安装zlib（zlib 库提供了很多压缩和解压缩的方式，nginx 使用 zlib 对 http 包内容进行 gzip 压缩）

```
yum -y install zlib zlib-devel make libtool
```

- 安装openssl（安全套接字层密码库，用于通信加密）

```
yum -y install openssl openssl-devel
```

- 手动创建用户和用户组 chown nginx /usr/local/project/hmjydt/web

```
groupadd nginx;
useradd nginx -g nginx -s /sbin/nologin -M;
```

- 创建目录


```
cd /usr/local;
mkdir nginx;
cd nginx;
```

- 官网下载[nginx源码包](https://nginx.org/download/nginx-1.20.2.tar.gz)

- 创建nginx文件夹，并进入

```
cd /usr/local/nginx
wget https://nginx.org/download/nginx-1.22.0.tar.gz;
```

- 解压


```
tar -zxvf nginx-1.22.0.tar.gz
```

- 编译目录


```
cd nginx-1.22.0
# 检查平台安装环境, 下面为一行命令不换行
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --user=nginx --group=nginx --with-stream
参数说明：
–prefix=/usr/local/nginx
#编译安装目录
–user=nginx
#所属用户nginx
–group=nginx
#所属组nginx
–with-http_stub_status_module
#该模块提供nginx的基本状态信息
–with-http_ssl_module
# 支持HTTPS
```

- 编译源码并安装


```
make			# 编译
make install  		# 安装
```

- nginx编译安装完成以后，修改nginx.conf

```
vim /usr/local/nginx/conf/nginx.conf
```

- 把下面复制进去（新手提示：按“i”后编辑，添加完之后，按“esc”，打出“:wq”，用来保存文件并退出）

```
user nginx;
worker_processes  auto; # cpu 16
worker_cpu_affinity auto;
events {
    use epoll;
    worker_connections  10240;
}

http {
	#第一个参数：$binary_remote_addr 表示通过remote_addr这个标识来做限制，
	#“binary_”的目的是缩写内存占用量，是限制同一客户端ip地址
	#第二个参数：zone=one:10m表示生成一个大小为10M，名字为one的内存区域，用来存储访问的频次信息
	#第三个参数：rate=1r/s表示允许相同标识的客户端的访问频次，这里限制的是每秒1次，还可以有比如30r/m的
    limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
    
    include       mime.types;
    # 外链配置文件
    
    # nginx默认文件类型
    default_type  application/octet-stream;
    # 如下三个属性优化Nginx静态资源的处理
    sendfile        on;
    tcp_nopush 	on;
    tcp_nodelay 	on;
    # TCP超时时间默认75秒，有些浏览器最多只保持60秒，所以可以设定为60秒。
    keepalive_timeout  60;
    #开启gzip
    gzip  on;  
    #低于1kb的资源不压缩 
    gzip_min_length 1k;
    #压缩级别1-9，越大压缩率越高，同时消耗cpu资源也越多，建议设置在5左右。 
    gzip_comp_level 5; 
    #需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片.
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;  
    #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    gzip_disable "MSIE [1-6]\.";  
    #是否添加“Vary: Accept-Encoding”响应头
    gzip_vary on;
    #上传文件的大小限制  默认1m
    client_max_body_size 8m;
}
```

## ningx操作

### 基本操作

- 启动服务

```
/usr/local/nginx/sbin/nginx
```

- 重新加载服务

```
/usr/local/nginx/sbin/nginx -s reload
```

- 停止服务

```
/usr/local/nginx/sbin/nginx -s stop
```

- 查看进程

```
ps -ef | grep nginx
访问测试
curl ip地址
```

- nginx版本信息查看

```
/usr/local/nginx/sbin/nginx -V
```

### 服务配置

> 目前nginx都是通过命令执行的，在nginx运行过程中，需要nginx作为系统的服务运行。以systemctl命令运行服务

- 配置服务文件

```
vi /lib/systemd/system/nginx.service
```

- 配置信息

```
[Unit]
Description=nginx 
After=network.target 
   
[Service] 
Type=forking 
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx reload
ExecStop=/usr/local/nginx/sbin/nginx quit
PrivateTmp=true 
   
[Install] 
WantedBy=multi-user.target
```

- 创建服务

```
systemctl enable nginx.service
```

- 启动nginx

```
systemctl start nginx
```

- 停止nginx

```
systemctl stop nginx
```

- nginx运行状态

```
systemctl status nginx
```

- 重启nginx

```
systemctl restart nginx
```

- 重新加载配置

```
systemctl reload nginx
```

- 设置开机启动

```
systemctl enable nginx
```

- 关闭开机启动

```
systemctl disable nginx
```

- 查看版本

```
nginx -V
```

- 目录说明

|           目录            |                     说明                     |
| :-----------------------: | :------------------------------------------: |
|   /etc/nginx/nginx.conf   |             所有相关配置文件目录             |
|        /etc/nginx/        |               nginx主配置文件                |
|    /etc/nginx/conf.d/     |         独立的nginx服务配置文件目录          |
|      /var/log/nginx/      |              nginx日志文件目录               |
| /var/log/nginx/access.log |   访问日志(IP/浏览器信息/处理时间/请求URL)   |
| /var/log/nginx/error.log  |    错误日志(服务器和请求处理中的错误信息)    |
|   /usr/share/nginx/html   | 默认的站点位置，可以根据实际情况进行设置调整 |

