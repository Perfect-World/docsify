# docker相关操作

#### docker 安装

```bash
# 安装docker使用官方安装脚本自动安装
sudo curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 安装docker compose v2.18.0
sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 将可执行权限应用于二进制文件：
sudo chmod +x /usr/local/bin/docker-compose
# 创建软链：
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# 启动docker
sudo service docker restart
# 查看版本
sudo docker -v
sudo docker-compose -v
```

#### 查询格式化

```
docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}"
docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"
```

#### 日志文件切割以及大小配置

vim /etc/docker/daemon.json

```
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "5"    
    }
}
```

#### 重启

```
systemctl daemon-reload && /bin/systemctl restart docker.service
```

#### docker 目录

```
# 根目录
cd /var/lib/docker
# 容器配置目录 
cd /var/lib/docker/containers
```

#### 进入容器

```bash
docker exec -it ${容器名} /bin/bash
```

#### 直接执行命令

```bash
// docker exec -it 镜像id 命令 如
docker exec -it ${容器名} ls
```

#### 删除指定镜像基于的所有容器：

```bash
sudo docker ps -a | awk '{ print $1,$2 }' | grep ${镜像}| awk '{print $1 }' | xargs -I {} sudo docker rm {}
```

#### 操作

```bash
# 停止所有容器
sudo docker stop $(docker ps -a -q)
# 删除所有已经停止的容器
sudo docker rm $(docker ps -a -q)
# 启动所有容器
sudo docker start $(docker ps -a -q)
sudo docker restart $(docker ps -a -q)
```

#### docker 不删除现有容器的情况下, 修改端口映射和挂载目录

```
# 停止所有容器
sudo docker stop $(docker ps -a -q)
# 停止socker服务
sudo service docker stop
# 进入容器目录
cd /var/lib/docker/containers/容器id

# 修改端口映射，参考已有的端口号映射
修改config.v2.json中ExposedPorts配置
修改hostconfig.json中PortBindings配置
# 修改挂载目录，参考已有的挂载目录
修改hostconfig.json中MountPoints配置

# 重启socker服务
sudo service docker restart
```

#### docker 容器占用空间

```
docker ps -s
括号外面的，如：2B。 表示现在向容器的可写层写入的数据量的大小。
括号里面的，如virtual 43.6MB。表示：镜像大小 + 可写层数据量大小 之和。
```

#### docker复制容器中文件

```bash
# 把docker内的nginx.conf复制到外部
docker cp nginx:/etc/nginx/nginx.conf /mydata/nginx/conf/nginx1.conf

docker cp /mydata/maicang/data/documents/sql/maicang.sql mysql8.2:/usr/local/maicang.sql
```

#### docker查看容器ip地址

```
docker inspect 容器id
```

