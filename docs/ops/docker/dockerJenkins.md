# jenkins自动化部署

#### 创建挂载目录并赋权

```bash
mkdir -m 777 -p /mydata/jenkins
```

#### 下载安装包

> 自行下载，放到服务器/mydata/jenkins/package目录

```bash

wget https://nodejs.org/dist/v20.10.0/node-v20.10.0.tar.gz -o /mydata/jenkins/package/nodejs/node20.tar.gz
tar -zxf /mydata/jenkins/package/dotnet/dotnet-sdk-7.0.302-linux-x64.tar.gz -C /mydata/jenkins/package/dotnet/sdk7

tar xvf /mydata/jenkins/package/nodejs/node-v20.10.0-linux-x64.tar -C /mydata/jenkins/package/nodejs


git init
git config --global user.name "wencong"
git config --global user.email "zhao_new@sina.com"
git remote add origin https://gitee.com/wen-project/hemu-wms.git
git config --global credential.helper store
git config pull.rebase false
git pull origin "master"
git checkout "master"

npm install pnpm -g 
pnpm config get registry

npm config set registry http://registry.npm.taobao.org/
npm config get registry
pnpm config set registry https://registry.npmmirror.com/
pnpm config set registry

apache-maven-3.8.8-bin.tar.gz                
node-v16.13.2-linux-x64.tar.gz
dotnet-sdk-7.0.302-linux-x64.tar.gz  
jdk-17_linux-x64_bin.tar.gz
```

#### 处理安装包

```bash
# 创建目录
mkdir -m 777 -p /mydata/jenkins/package/java 
mkdir -m 777 -p /mydata/jenkins/package/nodejs 
mkdir -m 777 -p /mydata/jenkins/package/maven/repository 
mkdir -m 777 -p /mydata/jenkins/package/dotnet
# 解压
tar -zxf /mydata/jenkins/package/jdk-17_linux-x64_bin.tar.gz -C /mydata/jenkins/package
tar -zxf /mydata/jenkins/package/node-v16.13.2-linux-x64.tar.gz -C /mydata/jenkins/package
tar -zxf /mydata/jenkins/package/apache-maven-3.8.8-bin.tar.gz -C /mydata/jenkins/package
tar -zxf /mydata/jenkins/package/dotnet-sdk-7.0.302-linux-x64.tar.gz -C /mydata/jenkins/package/dotnet
tar -zxf /mydata/jenkins/package/dotnet-sdk-8.0.101-linux-x64.tar.gz -C /mydata/jenkins/package/dotnet
# 移动
mv /mydata/jenkins/package/jdk-17.0.7 /mydata/jenkins/package/java/jdk_17.0.7
mv /mydata/jenkins/package/node-v16.13.2-linux-x64 /mydata/jenkins/package/nodejs/node_16.13.2
mv /mydata/jenkins/package/apache-maven-3.8.8 /mydata/jenkins/package/maven/maven_3.8.8
# 删除，可不删
rm -rf /mydata/jenkins/package/jdk-17_linux-x64_bin.tar.gz
rm -rf /mydata/jenkins/package/node-v16.13.2-linux-x64.tar.gz
rm -rf /mydata/jenkins/package/apache-maven-3.8.8-bin.tar.gz
rm -rf /mydata/jenkins/package/dotnet-sdk-7.0.302-linux-x64.tar.gz
```

#### 安装镜像

```bash
docker pull jenkins/jenkins:latest
```

#### 创建容器

8080端口：jenkins服务器的对外URL地址

50000端口：slave节点与jenkins的通讯端口

```bash
docker run \
	--user root \
	--name jenkins \
	--restart unless-stopped \
	-e TZ=Asia/Shanghai \
	-p 0.0.0.0:50001:8080 \
	-p 0.0.0.0:50002:50000 \
	-v /mydata/jenkins:/var/jenkins_home \
	-v /etc/localtime:/etc/localtime \
	-d jenkins/jenkins:latest
```

#### 进入容器

```bash
docker exec -it jenkins /bin/bash
```

#### 安装依赖

```bash
apt-get update libssl1.1
apt-get install -y libc6 libgcc-s1 libgssapi-krb5-2  libstdc++6 zlib1g libicu-dev vim
```

#### 修改插件源

hudson.model.UpdateCenter.xml

```
http://updates.jenkins-ci.org/update-center.json 
->
http://mirror.xmission.com/jenkins/updates/update-center.json
```

/updates/default.json

```
www.google.com -> www.baidu.com
```

#### 赋权

```bash
chmod -R 777 /var/jenkins_home/package/*
```

#### 编辑环境变量

##### 编辑/root/.bashrc-->vim /root/.bashrc

```bash
# 设置java环境变量
export JAVA_HOME=/var/jenkins_home/package/java/jdk_17.0.7
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=$JAVA_HOME/lib
# 设置nodejs环境变量
export NODE_HOME=/var/jenkins_home/package/nodejs/node-v20.10.0-linux-x64
export PATH=$PATH:$NODE_HOME/bin
# 设置maven环境变量
export MAVEN_HOME=/var/jenkins_home/package/maven/maven_3.8.8
export PATH=$PATH:$MAVEN_HOME/bin
# 设置dotnet环境变量
export DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1
export PATH=$PATH:/var/jenkins_home/package/dotnet
```

##### 使配置生效

```bash
source /root/.bashrc
```

##### 编辑maven配置文件

```bash
vim /var/jenkins_home/package/maven/maven_3.8.8/conf/settings.xml
```

```xml
<localRepository>
	/var/jenkins_home/package/maven/repository
</localRepository>
```

```xml
<mirrors>
	<mirror>
		<id>alimaven</id>
		<name>aliyun maven</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public/</url>
		<mirrorOf>central</mirrorOf>
	</mirror>
</mirrors>
```

#### 查看环境、版本号

```bash
echo $PATH
java -version
dotnet --version 
node -v 
npm -v 
pnpm -v 
mvn --version
```

#### 重启jenkins

```
docker restart jenkins
```

#### 访问操作

```bash
# 访问页面
http://${ip}:${port}/
# 重启jenkins
http://${ip}:${port}/restart
# 重新加载配置
http://${ip}:${port}/reload
```

#### 第一次登录设置

```bash
# 查询密码
cat /mydata/jenkins/secrets/initialAdminPassword
# 设置环境变量
# 第一步 获取环境变量
docker exec -it jenkins /bin/bash
echo $PATH
# 第二步 设置Jenkins环境变量
位置: 
	--> Dashboard (首页)
	--> Manage Jenkins (系统设置)>
	--> System Configuration
	--> Configure System
	--> 全局属性
	--> 环境变量
填入:
	key: path
	value: 环境变量
# 设置时间 
System.setProperty('org.apache.commons.jelly.tags.fmt.timeZone', 'Asia/Shanghai')
```

#### 其它安装环境

```bash
# vue项目编译时，安装pnpm
npm install pnpm@7.9.5 -g
# 安装yarn
npm install -g yarn --registry=https://registry.npm.taobao.org
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g

```

### 相关操作说明

```
删除单个 job 构建记录
def jobName = "admin-test"
def maxNumber = 100    // 小于该构建编号的构建会被删除

Jenkins.instance.getItemByFullName(jobName).builds.findAll {
  it.number <= maxNumber
}.each {
  it.delete()
}

删除所有 job 构建记录
def maxNumberToKeep = 2 // 保留的最新构建记录数量

Jenkins.instance.getAllItems().each { job ->
  def builds = job.builds
  if (builds.size() > maxNumberToKeep) {
    builds = builds.toArray()
    Arrays.sort(builds, { a, b -> a.number - b.number })
    builds[0..(builds.size() - maxNumberToKeep - 1)].each {
      it.delete()
    }
  }
}


Jenkins.instance.getAllItems(Job.class).each {job ->
  println "[${job.name}] deleteting builds ..."
  job.builds.each {build ->
    build.delete()
  }
  println "[${job.name}] done!"
}

```

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |

