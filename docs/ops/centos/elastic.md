# 搜索引擎

## 前言

Java中比较流行的搜索引擎是Elasticsearch，传统的数据库搜索，使用like’关键字%’，当内容过多时性能会大大降低，所以Elasticsearch就出现了。

下面，记录下Linux下Elasticsearch的安装过程。

## Linux下安装Elasticsearch

### 下载和解压安装包

官网下载地址： https://www.elastic.co/cn/downloads/elasticsearch

选择合适的版本下载，然后上传到Linux中

也可以在Linux命令行，直接执行以下命令进行下载（下载比较慢）：

```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.0-linux-x86_64.tar.gz
```

执行解压缩命令：

```
tar -zxvf elasticsearch-7.17.0-linux-x86_64.tar.gz -C /usr/local/elastic
```



### 解决es强依赖jdk问题

由于es和jdk是一个强依赖的关系，所以当我们在新版本的ElasticSearch压缩包中包含有自带的jdk，但是当我们的Linux中已经安装了jdk之后，就会发现启动es的时候优先去找的是Linux中已经装好的jdk，此时如果jdk的版本不一致，就会造成jdk不能正常运行，报错如下：

注：如果Linux服务本来没有配置jdk，则会直接使用es目录下默认的jdk，反而不会报错

warning: usage of JAVA_HOME is deprecated, use ES_JAVA_HOME
Future versions of Elasticsearch will require Java 11; your Java version from [/usr/local/jdk1.8.0_291/jre] does not meet this requirement. Consider switching to a distribution of Elasticsearch with a bundled JDK. If you are already using a distribution with a bundled JDK, ensure the JAVA_HOME environment variable is not set.
解决办法：

```
进入bin目录
cd /usr/local/elastic/elasticsearch-7.17.0/bin

修改elasticsearch配置
vim ./elasticsearch

############## 添加配置解决jdk版本问题 ##############

# 将jdk修改为es中自带jdk的配置目录

export JAVA_HOME=/usr/local/elastic/elasticsearch-7.17.0/jdk
export PATH=$JAVA_HOME/bin:$PATH

if [ -x "$JAVA_HOME/bin/java" ]; then
        JAVA="/usr/local/elastic/elasticsearch-7.17.0/jdk/bin/java"
else
        JAVA=which java
fi
```



### 解决内存不足问题

由于 elasticsearch 默认分配 jvm空间大小为2g，修改 jvm空间，如果Linux服务器本来配置就很高，可以不用修改。

error:
OpenJDK 64-Bit Server VM warning: INFO: os::commit_memory(0x00000000c6a00000, 962592768, 0) failed; error='Not enough space' (errno=12)
        at org.elasticsearch.tools.launchers.JvmOption.flagsFinal(JvmOption.java:119)
        at org.elasticsearch.tools.launchers.JvmOption.findFinalOptions(JvmOption.java:81)
        at org.elasticsearch.tools.launchers.JvmErgonomics.choose(JvmErgonomics.java:38)
        at org.elasticsearch.tools.launchers.JvmOptionsParser.jvmOptions(JvmOptionsParser.java:13

```
进入config文件夹开始配置，编辑jvm.options：
vim /usr/local/elastic/elasticsearch-7.17.0/config/jvm.options

默认配置如下：
-Xms2g
-Xmx2g
默认的配置占用内存太多了，调小一些：
-Xms256m
-Xmx256m
```



### 创建专用用户启动ES

root用户不能直接启动Elasticsearch，所以需要创建一个专用用户，来启动ES

java.lang.RuntimeException: can not run elasticsearch as root
        at org.elasticsearch.bootstrap.Bootstrap.initializeNatives(Bootstrap.java:101)
        at org.elasticsearch.bootstrap.Bootstrap.setup(Bootstrap.java:168)
        at org.elasticsearch.bootstrap.Bootstrap.init(Bootstrap.java:397)
        at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:159)
        at org.elasticsearch.bootstrap.Elasticsearch.execute(Elasticsearch.java:150)
        at org.elasticsearch.cli.EnvironmentAwareCommand.execute(EnvironmentAwareCommand.java:75)
        at org.elasticsearch.cli.Command.mainWithoutErrorHandling(Command.java:116)
        at org.elasticsearch.cli.Command.main(Command.java:79)
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:115)
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:81)

```
创建用户
useradd es

创建所属组：
chown es:es -R /usr/local/elastic/elasticsearch-7.17.0

切换到user-es用户
su es

进入bin目录
cd /usr/local/elastic/elasticsearch-7.17.0/bin

启动elasticsearch
./elasticsearch
```

如果出现如下错误信息（最大文件数太小、线程太小、内存太低）：

### 修改ES核心配置信息

执行命令修改elasticsearch.yml文件内容
vim /usr/local/elastic/elasticsearch-7.17.0/config/elasticsearch.yml

修改数据和日志目录
这里可以不用修改，如果不修改，默认放在elasticsearch根目录下

```
数据目录位置
path.data: /home/es/elasticsearch/data 
日志目录位置
path.logs: /home/es/elasticsearch/logs 
```

修改绑定的ip允许远程访问

```
#默认只允许本机访问，修改为0.0.0.0后则可以远程访问
绑定到0.0.0.0，允许任何ip来访问
network.host: 0.0.0.0 
初始化节点名称
cluster.name: elasticsearch 
node.name: es-node0
cluster.initial_master_nodes: ["es-node0"]
修改端口号（非必须）
http.port: 50014

```

### vm.max_map_count [65530] is too low问题

上面几个步骤依然没启动成功，继续解决问题：

ERROR: [1] bootstrap checks failed. You must address the points described in the following [1] lines before starting Elasticsearch.
bootstrap check failure [1] of [1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
elasticsearch用户拥有的内存权限太小，至少需要262144，解决办法：
在 /etc/sysctl.conf 文件最后添加如下内容，即可永久修改

```
切换到root用户
执行命令：su root

执行命令
vim /etc/sysctl.conf

添加如下内容
vm.max_map_count=262144

保存退出，刷新配置文件
sysctl -p

切换es用户，继续启动
su es
```

启动es服务
/usr/local/elastic/elasticsearch-7.17.0/bin/elasticsearch

启动成功后，可以通过https://test.woodenexchange.com/elastic访问，如果出现以下内容，说明ES安装成功：

```
{
  "name" : "VM-32-10-centos",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "_na_",
  "version" : {
    "number" : "7.17.0",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "bee86328705acaa9a6daede7140defd4d9ec56bd",
    "build_date" : "2022-01-28T08:36:04.875279988Z",
    "build_snapshot" : false,
    "lucene_version" : "8.11.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

### 可能遇到的max file descriptors [4096]问题

[1]: max file descriptors [4096] for elasticsearch process is too low, increase to at least [65535]

切换到root用户，执行命令：
vi /etc/security/limits.conf

添加如下内容：

* soft nofile 65536
* hard nofile 131072
* soft nproc 2048
* hard nproc 4096
然后重启linux

### ES服务的启动与停止

前台运行，Ctrl + C 则程序终止

```
/usr/local/elastic/elasticsearch-7.17.0/bin/elasticsearch
```

后台运行

```
/usr/local/elastic/elasticsearch-7.17.0/bin/elasticsearch -d

nohup /usr/local/elastic/elasticsearch-7.17.0/bin/elasticsearch > /dev/null  2>&1 &
```

出现started时启动完成

关闭ES服务

ps -ef | grep elastic

kill pid

说明：
Elasticsearch端口9300、9200，其中：
9300是tcp通讯端口，集群ES节点之间通讯使用，9200是http协议的RESTful接口

/usr/local/elastic/elasticsearch-7.17.0/bin/elasticsearch-setup-passwords interactive

elastic 		wencong863

## 使用logstash实现与Mysql数据同步

```
/usr/local/elastic
wget https://artifacts.elastic.co/downloads/logstash/logstash-8.4.3-linux-x86_64.tar.gz
tar -zxvf logstash-8.4.3-linux-x86_64.tar.gz
设定好文件
/usr/local/elastic/logstash-8.4.3/jar/mysql-connector-java-8.0.22.jar
/usr/local/elastic/logstash-8.4.3/sql/auction.sql
创建用户
useradd logstash
创建所属组：
chown logstash:logstash -R /usr/local/elastic/logstash-8.4.3
切换到logstash用户
su logstash
/usr/local/elastic/logstash-8.4.3/bin/logstash -f /usr/local/elastic/logstash-8.4.3/conf/hmjydtt.conf

nohup /usr/local/elastic/logstash-8.4.3/bin/logstash -f /usr/local/elastic/logstash-8.4.3/conf/hmjydtd.conf > /dev/null  2>&1 &

nohup /usr/local/elastic/logstash-8.4.3/bin/logstash -f /usr/local/elastic/logstash-8.4.3/conf/hmjydtt.conf > /dev/null  2>&1 &

nohup /usr/local/elastic/logstash-8.4.3/bin/logstash -f /usr/local/elastic/logstash-8.4.3/conf/hmjydtp.conf > /dev/null  2>&1 &

ps -ef | grep logstash

https://test.woodenexchange.com/elastic/auction/_search

应用
https://blog.csdn.net/UbuntuTouch/article/details/104982536
https://www.cnblogs.com/catcher1994/p/14856801.html
```



# 搜索引擎

参考网站

https://www.elastic.co/cn/downloads/elasticsearch
http://106.54.191.25:9200/
https://www.cnblogs.com/pilihaotian/p/5830754.html
https://www.cnblogs.com/catcher1994/p/14856801.html
https://blog.csdn.net/qq_23830637/article/details/108774730
https://www.jianshu.com/p/9ccf4f60d3f8
https://blog.csdn.net/qq_43816654/article/details/116756752

```
下载 elasticsearch-7.17.0-linux-x86_64.tar.gz
tar -zxvf elasticsearch-7.17.0-linux-x86_64.tar.gz
创建es-mysql sql脚本等文件
下载mysql-connector-java-8.0.19.jar 放入解压文件目录下
添加目录拥有权限
groupadd es 
useradd es -g es -p password # -g 指定组 -p 密码
chown es:es -R /usr/local/project/hmjydt/net/elasticsearch/elasticsearch-7.17.0/ # -R 处理指定目录以及其子目录下的所有文件
nohup /usr/local/project/hmjydt/net/elasticsearch/elasticsearch-7.17.0/bin/elasticsearch > /usr/local/project/hmjydt/net/elasticsearch/elasticsearch-7.17.0/elasticsearch.log 2>&1 &
ps -ef | grep elastic
下载Logstash
wget https://artifacts.elastic.co/downloads/logstash/logstash-6.8.23.tar.gz
tar -zxvf logstash-6.8.23.tar.gz
nohup /usr/local/project/hmjydt/net/elasticsearch/logstash-6.8.23/bin/logstash -e 'input { stdin { } } output { stdout {} }' > /usr/local/project/hmjydt/net/elasticsearch/logstash-6.8.23/logstash.log 2>&1 &
ps -ef | grep logstash
sudo /usr/local/project/hmjydt/net/elasticsearch/logstash/bin/logstash --path.settings /etc/logstash

nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/auction.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/auction > /usr/local/project/hmjydt/net/elasticsearch/es-mysql/auction.log 2>log &

nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/product.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/product > /usr/local/project/hmjydt/net/elasticsearch/es-mysql/product.log 2>log &;
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/auction.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/auction > /dev/null 2>log &;
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/company.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/company > /dev/null 2>log &
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/consult.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/consult > /dev/null 2>log &
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/liveroom.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/liveroom > /dev/null 2>log &
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/release.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/release > /dev/null 2>log &
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/leak.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/leak > /dev/null 2>log &
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/strictselect.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/strictselect > /dev/null 2>log &
nohup logstash -f /usr/local/project/hmjydt/net/elasticsearch/es-mysql/promotional.conf --path.data=/usr/local/project/hmjydt/net/elasticsearch/es-mysql/promotional > /dev/null 2>log &






su wencong

nohup /usr/local/wencong/elasticsearch-7.17.0/bin/elasticsearch > /usr/local/wencong/elasticsearch-7.17.0/elasticsearch.log 2>&1 &

ps -ef | grep elastic

nohup logstash -f /usr/local/wencong/es-mysql/product.conf --path.data=/usr/local/wencong/es-mysql/product > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/auction.conf --path.data=/usr/local/wencong/es-mysql/auction > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/company.conf --path.data=/usr/local/wencong/es-mysql/company > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/consult.conf --path.data=/usr/local/wencong/es-mysql/consult > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/liveroom.conf --path.data=/usr/local/wencong/es-mysql/liveroom > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/release.conf --path.data=/usr/local/wencong/es-mysql/release > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/leak.conf --path.data=/usr/local/wencong/es-mysql/leak > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/strictselect.conf --path.data=/usr/local/wencong/es-mysql/strictselect > /dev/null 2>log &
nohup logstash -f /usr/local/wencong/es-mysql/promotional.conf --path.data=/usr/local/wencong/es-mysql/promotional > /dev/null 2>log &



sudo /usr/share/logstash/bin/logstash --path.settings /etc/logstash

ps -ef | grep logstash

nohup /usr/share/logstash/bin/logstash -e 'input { stdin { } } output { stdout {} }' > /usr/share/logstash/logstash.log 2>&1 &





商品/除竞拍外的商品
	商品名称 商品类目 商品品牌 商品属性项 存货地
竞拍
	商品名称 商品属性项 存货地
店铺/参数必传店铺id
	商品名称 商品类目 商品品牌 商品属性项 存货地
资讯
	标题
直播间
	标题
求购
	求购名称 求购分类
捡漏
	商品名称 商品类目 商品品牌 商品属性项 存货地
严选
	商品名称 商品类目 商品品牌 商品属性项 存货地
优惠
	商品名称 商品类目 商品品牌 商品属性项 存货地

库存不为0 状态为有效 活动进行中

select p.id, 1 as `type`, p.`name`, concat( ifnull( p.`name`, '' ), '%',ifnull( p.inventory_location, '' ), '%',ifnull( pb.`name`, '' ), '%',ifnull( pc.`name`, '' ), '%',ifnull( group_concat(distinct sa.attri_value separator '%'), '' )  ) as context, case when p.state = 1 and sum(ps.inventory) > 0 and sum(ps.state) > 0 then 1 else 0 end as state from product as p left join product_brand as pb on p.brand_id = pb.id left join product_category as pc on p.category_id = pc.id left join product_sku as ps on p.id = ps.product_id left join sku_attributes as sa on ps.id = sa.sku_id where p.type = 1 and p.id > :sql_last_value group by p.id,p.`name`

select p.id, 2 as `type`, p.`name`, concat( ifnull( p.`name`, '' ), '%',ifnull( p.inventory_location, '' ), '%',ifnull( pb.`name`, '' ), '%',ifnull( pc.`name`, '' ), '%',ifnull( group_concat(distinct sa.attri_value separator '%'), '' )  ) as context, case when p.state = 1 and sum(ps.inventory) > 0 and sum(ps.state) > 0 then 1 else 0 end as state from product as p left join product_brand as pb on p.brand_id = pb.id left join product_category as pc on p.category_id = pc.id left join product_sku as ps on p.id = ps.product_id left join sku_attributes as sa on ps.id = sa.sku_id where p.type = 2 and p.id > :sql_last_value group by p.id,p.`name`

select p.id, 3 as `type`, p.`name`, p.company_id as companyId, concat( ifnull( p.`name`, '' ), '%',ifnull( p.inventory_location, '' ), '%',ifnull( pb.`name`, '' ), '%',ifnull( pc.`name`, '' ), '%',ifnull( group_concat(distinct sa.attri_value separator '%'), '' )  ) as context, case when p.state = 1 and sum(ps.inventory) > 0 and sum(ps.state) > 0 then 1 else 0 end as state from product as p left join product_brand as pb on p.brand_id = pb.id left join product_category as pc on p.category_id = pc.id left join product_sku as ps on p.id = ps.product_id left join sku_attributes as sa on ps.id = sa.sku_id where p.type = 1 and p.id > :sql_last_value group by p.id,p.`name`

select id, 4 as type,ifnull(title, '') as `name`,concat(ifnull(title, '')) as context, state from cms_consult where id > :sql_last_value

select id, 5 as type, ifnull(`name`, '') as `name`, concat(ifnull(`name`, ''),'%',ifnull(introduction, '')) as context, case when state = 1 and review = 1 then 1 else 0 end as state from live_room where id > :sql_last_value

select gr.id, 6 as type, gr.`name`, concat(ifnull(gr.`name`, ''),'%', ifnull(gr.author, ''),'%',ifnull(gr.phone, ''),'%',ifnull(gr.introduce, ''),'%',ifnull(gt.`name`, '')) as context, case when gr.examine = 3 and gr.shelf = 1 and gr.state = 1 then 1 else 0 end as state from grgq_release as gr left join grgq_type as gt on gr.type_id = gt.id where gr.id > :sql_last_value

select p.id, 7 as `type`, p.`name`, concat( ifnull( p.`name`, '' ), '%',ifnull( p.inventory_location, '' ), '%',ifnull( pb.`name`, '' ), '%',ifnull( pc.`name`, '' ), '%',ifnull( group_concat(distinct sa.attri_value separator '%'), '' )  ) as context, case when p.state = 1 and sum(ps.inventory) > 0 and sum(ps.state) > 0 then 1 else 0 end as state from product as p join cor_leak_product as clp on p.id = clp.product_id left join product_brand as pb on p.brand_id = pb.id left join product_category as pc on p.category_id = pc.id left join product_sku as ps on p.id = ps.product_id left join sku_attributes as sa on ps.id = sa.sku_id where p.type = 1 and clp.review = 1 and p.id > :sql_last_value group by p.id,p.`name`

select p.id, 8 as `type`, p.`name`, concat( ifnull( p.`name`, '' ), '%',ifnull( p.inventory_location, '' ), '%',ifnull( pb.`name`, '' ), '%',ifnull( pc.`name`, '' ), '%',ifnull( group_concat(distinct sa.attri_value separator '%'), '' )  ) as context, case when p.state = 1 and sum(ps.inventory) > 0 and sum(ps.state) > 0 then 1 else 0 end as state from product as p join cor_strict_select_product as cssp on p.id = cssp.product_id left join product_brand as pb on p.brand_id = pb.id left join product_category as pc on p.category_id = pc.id left join product_sku as ps on p.id = ps.product_id left join sku_attributes as sa on ps.id = sa.sku_id where p.type = 1 and cssp.review = 1 and p.id > :sql_last_value group by p.id,p.`name`

select p.id, 9 as `type`, p.`name`, concat( ifnull( p.`name`, '' ), '%',ifnull( p.inventory_location, '' ), '%',ifnull( pb.`name`, '' ), '%',ifnull( pc.`name`, '' ), '%',ifnull( group_concat(distinct sa.attri_value separator '%'), '' )  ) as context, case when p.state = 1 and sum(ps.inventory) > 0 and sum(ps.state) > 0 then 1 else 0 end as state from product as p join cor_promotional_product as cpp on p.id = cpp.product_id left join product_brand as pb on p.brand_id = pb.id left join product_category as pc on p.category_id = pc.id left join product_sku as ps on p.id = ps.product_id left join sku_attributes as sa on ps.id = sa.sku_id where p.type = 1 and cpp.review = 1 and p.id > :sql_last_value group by p.id,p.`name`

```

