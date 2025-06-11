# docker可视化界面

### 安装portainer

#### 挂载目录

```
mkdir -p /mydata/docker/portainer/data
```

#### 安装镜像

```
docker pull portainer/portainer-ce:latest
```

#### 启动容器

```bash
docker run \
  --user root \
  --name portainer \
  --restart unless-stopped \
  -e TZ=Asia/Shanghai \
  -p 0.0.0.0:${port}:9000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /mydata/docker/portainer/data:/data \
  -v /etc/localtime:/etc/localtime \
  -d outlovecn/portainer-cn:latest
```

#### 访问地址

```bash
http://${ip}:${port}
```

### 通过TCP将Portainer连接到Docker环境

> 参考https://blog.csdn.net/qq_42259469/article/details/128406535

#### 生成 TLS 文件

编写脚本 /mydata/docker/portainer/ca.sh

```bash
#!/bin/bash
set -e 
#相关配置信息
#远程服务器ip 有内网使用内网
SERVER="${ip}"
#密码
PASSWORD="${password}"
#国家
COUNTRY="cn"
#省
STATE="shangai"
#市
CITY="shangai"
#组织名称
ORGANIZATION="wencong"
#单位名称
ORGANIZATIONAL_UNIT="wencong"
#邮箱
EMAIL="zhao_new@sina.com"

#创建然后切换到生产密钥的目录
mkdir -p /mydata/docker/portainer/ca
cd /mydata/docker/portainer/ca

#生成ca私钥(使用aes256加密)
openssl genrsa -aes256 -passout pass:$PASSWORD  -out ca-key.pem 2048
#生成ca证书，填写配置信息
openssl req -new -x509 -passin "pass:$PASSWORD" -days 3650 -key ca-key.pem -sha256 -out ca.pem -subj "/C=$COUNTRY/ST=$STATE/L=$CITY/O=$ORGANIZATION/OU=$ORGANIZATIONAL_UNIT/CN=$SERVER/emailAddress=$EMAIL"

#生成server证书私钥文件
openssl genrsa -out server-key.pem 2048
#生成server证书请求文件
openssl req -subj "/CN=$SERVER" -new -key server-key.pem -out server.csr

#配置白名单
sh -c  'echo "subjectAltName = IP:'$SERVER',IP:0.0.0.0" >> extfile.cnf'
sh -c  'echo "extendedKeyUsage = serverAuth" >> extfile.cnf'

#使用CA证书及CA密钥以及上面的server证书请求文件进行签发，生成server自签证书
openssl x509 -req -days 3650 -in server.csr -CA ca.pem -CAkey ca-key.pem -passin "pass:$PASSWORD" -CAcreateserial  -out server-cert.pem  -extfile extfile.cnf

#生成client证书RSA私钥文件
openssl genrsa -out key.pem 2048

#生成client证书请求文件
openssl req -subj '/CN=client' -new -key key.pem -out client.csr
sh -c 'echo extendedKeyUsage=clientAuth >> extfile.cnf'

#生成client自签证书（根据上面的client私钥文件、client证书请求文件生成）
openssl x509 -req -days 3650 -in client.csr -CA ca.pem -CAkey ca-key.pem  -passin "pass:$PASSWORD" -CAcreateserial -out cert.pem  -extfile extfile.cnf

#删除无用文件
rm client.csr server.csr
```

```bash
sh /mydata/docker/portainer/ca/ca.sh
# ca-key.pem
# ca.pem
# ca.srl
# cert.pem
# extfile.cnf
# key.pem
# server-cert.pem
# server-key.pem
```

#### 远程运行docker环境的服务器

##### 上传tls文件

```bash
mkdir -p /mydata/ca && cd /mydata/ca
scp root@${ip}:/mydata/docker/portainer/ca/ca.pem /mydata/ca
scp root@${ip}:/mydata/docker/portainer/ca/server-cert.pem /mydata/ca
scp root@${ip}:/mydata/docker/portainer/ca/server-key.pem /mydata/ca
```

##### 修改配置文件

```bash
# 修改行ExecStart
vim /usr/lib/systemd/system/docker.service
# ExecStart=/usr/bin/dockerd --tlsverify --tlscacert=/mydata/ca/ca.pem --tlscert=/mydata/ca/server-cert.pem --tlskey=/mydata/ca/server-key.pem -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock -H fd:// --containerd=/run/containerd/containerd.sock
```

##### 开放端口号

```bash
firewall-cmd --zone=public --add-port=2375/tcp --permanent
systemctl reload firewalld
```

##### 重启远程docker服务

```bash
systemctl daemon-reload && /bin/systemctl restart docker.service
# jexus 属于特殊情况，必须进入容器内部重启
docker exec -it jexus /bin/bash
jws restart
exit
```

### portainer操作

![环境1](环境1.png)

![环境2](环境2.png)

