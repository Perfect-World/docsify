# docker elasticsearch logstash

旧的版本

elasticsearch-7.17.0

logstash-8.4.3

```
docker pull elasticsearch:7.17.0
docker pull logstash:8.4.3

mkdir -p /mydata/elasticsearch/data
mkdir -p /mydata/elasticsearch/plugins
mkdir -p /mydata/elasticsearch/conf
chmod -R 777 /mydata/elasticsearch

docker run \
--user root \
--name elasticsearch \
--restart unless-stopped \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx1024m" \
-p 0.0.0.0:50008:9200 \
-p 0.0.0.0:50009:9300 \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch/conf:/usr/share/elasticsearch/config \
-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-v /mydata/elasticsearch/logs:/usr/share/elasticsearch/logs \
-d elasticsearch:7.17.0

docker stop elasticsearch
docker rm -f elasticsearch

docker ps -a

docker exec -it elasticsearch /bin/bash

elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.0/elasticsearch-analysis-ik-7.17.0.zip

http://1.117.249.132:50008

unzip -q -d /mydata/elasticsearch/plugins/analysis /mydata/elasticsearch/elasticsearch-analysis-ik-7.17.0.zip

firewall-cmd --zone=public --add-port=50009/tcp --permanent
firewall-cmd --zone=public --add-port=50010/tcp --permanent
firewall-cmd --zone=public --add-port=50011/tcp --permanent
systemctl reload firewalld

docker cp elasticsearch:/usr/share/elasticsearch/config /mydata/elasticsearch/conf


准备mysql连接jar包 sql文件

docker run \
--name logstash \
-v /mydata/logstash/conf/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
-v /mydata/logstash/sql:/usr/share/logstash/sql \
-v /mydata/logstash/logs:/usr/share/logstash/logs \
-d logstash:8.4.3

docker stop logstash
docker rm -f logstash

docker exec -it logstash /bin/bash

http://1.117.249.63:11002/
http://1.15.68.171:11002/

http://1.117.249.132:50008/
http://1.117.249.132:50010/

mkdir -p /mydata/elasticsearch_pro/data
mkdir -p /mydata/elasticsearch_pro/plugins
mkdir -p /mydata/elasticsearch_pro/conf
mkdir -p /mydata/elasticsearch_pro/logs
chmod -R 777 /mydata/elasticsearch_pro

docker run \
--user root \
--name elasticsearch_pro \
--restart unless-stopped \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch_pro" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx1024m" \
-p 0.0.0.0:50010:9200 \
-p 0.0.0.0:50011:9300 \
-v /mydata/elasticsearch_pro/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch_pro/conf:/usr/share/elasticsearch/config \
-v /mydata/elasticsearch_pro/plugins:/usr/share/elasticsearch/plugins \
-v /mydata/elasticsearch_pro/logs:/usr/share/elasticsearch/logs \
-d elasticsearch:7.17.0

docker stop elasticsearch_pro
docker rm -f elasticsearch_pro

docker ps -a

docker exec -it elasticsearch /bin/bash
docker exec -it elasticsearch_pro /bin/bash

es的bin目录下，执行设置用户名和密码的命令
bin/elasticsearch-setup-passwords interactive


mkdir -p /mydata/logstash_pro/conf
mkdir -p /mydata/logstash_pro/sql
mkdir -p /mydata/logstash_pro/logs
chmod -R 777 /mydata/logstash_pro

准备mysql连接jar包 sql文件

docker run \
--name logstash_pro \
-v /mydata/logstash_pro/conf/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
-v /mydata/logstash_pro/sql:/usr/share/logstash/sql \
-v /mydata/logstash_pro/logs:/usr/share/logstash/logs \
-d logstash:8.4.3

docker stop logstash_pro
docker rm -f logstash_pro

docker exec -it logstash /bin/bash



docker stop logstash
docker rm -f logstash
docker stop logstash_pro
docker rm -f logstash_pro
docker stop elasticsearch
docker rm -f elasticsearch
docker stop elasticsearch_pro
docker rm -f elasticsearch_pro

docker run \
--user root \
--name elasticsearch \
--restart unless-stopped \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx1024m" \
-p 0.0.0.0:50008:9200 \
-p 0.0.0.0:50009:9300 \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch/conf:/usr/share/elasticsearch/config \
-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-v /mydata/elasticsearch/logs:/usr/share/elasticsearch/logs \
-d elasticsearch:7.17.0

docker run \
--name logstash \
-v /mydata/logstash/conf/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
-v /mydata/logstash/sql:/usr/share/logstash/sql \
-v /mydata/logstash/logs:/usr/share/logstash/logs \
-d logstash:8.4.3

docker run \
--user root \
--name elasticsearch_pro \
--restart unless-stopped \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch_pro" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx1024m" \
-p 0.0.0.0:50010:9200 \
-p 0.0.0.0:50011:9300 \
-v /mydata/elasticsearch_pro/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch_pro/conf:/usr/share/elasticsearch/config \
-v /mydata/elasticsearch_pro/plugins:/usr/share/elasticsearch/plugins \
-v /mydata/elasticsearch_pro/logs:/usr/share/elasticsearch/logs \
-d elasticsearch:7.17.0

docker run \
--name logstash_pro \
-v /mydata/logstash_pro/conf/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
-v /mydata/logstash_pro/sql:/usr/share/logstash/sql \
-v /mydata/logstash_pro/logs:/usr/share/logstash/logs \
-d logstash:8.4.3

```

