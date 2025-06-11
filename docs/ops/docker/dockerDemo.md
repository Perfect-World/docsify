# docker 示例

> ## 实际项目部署

### dotnet示例

```bash
FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /usr/dotnet/code
COPY . .
RUN mkdir -p /usr/dotnet/code && mkdir -p /usr/dotnet/logs
EXPOSE 5000
ENTRYPOINT ["dotnet", "webadmin.dll", "--urls", "http://0.0.0.0:5000", "--environment", "Development"]
```

```
FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /usr/dotnet/code
COPY . .
RUN mkdir -p /usr/dotnet/code && mkdir -p /usr/dotnet/logs
EXPOSE 5000
ENTRYPOINT ["dotnet", "webadmin.dll", "--urls", "http://0.0.0.0:5000", "--environment", "Test"]
```

```
FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /usr/dotnet/code
COPY . .
RUN mkdir -p /usr/dotnet/code && mkdir -p /usr/dotnet/logs
EXPOSE 5000
ENTRYPOINT ["dotnet", "webadmin.dll", "--urls", "http://0.0.0.0:5000", "--environment", "Production"]
```

```
sudo chmod -R 777 /mydata/dotnet/hmjydt_pro/*
docker run \
    --user root \
    --name dotnet_hmjydt_pro1 \
    --restart unless-stopped \
    -e TZ=Asia/Shanghai \
    -p 0.0.0.0:30001:5000 \
    -v /mydata/dotnet/hmjydt_pro/code:/usr/dotnet/code \
    -v /mydata/dotnet/hmjydt_pro/logs:/usr/dotnet/logs \
    -v /usr/share/fonts/chinese:/usr/share/fonts/chinese \
    -v /etc/localtime:/etc/localtime \
    -d dotnet/pro/sdk:7.0
docker ps -a
```

```
sudo chmod -R 777 /mydata/dotnet/hmjydt_test/*
docker run \
    --user root \
    --name dotnet_hmjydt_test1 \
    --restart unless-stopped \
    -e TZ=Asia/Shanghai \
    -p 0.0.0.0:30011:5000 \
    -v /mydata/dotnet/hmjydt_test/code:/usr/dotnet/code \
    -v /mydata/dotnet/hmjydt_test/logs:/usr/dotnet/logs \
    -v /usr/share/fonts/chinese:/usr/share/fonts/chinese \
    -v /etc/localtime:/etc/localtime \
    -d dotnet/test/sdk:7.0
docker ps -a
```

```
sudo chmod -R 777 /mydata/dotnet/hmjydt_dev/*
docker run \
    --user root \
    --name dotnet_hmjydt_dev1 \
    --restart unless-stopped \
    -e TZ=Asia/Shanghai \
    -p 0.0.0.0:30021:5000 \
    -v /mydata/dotnet/hmjydt_dev/code:/usr/dotnet/code \
    -v /mydata/dotnet/hmjydt_dev/logs:/usr/dotnet/logs \
    -v /usr/share/fonts/chinese:/usr/share/fonts/chinese \
    -v /etc/localtime:/etc/localtime \
    -d dotnet/dev/sdk:7.0
docker ps -a
```



### nginx示例

```bash
docker run \
--user root \
--name nginx_hmjydt_pro1 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:40001:10001 \
-v /mydata/nginx/hmjydt_pro/conf:/etc/nginx \
-v /mydata/nginx/hmjydt_pro/code:/usr/share/nginx \
-v /mydata/nginx/hmjydt_pro/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

```bash
docker run \
--user root \
--name nginx_hmjydt_test1 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:40011:10001 \
-v /mydata/nginx/hmjydt_test/conf:/etc/nginx \
-v /mydata/nginx/hmjydt_test/code:/usr/share/nginx \
-v /mydata/nginx/hmjydt_test/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

```bash
docker run \
--user root \
--name nginx_hmjydt_dev1 \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:40021:10001 \
-v /mydata/nginx/hmjydt_dev/conf:/etc/nginx \
-v /mydata/nginx/hmjydt_dev/code:/usr/share/nginx \
-v /mydata/nginx/hmjydt_dev/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

```
docker run \
--user root \
--name nginx_hmjydt_website_pro \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:40041:10001 \
-v /mydata/nginx/hmjydt_website_pro/conf:/etc/nginx \
-v /mydata/nginx/hmjydt_website_pro/code:/usr/share/nginx \
-v /mydata/nginx/hmjydt_website_pro/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

```
docker run \
--user root \
--name nginx_hmjydt_website_test \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:40051:10001 \
-v /mydata/nginx/hmjydt_website_test/conf:/etc/nginx \
-v /mydata/nginx/hmjydt_website_test/code:/usr/share/nginx \
-v /mydata/nginx/hmjydt_website_test/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

```
docker run \
--user root \
--name nginx_hmjydt \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:80:10001 \
-p 0.0.0.0:443:10001 \
-v /mydata/nginx/hmjydt/conf:/etc/nginx \
-v /mydata/nginx/hmjydt/code:/usr/share/nginx \
-v /mydata/nginx/hmjydt/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

```
docker run \
--user root \
--name nginx_demo \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:40061:10001 \
-v /mydata/nginx/demo/conf:/etc/nginx \
-v /mydata/nginx/demo/code:/usr/share/nginx \
-v /mydata/nginx/demo/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

```
docker run \
--user root \
--name nginx_hm_erp \
--restart unless-stopped \
-e TZ=Asia/Shanghai \
-p 0.0.0.0:40071:10001 \
-v /mydata/nginx/hm_erp/conf:/etc/nginx \
-v /mydata/nginx/hm_erp/code:/usr/share/nginx \
-v /mydata/nginx/hm_erp/logs:/var/log/nginx \
-v /etc/localtime:/etc/localtime \
-d nginx:1.22
```

