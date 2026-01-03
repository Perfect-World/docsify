docker git

1.生成私钥公钥

2.git 服务器上设置公钥，设置为只读

3.私钥放到部署服务器上

4.docker run

测试

```

docker run --rm \
  --user root \
  --name git_clone_scsmp_vue \
  -e TZ=Asia/Shanghai \
  -v /mydata/environment/git/.ssh:/root/.ssh \
  -v /mydata/project/scsmp-vue/code:/code \
  -w /code \
  alpine/git:latest \
  clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-vue.git .;
docker run --rm \
  --user root \
  --name git_clone_scsmp_h5 \
  -e TZ=Asia/Shanghai \
  -v /mydata/git/.ssh:/root/.ssh \
  -v /mydata/git/code1:/code \
  -w /code \
  alpine/git:latest \
  clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-app.git .;
docker run --rm \
  --user root \
  --name git_clone_scsmp_java \
  -e TZ=Asia/Shanghai \
  -v /mydata/git/.ssh:/root/.ssh \
  -v /mydata/git/code2:/code \
  -w /code \
  alpine/git:latest \
  clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-admin.git .;
```

### 删除镜像

```
docker stop git_scsmp_vue && docker rm git_scsmp_vue

```

### 拉取源码

```
docker run --rm \
  --user root \
  --name git_clone_scsmp_vue \
  -e TZ=Asia/Shanghai \
  -v /mydata/environment/git/.ssh:/root/.ssh \
  -v /mydata/project/scsmp-vue/code:/code \
  -w /code \
  alpine/git:latest \
  clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-vue.git .;
docker run --rm \
  --user root \
  --name git_clone_scsmp_h5 \
  -e TZ=Asia/Shanghai \
  -v /mydata/environment/git/.ssh:/root/.ssh \
  -v /mydata/project/scsmp-h5/code:/code \
  -w /code \
  alpine/git:latest \
  clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-app.git .;
docker run --rm \
  --user root \
  --name git_clone_scsmp_java \
  -e TZ=Asia/Shanghai \
  -v /mydata/environment/git/.ssh:/root/.ssh \
  -v /mydata/project/scsmp-java/code:/code \
  -w /code \
  alpine/git:latest \
  clone git@codeup.aliyun.com:66f0fd3f79b7fe080f32787e/zhxa/scsmp-admin.git .;
```

### 更新源码

```
docker run --rm \
  --user root \
  --name git_pull_scsmp_h5 \
  -e TZ=Asia/Shanghai \
  -v /mydata/git/.ssh:/root/.ssh \
	-v /mydata/git/code1:/code \
	-w /code \
	alpine/git:latest \
	pull;
```

