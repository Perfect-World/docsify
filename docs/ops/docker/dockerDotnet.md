# docker dotnet

### 终端

#### 创建目录

```bash
mkdir -p /mydata/dotnet/${项目名}/logs
# 启动容器前，需要把编译后项目放到对应目录，不然启动报错
# 编译命令 dotnet publish 文件名.csproj -c Debug -o 输出目录
mkdir -p /mydata/dotnet/${项目名}/code
mkdir -p /mydata/dotnet/${项目名}/images
```

#### 镜像文件

/mydata/dotnet/images/${环境变量}/Dockerfile

```bash
FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /usr/dotnet/code
COPY . .
RUN mkdir -p /usr/dotnet/code && mkdir -p /usr/dotnet/logs
EXPOSE 5000
ENTRYPOINT ["dotnet", "webadmin.dll", "--urls", "http://0.0.0.0:5000", "--environment", "Production"]
```

#### 执行

```bash
cd /mydata/dotnet/images/${环境变量}
docker build -t ${镜像名} .
docker images
```

#### 启动容器

```bash
sudo chmod -R 777 /mydata/dotnet/${项目名}/*
docker run \
    --user root \
    --name ${容器名} \
    --restart unless-stopped \
    -e TZ=Asia/Shanghai \
    -p 0.0.0.0:${port}:5000 \
    -v /mydata/dotnet/${项目名}/code:/usr/dotnet/code \
    -v /mydata/dotnet/${项目名}/logs:/usr/dotnet/logs \
    -v /etc/localtime:/etc/localtime \
    -d ${镜像名}:latest
docker ps -a
```

#### 访问

```bash
http://${ip}:${port}
```

#### 日志

##### 切割(logrotate)

> https://blog.csdn.net/weixin_45070175/article/details/124638893

/etc/logrotate.d/nginx

```bash
/mydata/dotnet/${项目名}/logs/*.log {
    daily      # 每天分割一次
    size 5M    # 源文件小于5M时不分割
    rotate 30  # 保留最近30个分割后的日志文件
    create
    notifempty # 当日志文件为空时不分割
    missingok
    dateext  # 切割后的文件添加日期作为后缀
    dateyesterday # 配合dateext使用，添加前一天的日期作为分割后日志的后缀
    dateformat -%Y-%m-%d  # 格式为2022-02-08
}
```

### 视图

#### 建镜像

![镜像](镜像.png)

![新增镜像](新增镜像.png)

#### 创建容器

![容器](容器.png)

![容器1](容器1.png)

![容器2](容器2.png)

![容器3](容器3.png)

![容器4](容器4.png)

![容器5](容器5.png)

![容器6](容器6.png)

