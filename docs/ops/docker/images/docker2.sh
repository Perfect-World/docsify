echo "创建docker挂载nginx目录"
mkdir -p /mydata/nginx/conf/conf.d
mkdir -p /mydata/nginx/html/default
mkdir -p /mydata/nginx/logs
mkdir -p /mydata/nginx/sh
echo "创建docker挂载jexus目录"
mkdir -p /mydata/jexus/conf
mkdir -p /mydata/jexus/logs
mkdir -p /mydata/jexus/www/default
mkdir -p /mydata/jexus/image

echo "创建/mydata/nginx/conf/nginx.conf"
echo "# 用户
user nginx;
# 开启进程数
worker_processes  auto; 
# 绑定worker进程和CPU
worker_cpu_affinity auto;
# 设定Nginx的工作模式及连接数上限
events {
    # 高效工作模式
    use epoll;
    # 每个进程最大连接数
    worker_connections  10240;
}
http {
    #第一个参数：\$binary_remote_addr 表示通过remote_addr这个标识来做限制，
    #“binary_”的目的是缩写内存占用量，是限制同一客户端ip地址
    #第二个参数：zone=one:10m表示生成一个大小为10M，名字为one的内存区域，用来存储访问的频次信息
    #第三个参数：rate=1r/s表示允许相同标识的客户端的访问频次，这里限制的是每秒1次，还可以有比如30r/m的
    limit_req_zone \$binary_remote_addr zone=one:10m rate=1r/s;
    # 外链配置文件
    include    mime.types;
    include    /etc/nginx/conf.d/*.conf;

    # nginx默认文件类型
    default_type  application/octet-stream;
    # 如下三个属性优化Nginx静态资源的处理
    sendfile    on;
    tcp_nopush    on;
    tcp_nodelay    on;
    # TCP超时时间默认75秒，有些浏览器最多只保持60秒，所以可以设定为60秒。
    keepalive_timeout    60;
    #开启gzip
    gzip    on;  
    #低于1kb的资源不压缩 
    gzip_min_length    1k;
    #压缩级别1-9，越大压缩率越高，同时消耗cpu资源也越多，建议设置在5左右。 
    gzip_comp_level    5; 
    #需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片.
    gzip_types    text/plain application/javascript application/x-javascript text/javascript text/xml text/css;  
    #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    gzip_disable    \"MSIE [1-6]\\\\.\";  
    #是否添加“Vary: Accept-Encoding”响应头
    gzip_vary    on;
    #上传文件的大小限制  默认1m
    client_max_body_size    8m;
    #忽略负载均衡健康检查日志 clb-healthcheck
    map \$http_user_agent \$ignore_ua {
        default    1;
        \"clb-healthcheck\"    0;
    }
    #日志格式
    log_format  access \$remote_addr>>>>\$time_local>>>>\$request>>>>\$status>>>>\$body_bytes_sent>>>>\$http_referer>>>>\$http_user_agent>>>>\$request_body>>>>\$server_name>>>>\$http_x_forward_for>>>>\$remote_user>>>>\$upstream_status>>>>\$ssl_protocol>>>>\$bytes_sent>>>>\$connection_requests>>>>\$request_length>>>>\$msec>>>>\$request_time>>>>\$upstream_response_time>>>>\$http_x_forwarded_for>>>>\$request_uri>>>>\$connection>>>>\$pipe;
    access_log /var/log/nginx/access.log access if=\$ignore_ua;
    error_log /var/log/nginx/error.log;
}
" >> /mydata/nginx/conf/nginx.conf

echo "创建/mydata/nginx/conf/conf.d/default.conf"
echo "server {
    listen 80; 
    ssl_prefer_server_ciphers on;
    location / {
        alias    /usr/share/nginx/html/default/;
        index    index.html;
    }
}
" >> /mydata/nginx/conf/conf.d/default.conf

echo "创建/mydata/nginx/html/default/index.html"
echo "<!DOCTYPE html>
<html>
<head>
<meta charset=\"utf-8\">
<title>nginx</title>
</head>
<body>
    <h1>nginx default页面</h1>
    <p>wencong zhao_new@sina.com</p>
</body>
</html>
" >> /mydata/nginx/html/default/index.html

echo "创建/mydata/nginx/sh/rotate.sh"
echo "#!/bin/bash 

LOGS_PATH=/mydata/nginx/logs 

YESTERDAY=\$(date -d \"yesterday\" +%Y-%m-%d) 

cp \${LOGS_PATH}/access.log \${LOGS_PATH}/access_\${YESTERDAY}.log && >\${LOGS_PATH}/access.log

cp \${LOGS_PATH}/error.log \${LOGS_PATH}/error_\${YESTERDAY}.log && >\${LOGS_PATH}/error.log
" >> /mydata/nginx/sh/rotate.sh

echo "创建/mydata/nginx/sh/mysql.sh"
echo "#!/bin/sh

#插入数据库信息
HOSTNAME=\"1.117.249.132\"
PORT=\"50003\"
USERNAME=\"wencong\"
PASSWORD=\"wencong863\"
DBNAME=\"op_monitor\"
TABLENAME=\"op_nginx_log\"

# 相关文件
YESTERDAY=\$(date -d \"yesterday\" +%Y-%m-%d) 
log_path=\"/mydata/nginx/logs/access_\${YESTERDAY}.log\"
sql_path=\"/mydata/nginx/sh/insert.sql\"
# 覆盖sql文件，添加新内容
echo \"insert into \${TABLENAME}(\\\`remote_addr\\\`,\\\`time_local\\\`,\\\`method\\\`,\\\`uri\\\`,\\\`http\\\`,\\\`status\\\`,\\\`body_bytes_sent\\\`,\\\`http_referer\\\`,\\\`http_user_agent\\\`,\\\`request_body\\\`,\\\`server_name\\\`,\\\`http_x_forward_for\\\`,\\\`remote_user\\\`,\\\`upstream_status\\\`,\\\`ssl_protocol\\\`,\\\`bytes_sent\\\`,\\\`connection_requests\\\`,\\\`request_length\\\`,\\\`msec\\\`,\\\`request_time\\\`,\\\`upstream_response_time\\\`,\\\`http_x_forwarded_for\\\`,\\\`request_uri\\\`,\\\`connection\\\`,\\\`pipe\\\`) values \" > \${sql_path}

# 遍历日志
cat \$log_path | while read line
do
    if [ -n \"\$line\" ]
    then
        remote_addr=\${line%%>>>>*}
        leavestr=\${line#*>>>>}
        time_local=\${leavestr% +0800>>>>*}
        day=\${time%%/*}
        time_local=\${time#*/}
        month=\${time%%/*}
        time_local=\${time#*/}
        year=\${time%%:*}
        time_local=\${time#*:}
        time_local=\${month}' '\${day},' '\${year}' '\${time}
        time_local=\`date -d \"\$time\" \"+%Y-%m-%d %H:%M:%S\"\`
        leavestr=\${leavestr#*>>>>}
        method=\${leavestr% /*}
        leavestr=\${leavestr#*' '}
        uri=\${leavestr%% *}
        leavestr=\${leavestr#*' '}
        http=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        status=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        body_bytes_sent=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        http_referer=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        http_user_agent=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        request_body=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        server_name=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        http_x_forward_for=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        remote_user=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        upstream_status=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        ssl_protocol=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        bytes_sent=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        connection_requests=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        request_length=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        msec=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        request_time=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        upstream_response_time=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        http_x_forwarded_for=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        request_uri=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        connection=\${leavestr%%>>>>*}
        leavestr=\${leavestr#*>>>>}
        pipe=\${leavestr%%>>>>*}

        echo \"('\${remote_addr}','\${time_local}','\${method}','\${uri}','\${http}','\${status}','\${body_bytes_sent}','\${http_referer}','\${http_user_agent}','\${request_body}','\${server_name}','\${http_x_forward_for}','\${remote_user}','\${upstream_status}','\${ssl_protocol}','\${bytes_sent}','\${connection_requests}','\${request_length}','\${msec}','\${request_time}','\${upstream_response_time}','\${http_x_forwarded_for}','\${request_uri}','\${connection}','\${pipe}'),\" >> \${sql_path}

    fi
done

# 去掉最后一个逗号，加上分号
sed -i '\$s/.\$//' \${sql_path}
echo \";\" >> \${sql_path}

# 执行sql文件
nohup mysql -h\${HOSTNAME} -P\${PORT} -u\${USERNAME} -p\${PASSWORD} \${DBNAME} <\${sql_path} >> /mydata/nginx/sh/mysql.log 2>&1 &

# 清除记录，节省存储空间
echo \"\" > /mydata/nginx/logs/access_\${YESTERDAY}.log

" >> /mydata/nginx/sh/mysql.sh

echo "创建/mydata/jexus/conf/default"
echo "port=20000
root=/ /var/www/default
hosts=*
NoLog=true
ResponseHandler.Add=X-Frame-Options:SAMEORIGIN
" >> /mydata/jexus/conf/default

echo "创建/mydata/jexus/www/default/index.html"
echo "<!DOCTYPE html>
<html>
<head>
<meta charset=\"utf-8\">
<title>jexus</title>
</head>
<body>
    <h1>jexus demo页面</h1>
    <p>wencong zhao_new@sina.com</p>
</body>
</html>
" >> /mydata/jexus/www/default/index.html

echo "创建/mydata/jexus/image/Dockerfile"
echo "FROM debian:latest
MAINTAINER wencong <zhao_new@sina.com>

COPY install.sh /tmp/
COPY bootstrap.sh /usr/bin/
RUN /tmp/install.sh
EXPOSE 443 
EXPOSE 80
VOLUME [\"/usr/jexus/siteconf\", \"/var/www\", \"/usr/jexus/log\"]
WORKDIR /usr/jexus
ENTRYPOINT [\"/usr/bin/bootstrap.sh\"]
HEALTHCHECK --interval=5m --timeout=30s CMD curl -f curl -f http://127.0.0.1 || exit 1
" >> /mydata/jexus/image/Dockerfile

echo "创建/mydata/jexus/image/bootstrap.sh"
echo "#!/bin/bash

function start_jws {
  /usr/jexus/jws start
}

function stop_jws {
  /usr/jexus/jws stop
}

function wait_for_exit {
  while pgrep -f \"/usr/jexus\" > /dev/null; do
    /bin/sleep 1
  done
  echo \"All jexus process have stopped.\"
}

function signal_trap {
  echo \"A SIGTERM or SIGINT signal was caught; trying to shut down.\"
  stop_jws
}

trap signal_trap SIGTERM SIGINT

start_jws

echo \"wait 3 seconds for jexus startup\"
/bin/sleep 3

echo \"Listening for termination signals...\"

wait_for_exit

" >> /mydata/jexus/image/bootstrap.sh

echo "创建/mydata/jexus/image/install.sh"
echo "#!/bin/bash -e
apt-get update && apt-get upgrade -y
# install wget to download jexus, curl for healthcheck.
apt-get install -y --no-install-recommends curl ca-certificates procps libc6 libgcc1 libgssapi-krb5-2 libssl1.1 libstdc++6 zlib1g libicu-dev vim net-tools
curl --location --output jexus-7.0.x-x64.tar.gz https://www.linuxdot.net/down/jexus-7.0.x-x64.tar.gz
tar -zxf jexus-7.0.x-x64.tar.gz && rm jexus-7.0.x-x64.tar.gz
mv jexus /usr/ && cd /usr/jexus && /usr/jexus/jws regsvr
curl --location --output dotnet-sdk-7.0.302-linux-x64.tar.gz https://download.visualstudio.microsoft.com/download/pr/351400ef-f2e6-4ee7-9d1b-4c246231a065/9f7826270fb36ada1bdb9e14bc8b5123/dotnet-sdk-7.0.302-linux-x64.tar.gz
mkdir /usr/dotnet
tar -zxf dotnet-sdk-7.0.302-linux-x64.tar.gz -C /usr/dotnet && rm dotnet-sdk-7.0.302-linux-x64.tar.gz
echo \"export DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1 
export PATH=\$PATH:/usr/dotnet \" >> /etc/profile
echo \"source /etc/profile \" >> /root/.bashrc 
apt-get remove -y ca-certificates
apt-get autoremove -y
rm -rf /var/lib/apt/lists/*
" >> /mydata/jexus/image/install.sh

sudo chmod -R 777 /mydata
# 安装nginx镜像指定版本
docker pull nginx:1.22
# 创建docker镜像
cd /mydata/jexus/image
docker build -t jexus .

