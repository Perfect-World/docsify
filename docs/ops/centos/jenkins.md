linux环境下安装jenkins(详细图文教程）
安装jenkins时需要安装好java和maven环境
java8安装方式 linux安装java8(详细图文教程）
maven安装方式 linux下安装maven（详细图文教程）
第一步：下载安装jenkins
jenkins官网：https://www.jenkins.io/download/

下载jenkins，命令如下（版本可查看官网，高版本需要java11以上）
wget https://repo.huaweicloud.com/jenkins/redhat-stable/jenkins-2.190.3-1.1.noarch.rpm


安装jenkins
rpm -ivh jenkins-2.190.3-1.1.noarch.rpm


修改jenkins的java配置（如果不修改，可能会出现报错）
vim /etc/init.d/jenkins

在其中加入你的java换的地址（操作如下）


第二步：启动jenkins
启动命令
启动命令：systemctl start jenkins
查看状态： systemctl status jenkins


外部访问时需要关闭防火墙，或者开启8080端口。为了运行其他程序，我这里就直接关闭防火墙。
查看防火墙状态
systemctl status firewalld
关闭防火墙状态
systemctl stop firewalld


第三步:访问jenkins
访问地址 ：
http://你的ip:8080


查看密码
查看密码命令
cat /var/lib/jenkins/secrets/initialAdminPassword


下一步填写用户信息

到此便可以开始使用了。



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