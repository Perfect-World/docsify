# minio对象存储

## 安装minio

- 登录服务器，进入/use/local/目录下

```linux
cd /usr/local
```

- 新建minio目录

```linux
mkdir minio
```

- 进入minio目录下

```linux
cd minio
```

- 下载 MinIO 的 Docker 镜像：

```linux
wget https://dl.minio.io/server/minio/release/linux-amd64/minio
```

- 新建启动文件 `vim start.sh`，注意自行设置密码、端口号、访问地址

	_将以下内容复制到文件中_

```linux
vim start.sh
```
```linux
#!/bin/bash

MINIO_DIR='/usr/local/minio'
DATA_DIR=$MINIO_DIR'/data'
LOG_DIR=$MINIO_DIR'/minio.log'
MINIO_ACCESS_KEY='wencong'
MINIO_SECRET_KEY='wencong863'
STOP=$MINIO_DIR'/stop.sh'
SERVER_PORT='50002'
CONSOLE_PORT='50003'
$STOP

export MINIO_ACCESS_KEY=$MINIO_ACCESS_KEY
export MINIO_SECRET_KEY=$MINIO_SECRET_KEY

# 重启服务
source /etc/profile
nohup $MINIO_DIR/minio server --address 0.0.0.0:$SERVER_PORT --console-address 0.0.0.0:$CONSOLE_PORT $DATA_DIR > $LOG_DIR 2>&1 &
echo "Start Success!"

```

|              **属性**               | **说明**             |
| :---------------------------------: | -------------------- |
|     `MINIO_ACCESS_KEY=wencong`      | 设置登录用户         |
|       MINIO_SECRET_KEY=\*\*\*       | 设置登录密码         |
| nohup /usr/local/minio/minio server | 后台启动命令         |
|   --console-address 0.0.0.0:50003   | console 的 IP 和端口 |
|        address 0.0.0.0:50002        | 网页的 IP 和端口     |
|    --config-dir /usr/local/minio    | 配置文件存放路径     |
|        /usr/local/minio/data        | 数据存储目录         |
|     /usr/local/minio/minio.log      | 日志存放文件         |

- 新建停止文件

	_将以下内容复制到 start.sh 文件中，此处是一行代码，注意没有换行_

```linux
vim stop.sh;
```

```linux
#!/bin/bash

echo "Stopping minio"
pid=`ps -ef | grep 'minio server' | grep -v grep | awk '{print $2}'`
if [ -n "$pid" ]
then
   kill -9 $pid
fi
echo "Stop Success!"

```

- 设置启动权限

```linux
chmod +x minio;
chmod +x start.sh;
chmod +x stop.sh;
```

- 启动防火墙

```linux
systemctl start firewalld
```

- 对外开放端口

```linux
firewall-cmd --zone=public --add-port=50002/tcp --permanent;
firewall-cmd --zone=public --add-port=50003/tcp --permanent;
firewall-cmd --reload;
```

- 关闭防火墙

```linux
systemctl stop firewalld
```

- 启动运行脚本

```linux
/usr/local/minio/start.sh
```

- 访问 http://\*\*:50002 登录（用上面已设置的账号密码登录）

```linux
http://42.192.7.48:50002
```

## 设置图片永不过期

> 通过 minio 分享的链接默认只能支持 7 天，在某些场景下使用非常不方便。

- 下载 minio 客户端

```linux
cd /usr/local/minio;
wget https://dl.min.io/client/mc/release/linux-amd64/mc;
```

- 设置权限：

```linux
chmod +x mc
```

- 添加服务端 host，将 minio server 添加到客户端的配置管理。

```linux
/usr/local/minio/mc config host add langyabang http://1.117.249.132:50003 wencong wencong密码 --api S3v4

# 删除
/usr/local/minio/mc config host remove langyabang

# 查看已连接的云存储
/usr/local/minio/mc config host list
```

- `mb`命令创建一个新的存储桶。

```linux
mv /usr/local/minio/minio /usr/local/minio/minio.bak
/usr/local/minio/mc mb minio/桶名
```

- 设置需要开放下载的 bucket（开放=永不过期）

```linux
/usr/local/minio/mc policy set download minio/桶名
```

- 创建文件夹

```linux
/usr/local/minio/mc mb minio/langyabang/test
```

- 登录控制台，进入test文件夹，点击upload选择上传文件，测试文件是否正常访问

```linux
http://42.192.7.48:50002/hmerpcloudasp/test/123.jpg
http://47.121.206.33:50002/langyabang/test/圣玛丽湖.jpeg
```

## 配置https

需要域名、证书、nginx等预先准备好

- 创建配置文件（进入/usr/local/minio创建）

```linux
vim minio.conf
```

- 将以下内容复制到minio.conf中（`www.wencong.store`是域名）

```linux
server {
	#SSL 访问端口号为 443
	listen 50004 ssl;
	#填写绑定证书的域名
	server_name www.wencong.store;
	#证书文件名称
	ssl_certificate wencong.store_bundle.crt;
	#私钥文件名称
	ssl_certificate_key wencong.store.key;
	ssl_session_timeout 5m;
	#请按照以下协议配置
	ssl_protocols TLSv1.2 TLSv1.3;
	#请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
	ssl_prefer_server_ciphers on;
	location / {
		proxy_set_header Host $http_host;
		proxy_pass http://127.0.0.1:50002; #我们要反向代理的地址,这里以本地的tomcat服务器为例
		charset utf-8; #显示中文
		rewrite ^/(.*)$ /$1 break; #配置允许访问任何存储桶
		add_header 'Access-Control-Allow-Origin' '*'; #允许来自所有的访问地址
		add_header 'Access-Control-Allow-Credentials' 'true'; #支持请求方式
		add_header 'Access-Control-Allow-Methods' 'GET, PUT, POST, DELETE, OPTIONS';
		add_header 'Access-Control-Allow-Headers' 'Content-Type,*';
	}
}
```

- 关闭之前端口号

```linux
systemctl start firewalld;
firewall-cmd --zone=public --remove-port=50002/tcp --permanent;
firewall-cmd --zone=public --remove-port=50003/tcp --permanent;
systemctl stop firewalld;
```

- nginx.conf文件中添加minio.conf命令行

```linux
vim /usr/local/nginx/conf/nginx.conf;
添加 include /usr/local/minio/minio.conf;
重启ningx
cd /usr/local/nginx/sbin
./nginx -s reload
```

## 启用bucket通知

- 

```linux
/usr/local/minio/mc
/usr/local/minio/mc admin config get minio/ notify_webhook

mc admin config set minio notify_webhook:1 queue_limit="0"  endpoint="http://101.35.90.41:10201/sys/file/" queue_dir=""

mc admin config set minio notify_webhook:1 endpoint="https://127.0.0.1:8090"
//重启服务
mc admin service restart minio

//创建桶
mc mb minio/images
mc mb minio/images-thumbnail

//开启桶通知
mc event add minio/images arn:minio:sqs:us-east-1:1:webhook --events put --suffix .jpg
mc event add minio/images arn:minio:sqs:us-east-1:1:webhook --events put --suffix .bmp

```

- 关闭之前端口号

```linux

```







默认情况下,每个AWS帐户最多可以创建100个存储桶。

## Bucket命名规则

创建S3 bucket后，不能更改bucket名称，所以要明智地选择名称。

**Rules 规则**

以下是在所有AWS区域中命名S3存储桶的规则：
- Bucket名称在Amazon S3中的所有现有Bucket名称中必须是唯一的。
- Bucket名称必须符合DNS命名约定。
- 存储桶名称的长度必须至少为3个字符，且不得超过63个字符。
- Bucket名称不能包含大写字符或下划线。
- Bucket名称必须以小写字母或数字开头。
- Bucket名称必须是一系列一个或多个标签。相邻的标签用一个句点（.）分隔。Bucket名称可以包含小写字母、数字和连字符。每个标签必须以小写字母或数字开头和结尾。
- Bucket名称不能格式化为IP地址（例如192.168.5.4）。
- 当使用带有安全套接字层（SSL）的虚拟托管样式存储桶时，SSL通配符证书只匹配不包含句点的存储桶。要解决此问题，请使用HTTP或编写自己的证书验证逻辑。建议在使用虚拟托管样式存储桶时，不要在存储桶名称中使用句点（“.”）。

