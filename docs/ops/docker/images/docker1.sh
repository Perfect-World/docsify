# 安装docker使用官方安装脚本自动安装
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 安装docker compose v2.18.0
sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 将可执行权限应用于二进制文件：
sudo chmod +x /usr/local/bin/docker-compose
# 创建软链：
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# 启动docker
sudo service docker start
# 查看版本
sudo docker -v
sudo docker-compose -v
