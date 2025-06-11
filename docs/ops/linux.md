# 一套非常实用的Linux命令

> 总结了一套非常实用的Linux命令（基于CentOS 8）
>
> 十分全面的参考资料 [菜鸟教程](https://www.runoob.com/linux/linux-command-manual.html)https://www.runoob.com/linux/linux-command-manual.html

## 常用命令

du -h --max-depth=1 /www
```
1.查看CPU信息 lscpu
2.查看内存信息 free -h
3.查看文件系统信息 df -h
4.查看系统信息 uname
5.查看磁盘空间大小 lsblk
6.查看CUP使用情况 top 
```

### nohup

```bash
nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。

nohup 要执行的命令 > 标准输出 > 让命令在后台执行

示例
nohup java -jar /java/springboot.jar > /dev/null 2>&1 &

nohup java -jar /java/springboot.jar > /java/springboot.log 2>&1 &
```

### zip/tar

```bash
zip -q -r /mydata/adminvue.zip /mydata/dist
unzip -q -d /mydata/dist /mydata/adminvue.zip
-q 不显示指令执行过程。
-r 递归处理，将指定目录下的所有文件和子目录一并处理。
-d <目录> 指定文件解压缩后所要存储的目录。

tar -zcf /mydata/etc.tar.gz /mydata/etc
tar -zxf /mydata/etc.tar.gz -C /mydata/etc
-z：有gzip属性的
-c: 压缩
-x：解压
-v：显示所有过程
-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。
```

### scp/ssh

```bash
1、从本地复制到远程 命令格式：
scp /usr/local/data.zip root@ip:/usr/local
2、从远程复制到本地
scp root@ip:/usr/local/data.zip /usr/local

ssh root@ip
```

### systemctl防火墙

> systemctl命令是service和chkconfig命令的组合体，可用于管理系统。

```bash
输出系统中各个服务的状态：
	systemctl list-units --type=service
查看服务的运行状态：
	systemctl status firewalld
查看防火墙开放端口
	firewall-cmd --zone=public --list-ports
关闭服务：
	systemctl stop firewalld
启动服务：
	systemctl start firewalld
重新启动服务（不管当前服务是启动还是关闭）：
	systemctl restart firewalld
重新载入配置信息而不中断服务：
	systemctl reload firewalld
禁止服务开机自启动：
	systemctl disable firewalld
设置服务开机自启动：
	systemctl enable firewalld
开启端口81
firewall-cmd --zone=public \
--add-port=80/tcp \
--add-port=443/tcp \
--permanent
关闭81端口
firewall-cmd --zone=public \
--remove-port=80/tcp \
--remove-port=443/tcp \
--permanent
命令含义：
       –zone                     	#作用域
       –add-port=80/tcp   				#添加端口，格式为：端口/通讯协议
       –permanent           			#永久生效，没有此参数重启后失效
       firwall-cmd             		#是Linux提供的操作firewall的一个工具；
```

### 文件管理

```bash
ls（英文全拼： list directory contents）命令用于显示指定工作目录下之内容（列出目前工作目录所含的文件及子目录)。
ls -l                    # 以长格式显示当前目录中的文件和目录
ls -a                    # 显示当前目录中的所有文件和目录，包括隐藏文件
ls -lh                   # 以人类可读的方式显示当前目录中的文件和目录大小
ls -t                    # 按照修改时间排序显示当前目录中的文件和目录
ls -R                    # 递归显示当前目录中的所有文件和子目录
ls -l /etc/passwd        # 显示/etc/passwd文件的详细信息

pwd											 # 获取目前所在工作目录的绝对路径
su root									 # 改变用户身份（切换到超级用户）
mkdir										 # 创建目录
rm -rf testdir/					 # 强制删除某个目录及其子目录
cp -r /mydata/tes1 /mydata/test2  # 用于拷贝文件，例如将test1目录复制到test2目录
mv text.txt text2.txt 	 # 用于移动或覆盖文件
	
```

### 进程/网络管理

```bash
查看sshd进程的运行动态：
	ps -ef | grep sshd
查看即时活跃的进程，类似Windows的任务管理器。
	top
显示系统内存状态（单位MB）：
	free -m
查看磁盘空间占用情况：
	df -hT
查看当前目录下的文件及文件夹所占大小：
	du -h --max-depth=1 ./*
查看系统中启动的监听服务：
	netstat -tulnp
cpu情况：
	top
```

### cat

```bash
根据关键字查看日志
cat xxx.log | grep "关键字"
根据关键字查看后10行日志
cat xxx.log | grep "关键字" -A 10
根据关键字查看前10行日志
cat xxx.log | grep "关键字" -B 10
根据关键字查看前后10行日志，并显示出行号(-n)
cat -n xxx.log | grep "关键字" -C 10
查看日志前 10 行
cat xxx.log | head -n 10
查看日志后 10 行，并显示出行号
cat -n xxx.log | tail -n 10
  -A 表示关键字之后，After
  -B 表示关键字之前，Before
  -C 表示关键字前后，Context
  -n  表示打印显示行号
```

#### 查看当前目录所有子目录大小

```
du -sh *
```

```bash
# 关闭指定端口号进程
lsof -i :10001|grep -v "PID"|awk '{print "kill -9",$2}'|sh
ps -ef | grep dotnet

# 嵌入式
shell编程之expect
```

```
Ubuntu
查看当前目录下所有文件和文件夹的大小 du -h
只查看当前目录的总大小 du -sh
查看当前目录下指定深度的文件和文件夹大小 du -h -d 1
```

#### netstat

```
netstat -ap | grep 20002

安装完成后，便可以使用Netstat命令查看当前的网络连接状态。输入以下命令可以查看所有TCP连接：

netstat -at
这将会显示出所有本地和远程主机中的TCP连接。查看所有的UDP连接，可以使用以下命令：

netstat -au
Netstat还可以显示目标主机的网络状态，使用-p参数来指定进程ID：

netstat -ap 
另外，输入以下命令可以查看机器中已经绑定的socket端口：

netstat -anlp
最后，如果要查看详细信息，使用-o参数：

netstat -anlp -o
```

