# Docker 离线安装

以下是整理后的标准 Markdown 格式 Docker 离线安装文档，排版规范、代码块高亮、结构清晰，可直接保存为 `.md` 文件：

## 执行脚本

> 安装docker

```bash
#!/bin/bash

# 创建docker目录
sudo mkdir -p /yykj/deployment/docker/docker
# 解压docker安装包
sudo tar -zxf /yykj/deployment/docker/docker-29.1.2.tar.gz -C /yykj/deployment/docker/docker
# 将解压后的 docker 文件移到 /usr/bin 目录下
sudo cp /yykj/deployment/docker/docker/* /usr/bin/
# 将 docker 注册成系统服务 
sudo cp /yykj/deployment/docker/docker.service /etc/systemd/system/docker.service
# 增加可执行权限
sudo chmod +x /etc/systemd/system/docker.service
# 重载系统服务
sudo systemctl daemon-reload 
# 设置 docker 开机自启动
sudo systemctl enable docker.service
# 启动 docker 服务
sudo systemctl start docker
# 测试 docker 是否启动成功
sudo systemctl status docker
```

> 安装docker镜像

```bash
#!/bin/bash

# 导入docker镜像
sudo docker load -i /yykj/deployment/docker-images/mysql_8.2.tar;
sudo docker load -i /yykj/deployment/docker-images/jdk_21.tar;
sudo docker load -i /yykj/deployment/docker-images/nginx_1.22.tar;
sudo docker load -i /yykj/deployment/docker-images/git_latest.tar;
sudo docker load -i /yykj/deployment/docker-images/maven_3.9.11.tar;
sudo docker load -i /yykj/deployment/docker-images/node_24.12.tar;
# 查看docker镜像
sudo docker images;
```



## Docker 安装

### 1 离线安装

#### 步骤一：官网下载 docker 安装包

docker-29.1.2.tgz   2025-12-02 22:24:18   78MB

```bash
wget https://download.docker.com/linux/static/stable/x86_64/docker-29.1.2.tgz
```

#### 步骤二：解压安装包

```bash
tar -zxvf docker-29.1.2.tgz
```

#### 步骤三：将解压后的 docker 文件移到 /usr/bin 目录下

```bash
sudo cp docker/* /usr/bin/
```

#### 步骤四：将 docker 注册成系统服务

1. 编辑系统服务配置文件：

```bash
vim /etc/systemd/system/docker.service
```

1. 在文件中粘贴以下内容，编辑完成后按 `Esc` 键，输入 `:wq` 退出并保存：

```bash
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target

[Service]
Type=notify
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=infinity
LimitNPROC=infinity
TimeoutStartSec=0
Delegate=yes
KillMode=process
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target

```

#### 步骤五：给服务文件增加可执行权限并重载系统服务

```bash
chmod +x /etc/systemd/system/docker.service
systemctl daemon-reload 
```

#### 步骤六：设置 docker 开机自启动

```bash
systemctl enable docker.service
```

#### 步骤七：启动 docker 服务

```bash
systemctl start docker
```

#### 步骤八：测试 docker 是否启动成功

```bash
sudo systemctl status docker
docker run hello-world
```

##### 测试成功说明

执行 `docker run hello-world` 后，若输出包含 `Hello from Docker!` 相关内容，说明 Docker 安装并启动成功；

若提示镜像不存在（离线环境），需先通过 `docker load` 导入 `hello-world` 离线镜像后再测试。

### 2 卸载步骤

#### 步骤一：停止docker

```bash
sudo systemctl stop docker
```

#### 步骤二：删除Docker服务

```bash
# 移除开机自启动
systemctl disable docker.service
# 删除service服务
rm -f /etc/systemd/system/docker.service
```

#### 步骤三：删除Docker相关命令

```bash
rm -f /usr/bin/docker*
rm -f /usr/bin/containerd*
rm -f /usr/bin/ctr
rm -f /usr/bin/runc
```

#### 步骤四：删除docker目录和容器相关文件

```bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

#### 步骤五：验证是否已成功卸载

```bash
docker --version
```

### 2 离线镜像文件导入

找一台可以联网的docker机器，并pull下载需要的镜像文件，导出成jar后，传到离线服务器，安装镜像
镜像源未找到可用的
使用本地电脑下载docker客户端后，使用翻墙工具，pull镜像文件，然后终端打包jar，上传到服务器，导入镜像文件

#### 步骤一：查找镜像

```bash
docker search <镜像名>
```

#### 步骤二：下载镜像

```bash
docker pull <镜像名>:<版本>
```

#### 步骤三：导出镜像

```bash
docker save <镜像名>:<版本> -o <保存路径>/<镜像名>_<版本>.tar 
```

#### 步骤四：导入镜像

```bash
docker load -i <保存路径>/<镜像名>_<版本>.tar
```

#### 步骤五：查看镜像

```bash
docker images
```

