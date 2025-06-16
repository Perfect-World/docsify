# 一套非常实用的Linux命令

> 总结了一套非常实用的Linux命令（基于CentOS 8）
>

> 十分全面的参考资料 [菜鸟教程](https://www.runoob.com/linux/linux-command-manual.html)https://www.runoob.com/linux/linux-command-manual.html

## 查看所有信息

```bash
#!/bin/bash

echo "===== CPU 信息 ====="
cat /proc/cpuinfo | grep "model name" | head -1
echo "物理CPU个数: $(cat /proc/cpuinfo | grep "physical id" | sort -u | wc -l)"
echo "逻辑CPU核心数: $(nproc --all)"

echo -e "\n===== 内存信息 ====="
free -h

echo -e "\n===== 磁盘空间 ====="
df -h

echo -e "\n===== 系统信息 ====="
cat /etc/os-release
echo "内核版本: $(uname -r)"

echo -e "\n===== 网卡信息 ====="
ip link show | grep ": "
ip addr show | grep inet | grep -v 127.0.0.1

echo -e "\n===== 网络带宽测试（需联网） ====="
if command -v speedtest-cli &> /dev/null; then
    speedtest-cli --simple
else
    echo "speedtest-cli未安装，可使用 'sudo apt install speedtest-cli' 安装"
fi
```

### nohup后台运行

nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。
nohup 要执行的命令 > 标准输出 > 让命令在后台执行

```bash
nohup java -jar /java/springboot.jar > /dev/null 2>&1 &
nohup java -jar /java/springboot.jar > /java/springboot.log 2>&1 &
```

### 压缩/解压


```bash
zip -q -r /mydata/adminvue.zip /mydata/dist
unzip -q -d /mydata/dist /mydata/adminvue.zip
  -q # 不显示指令执行过程。
  -r # 递归处理，将指定目录下的所有文件和子目录一并处理。
  -d # <目录> 指定文件解压缩后所要存储的目录。
  
tar -zcf /mydata/etc.tar.gz /mydata/etc
tar -zxf /mydata/etc.tar.gz -C /mydata/etc
  -z # 有gzip属性的
  -c # 压缩
  -x # 解压
  -v # 显示所有过程
  -f # 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。
```

### scp远程传输

```bash
1、从本地复制到远程 命令格式
scp /usr/local/data.zip root@ip:/usr/local
2、从远程复制到本地
scp root@ip:/usr/local/data.zip /usr/local
```

### systemctl防火墙

> systemctl命令是service和chkconfig命令的组合体，可用于管理系统。

```bash

systemctl list-units --type=service 			# 输出系统中各个服务的状态
systemctl status firewalld 								# 查看服务的运行状态
firewall-cmd --zone=public --list-ports 	# 查看防火墙开放端口
systemctl stop firewalld									# 关闭服务
systemctl start firewalld									# 启动服务
systemctl restart firewalld 							# 重新启动服务（不管当前服务是启动还是关闭）
systemctl reload firewalld							 	# 重新载入配置信息而不中断服务
systemctl disable firewalld 							# 禁止服务开机自启动
systemctl enable firewalld 								# 设置服务开机自启动
# 开启/关闭端口
firewall-cmd --zone=public --add-port=50001-50010:/tcp --permanent 
firewall-cmd --zone=public --remove-port=50001-50010:/tcp --permanent 
  firwall-cmd             		#是Linux提供的操作firewall的一个工具；
  –zone                     	#作用域
  –add-port=80/tcp   				#添加端口，格式为端口/通讯协议
  –permanent           			#永久生效，没有此参数重启后失效
```

### 文件目录管理

```bash
ls（英文全拼 list directory contents）命令用于显示指定工作目录下之内容（列出目前工作目录所含的文件及子目录)。
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
du -sh *                 # 查看当前目录所有子目录大小
du -h --max-depth=1 ./*  # 查看当前目录下的文件及文件夹所占大小

```

### 进程/网络管理

```bash
top 									# 查看即时活跃的进程
ps -ef | grep sshd 		# 查看进程的运行动态
netstat -tulnp 				# 查看系统中启动的监听服务
# 关闭指定端口号进程
lsof -i :10001|grep -v "PID"|awk '{print "kill -9",$2}'|sh
```

### cat

```bash
cat xxx.log | grep "关键字" 						# 根据关键字查看日志
cat xxx.log | grep "关键字" -A 10 			# 根据关键字查看后10行日志
cat xxx.log | grep "关键字" -B 10 			# 根据关键字查看前10行日志
cat -n xxx.log | grep "关键字" -C 10 	# 根据关键字查看前后10行日志，并显示出行号(-n)
cat xxx.log | head -n 10 							# 查看日志前 10 行
cat -n xxx.log | tail -n 10 					# 查看日志后 10 行，并显示出行号
  -A # 表示关键字之后，After
  -B # 表示关键字之前，Before
  -C # 表示关键字前后，Context
  -n # 表示打印显示行号
```

#### expect

#### netstat

```
netstat -ap | grep 20002

安装完成后，便可以使用Netstat命令查看当前的网络连接状态。输入以下命令可以查看所有TCP连接

netstat -at
这将会显示出所有本地和远程主机中的TCP连接。查看所有的UDP连接，可以使用以下命令

netstat -au
Netstat还可以显示目标主机的网络状态，使用-p参数来指定进程ID

netstat -ap 
另外，输入以下命令可以查看机器中已经绑定的socket端口

netstat -anlp
最后，如果要查看详细信息，使用-o参数

netstat -anlp -o
```

