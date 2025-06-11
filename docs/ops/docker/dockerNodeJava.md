# Docker Node Java.md

## docket node server.js 示例

```
创建/mydata/node/images/Dockerfile
FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
创建/mydata/node/images/package.json
{
	"name": "docker_web_app",
	"version": "1.0.0",
	"description": "Node.js on Docker",
	"author": "First Last <first.last@example.com>",
	"main": "server.js",
	"scripts": {
		"start": "node server.js"
	},
	"dependencies": {
		"express": "^4.16.1"
	}
}
创建/mydata/node/images/server.js
'use strict';
const express = require('express');
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});


cd /mydata/node/images
docker build -t socket1 .

docker run --name socket1 \
-p 0.0.0.0:3000:3000 \
-itd socket1:latest

docker exec -it socket1 /bin/bash

docker stop socket1
docker rm -f socket1
docker rmi socket1

http://1.117.249.132:3000
```

## 实际node server.js

```
创建/mydata/node/images/Dockerfile
FROM node:latest
WORKDIR /usr/socket
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]
创建/mydata/node/images/package.json
{
	"name": "docker_web_app",
	"version": "1.0.0",
	"description": "Node.js on Docker",
	"author": "First Last <first.last@example.com>",
	"main": "server.js",
	"scripts": {
		"start": "node server.js"
	},
	"dependencies": {
		"express": "^4.16.1",
		"socket.io": "^4.5.0"
	}
}
创建/mydata/node/images/server.js
创建/mydata/node/images/package-lock.json

cd /mydata/node/images
docker build -t socket .

docker run --name socket \
-p 0.0.0.0:50006:3000 \
-itd socket:latest

docker ps -a

docker exec -it socket /bin/bash

http://1.117.249.132:50006

docker stop socket
docker rm -f socket
```

## docker jar镜像并运行

```
上传jar文件 /mydata/java/hmyl/images/hm-yl-service-0.0.1-SNAPSHOT.jar
创建/mydata/java/hmyl/Dockerfile
FROM openjdk:17-slim
WORKDIR /usr/java
COPY . .
#设置时区
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
EXPOSE 10901
CMD java -jar hm-yl-service-0.0.1-SNAPSHOT.jar > /usr/java/logs/log.log

cd /mydata/java/hmyl/images
docker build -t java_hmyl .

docker run --name java_hmyl \
-p 0.0.0.0:50007:10901 \
-v /mydata/java/hmyl/logs:/usr/java/logs \
-itd java_hmyl:latest

docker ps -a

docker exec -it java_hmyl /bin/bash

http://1.117.249.132:50007

docker stop java_hmyl
docker rm -f java_hmyl
```



