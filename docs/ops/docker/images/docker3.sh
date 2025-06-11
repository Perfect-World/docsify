echo "开启防火墙"
sudo systemctl start firewalld
firewall-cmd --zone=public --add-port=80/tcp --add-port=443/tcp --permanent
systemctl restart firewalld
firewall-cmd --zone=public --list-ports
echo "重启docker服务"
sudo service docker restart

# nginx
docker run \
	--name nginx \
	--restart unless-stopped \
	-p 0.0.0.0:80:80 \
	-p 0.0.0.0:443:443 \
	-p 0.0.0.0:10000-10010:10000-10010 \
	-v /mydata/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
	-v /mydata/nginx/conf/conf.d:/etc/nginx/conf.d \
	-v /mydata/nginx/html:/usr/share/nginx/html \
	-v /mydata/nginx/logs:/var/log/nginx \
	-v /etc/localtime:/etc/localtime \
	-d nginx:1.22
# jexus
yum install -y expect
docker run \
    --name jexus \
    --restart unless-stopped \
    -p 0.0.0.0:20000-20010:20000-20010 \
    -v /mydata/jexus/www:/var/www \
    -v /mydata/jexus/conf:/usr/jexus/siteconf \
    -v /mydata/jexus/logs:/usr/jexus/log \
	-v /etc/localtime:/etc/localtime \
    -d jexus:latest
# docker 容器列表
docker ps -a
# 访问
curl http://127.0.0.1:80
curl http://127.0.0.1:20000

# 安装mysql命令
wget https://dev.mysql.com/get/mysql80-community-release-el9-1.noarch.rpm
rpm -ivh mysql80-community-release-el9-1.noarch.rpm
yum -y install mysql
mysql -V
rm -rf mysql80-community-release-el9-1.noarch.rpm

echo "
# nginx日志按日期分割
5 0 * * * root sh /mydata/nginx/sh/rotate.sh

# nginx日志导入mysql
10 0 * * * root sh /mydata/nginx/sh/mysql.sh
" >> /etc/crontab