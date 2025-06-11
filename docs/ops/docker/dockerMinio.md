# minio对象存储

## 安装部署

### 创建挂载目录

```bash
mkdir -p /mydata/minio/logs
mkdir -p /mydata/minio/conf
mkdir -p /mydata/minio/data
```

### 镜像

```bash
docker pull minio/minio:latest
文档地址 https://hub.docker.com/r/minio/minio
docker images
```

### 端口号

```bash
# 查看服务的运行状态：
systemctl status firewalld
# 查看防火墙开放端口
firewall-cmd --zone=public --list-ports
# 开启端口50001
firewall-cmd --zone=public --add-port=50002/tcp --add-port=50003/tcp --permanent
# 重新载入配置信息而不中断服务：
systemctl reload firewalld
```

### 容器

```bash
docker run \
--name minio \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:50002:9000 \
-p 0.0.0.0:50003:9090 \
-e "MINIO_ACCESS_KEY=wencong" \
-e "MINIO_SECRET_KEY=wencong863" \
-v /mydata/minio/data:/data \
-v /mydata/minio/conf:/root/.minio \
-v /etc/localtime:/etc/localtime \
-d minio/minio:latest server \
/data --console-address ":9090" -address ":9000"

# 9000是minio服务端口，用于服务的链接和请求；  9090是minio客户端端口，用于访问管理界面。

# 查看启动日志
docker logs minio

# 停止容器 删除容器
docker stop minio
docker rm minio

# 查看容器运行状态 
docker ps --filter "name=minio"
# 查看容器的详细信息，包括容器的配置、网络设置、挂载点、进程状态
docker inspect 容器id

# http://101.34.173.191:50003/login
```

## 永久访问对象

### 创建桶、权限、账号

```json
# 创建桶 一个项目一个桶，不同环境不同模块，用目录(实际没有目录)区分
左侧菜单 Buckets => Create Bucket + 输入桶名称即可，建议名称为项目名
# 创建访问策略 指定桶，读写权限，
左侧菜单 Policies => readwrite => Raw Policy 先复制一下
左侧菜单 Policies => Create policy +
	输入名称，建议桶名
	粘贴刚刚复制的内容，修改指定桶，修改后内容如下
	{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "arn:aws:s3:::adminnet/*"
            ]
        }
    ]
	}

# 创建账号 并赋予读写权限
左侧菜单 Identity => User => Create User +
	输入账号、密码、选择 刚刚创建的策略 后提交
当前页面会出现新创建的账号，点击账号右侧编辑按钮，选择Service Accounts => Create Access Keys +
在新的页面Create Access Key for adminnet 点击 Create，保存credentials.json文件如下
{
  "url":"http://127.0.0.1:9000",
  "accessKey":"WEx6pCyFm0G7HYODXfbo",
  "secretKey":"dSab0Z9LH6dqBQBrudeOGffAx2uMVUcA5FZYO3xl",
  "api":"s3v4",
  "path":"auto"
}
```

### Minio客户端(mc)

```bash
# 镜像 https://hub.docker.com/r/minio/mc
docker pull minio/mc:latest
# 容器 注意本人使用FinalShell远程连接服务器操作，不知道为什么mc命令始终卡住 服务器是腾讯云
# 解决方法：进入腾讯云控制台服务器登录后，进行如下操作
docker run -it --entrypoint=/bin/sh minio/mc
# mc客户端管理 对象服务(上面创建的minio服务)，这里set别名后添加服务，
# 端口号为服务端口，用于服务的链接和请求，后面可以是账号密码，也可以是私钥
mc alias set minioalias http://101.34.173.191:50002 o3VgU8XTyE9RFH8JIav0 GbQK0sAtEV3DzcvObeHse1dlsoStjiaJwzXqCUMd
# 查看所用的桶
mc ls minioalias
# 设置公开访问 永久访问链接
mc anonymous set public minioalias/adminnet
# 设置永久下载链接
mc anonymous set download minioalias/adminnet
# 上传一个文件，测试
http://101.34.173.191:50002/adminnet/header.png
```

