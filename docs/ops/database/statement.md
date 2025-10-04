# 开发者必备 Mysql 命令

> 开发者必备 Mysql 常用命令，涵盖了数据定义语句、数据操纵语句及数据控制语句

## 常用复杂 sql 语句

- 查询表名和注释

```
SELECT TABLE_NAME AS `Table Name`, TABLE_COMMENT AS `Comment` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'admin_java';  -- 替换为你的数据库名
```

- 分组取第一条

```
 SELECT SUBSTRING_INDEX(GROUP_CONCAT(coupon_type ORDER BY  cd_type ),',',1) as  cd_type  FROM   tab  WHERE cd_id  = 102  GROUP BY  cd_id HAVING  (cd_type != 0)
```

- 查询表字段

```
select group_concat('ud.`', column_name, 
case when column_name like '%\_%' then concat('` as `', underlineToCamel(column_name), '`') else '`' end 
order by ordinal_position asc separator ',') as column_name
from INFORMATION_SCHEMA.Columns where table_name='ums_department' and table_schema='demo';
```

- 一对多关联，获取多表中最新一条数据

```mysql
  实现思路
  先分组拼接，把大的放在第一个，然后用指定字符串分割，取第一个，特别注意分割的字符串一定是保证不会出现在需要分组拼接的字符串中，否则会导致数据不准确。
  group_concat( [distinct] 要连接的字段 [order by 排序字段 asc/desc ] [separator ‘分隔符’] )
  substring_index（被截取字段，关键字，关键字出现的次数）

  select ua.`id` as id,ua.`accounts` as accounts,ua.`nickname` as nickname,ua.`email` as email,ua.`note` as note,ua.`ctime` as ctime,
  substring_index(group_concat(sf.`url` order by sf.ctime desc),",",1) as fileUrl
  from ums_admin as ua
  left join sys_file_relation as sfr on ua.id = sfr.relation_id
  left join sys_file as sf on sfr.file_id = sf.id
  group by ua.`id`,ua.`accounts`,ua.`nickname`,ua.`email`,ua.`note`,ua.`ctime`
```

- with recursive 递归查询父子集

```mysql
查询所有父集(包含自身)
with recursive temp as
(
	select * from ums_menu where id = 参数
	union all
	select ta.* from ums_menu ta join temp on ta.id = temp.pid
)
select * from temp;

查询所有子集(包含自身)
with recursive temp as
(
	select * from ums_menu where id = 参数
	union all
	select ta.* from ums_menu ta join temp on ta.pid = temp.id
)
select * from temp
```

- 函数查询父子集

```mysql
查询所有父集(包含自身)
drop function if exists `getMenuParentIdList`;
create function `getMenuParentIdList`(childrenId int) returns varchar(1024) charset utf8mb4
	deterministic
begin
	declare stemp varchar(1024) default childrenId;
	declare sTempChd varchar(1024);
	set sTempChd =cast(childrenId as char);
		while sTempChd is not null do
			if sTemp<>sTempChd then 
			set sTemp = concat(sTemp,',',sTempChd);
			end if;
			select group_concat(pid) into sTempChd from ums_menu where find_in_set(id,sTempChd);
		end while;
	return sTemp;
end;
select getMenuParentIdList(33);
查询所有子集(包含自身)
drop function if exists `getMenuChildrenIdList`;
create function `getMenuChildrenIdList`(parentId int) returns varchar(1024) charset utf8mb4
	deterministic
begin
	declare sTemp varchar(1024) default parentId;
	declare sTempChd varchar(1024);   
	set sTempChd =cast(rootId as char);
	while sTempChd is not null do
		if sTemp<>sTempChd then 
		set sTemp = concat(sTemp,',',sTempChd);
		end if;
		select group_concat(id) into sTempChd from ums_menu where find_in_set(pid,sTempChd);
	end while;
	return stemp;
end;
select getMenuChildrenIdList(1);
```

- 删除重复数据

```mysql
  delete from sys_file_relation
  where id in (
  	select id from (
  		select file_id , relation_id, count(1) as count, id
  			from sys_file_relation
  		group by file_id , relation_id
  	) as t
  	where t.count > 1);
```

- MySQL性能优化之参数配置：

```shell
https://blog.csdn.net/lxw1005192401/article/details/110226506
```

## 数据定义语句(DDL)

### 数据库操作

- 登录数据库：

```shell
mysql -uroot -proot
```

- 创建数据库：

```sql
create database test
```

- 查看所有数据库：

```sql
show databases
```

- 选择数据库并使用：

```sql
use test
```

- 查看所有数据表：

```sql
show tables
```

- 删除数据库：

```sql
drop database test
```

### 表操作

- 创建表：

```sql
create table emp(ename varchar(10),hiredate date,sal decimal(10,2),deptno int(2))
```

```sql
create table dept(deptno int(2),deptname varchar(10))
```

- 查看表的定义：

```sql
desc emp
```

- 查看表定义（详细）：

```sql
show create table emp \G
```

- 删除表：

```sql
drop table emp
```

- 查询表字段：

```sql
select column_name,column_comment from information_schema.COLUMNS where table_name = '表名'
```

- 修改表字段：

```sql
alter table emp modify ename varchar(20)
```

- 添加表字段：

```sql
alter table emp add column age int(3)
```

- 删除表字段：

```sql
alter table emp drop column age
```

- 字段改名；

```sql
alter table emp change age age1 int(4)
```

- 修改表名：

```sql
alter table emp rename emp1
```

- 主键外键级联操作：

```sql
DROP TABLE IF EXISTS `sys_file_relation`;
CREATE TABLE `sys_file_relation` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编码 自增主键',
  `file_id` int NOT NULL COMMENT '文件id',
  PRIMARY KEY (`id`) USING BTREE
  KEY `fk_sys_file_id` (`file_id`) USING BTREE,
  CONSTRAINT `sys_file_fk_1` FOREIGN KEY (`file_id`) REFERENCES `sys_file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='文件关联表 ';

ON DELETE CASCADE ON UPDATE CASCADE
cascade 表示级联操作，就是说，如果为on update cascade，主键表中被参考字段更新，外键表中对应行相应更新；如果为on delete cascade，主键表中的记录被删除，外键表中对应行相应删除。
```



## 数据操纵语句(DML)

### 插入记录

- 指定名称插入：

```sql
insert into emp (ename,hiredate,sal,deptno) values ('zhangsan','2018-01-01','2000',1)
```

- 不指定名称插入：

```sql
insert into emp values ('lisi','2018-01-01','2000',1)
```

- 批量插入数据：

```sql
insert into dept values(1,'dept1'),(2,'dept2')
```

### 修改记录

```sql
update emp set sal='4000',deptno=2 where ename='zhangsan'
```

### 删除记录

```sql
delete from emp where ename='zhangsan'
```

### 查询记录

- 查询所有记录：

```sql
select * from emp
```

- 查询不重复的记录：

```sql
select distinct deptno from emp
```

- 条件查询：

```sql
select * from emp where deptno=1 and sal<3000
```

- 排序和限制：

```sql
select * from emp order by deptno desc limit 2
```

- 分页查询(查询从第 0 条记录开始 10 条)：

```sql
select * from emp order by deptno desc limit 0,10
```

- 聚合(查询部门人数大于 1 的部门编号)：

```sql
select deptno,count(1) from emp group by deptno having count(1) > 1
```

- 连接查询：

```sql
select * from emp e left join dept d on e.deptno=d.deptno
```

- 子查询：

```sql
select * from emp where deptno in (select deptno from dept)
```

- 记录联合：

```sql
select deptno from emp union select deptno from dept
```

## 数据控制语句(DCL)

### 权限相关

- 授予操作权限(将 test 数据库中所有表的 select 和 insert 权限授予 test 用户)：

```sql
grant select,insert on test.* to 'test'@'localhost' identified by '123'
```

- 查看账号权限：

```sql
show grants for 'test'@'localhost'
```

- 收回操作权限：

```sql
revoke insert on test.* from 'test'@'localhost'
```

- 授予所有数据库的所有权限：

```sql
grant all privileges on *.* to 'test'@'localhost'
```

- 授予所有数据库的所有权限(包括 grant)：

```sql
grant all privileges on *.* to 'test'@'localhost' with grant option
```

- 授予 SUPER PROCESS FILE 权限（系统权限不能指定数据库）：

```sql
grant super,process,file on *.* to 'test'@'localhost'
```

- 只授予登录权限：

```sql
grant usage on *.* to 'test'@'localhost'
```

### 帐号相关

- 删除账号：

```sql
drop user 'test'@'localhost'
```

- 修改自己的密码：

```sql
set password = password('123')
```

- 管理员修改他人密码：

```sql
set password for 'test'@'localhost' = password('123')
```

## 其他

### 字符集相关

- 查看字符集：

```sql
show variables like 'character%'
```

- 创建数据库时指定字符集：

```sql
create database test2 character set utf8
```

### 时区相关

- 查看当前时区（UTC 为世界统一时间，中国为 UTC+8）：

```sql
show variables like "%time_zone%"
```

- 修改 mysql 全局时区为北京时间，即我们所在的东 8 区：

```sql
set global time_zone = '+8:00';
```

- 修改当前会话时区：

```sql
set time_zone = '+8:00'
```

- 立即生效：

```sql
flush privileges
```

## 常用 sql 语句

> 以权限系统中常用 sql 解释说明

### 关联查询

- 查询管理员分页列表包含角色名称

  ```mysql
  select
  	ua.`id` as id,ua.`accounts` as accounts,ua.`nickname` as nickname,ua.`email` as email,
  	ua.`note` as note,ua.`ctime` as ctime, group_concat(uar.`role_id`) as roleIdStr
  from ums_admin as ua
  left join ums_admin_role as uar on ua.id = uar.admin_id
  where ua.id = 1 and ua.state = 1
  group by ua.`id`,ua.`accounts`,ua.`nickname`,ua.`email`,ua.`note`,ua.`ctime`
  order by ua.ctime desc
  limit 10 offset 0;
  ```
- 管理员菜单列表

  ```mysql
  select
  	t.`id`,t.`pid`,t.`name`,t.`router`,t.`icon`,t.`is_show` as isShow,t.`type`,t.`sort`,t.`view_path` as viewPath,t.`keep_alive` as keepAlive,t.`state`,t.`ctime`,t.`admin_id` as adminId
  	from (select um.`id`,um.`pid`,um.`name`,um.`router`,um.`icon`,um.`is_show`,um.`type`,um.`sort`,um.`view_path`,um.`keep_alive`,um.`state`,um.`ctime`,um.`admin_id`
  					from ums_menu as um
  					join ums_role_menu as urm on um.id = urm.menu_id
  					join ums_role as ur on urm.role_id = ur.id
  					join ums_admin_role as uar on ur.id = uar.role_id
  				where uar.admin_id = 1 and um.state = 1 and ur.state = 1
  				union all
  				select um.`id`,um.`pid`,um.`name`,um.`router`,um.`icon`,um.`is_show`,um.`type`,um.`sort`,um.`view_path`,um.`keep_alive`,um.`state`,um.`ctime`,um.`admin_id`
  					from ums_menu as um
  					join ums_admin_menu as uam on um.id = uam.menu_id
  				where uam.admin_id = 1 and um.state = 1 and uam.state = 1
  				union all
  				select um.`id`,um.`pid`,um.`name`,um.`router`,um.`icon`,um.`is_show`,um.`type`,um.`sort`,um.`view_path`,um.`keep_alive`,um.`state`,um.`ctime`,um.`admin_id`
  					from ums_menu as um
  					join ums_role_menu as urm on um.id = urm.menu_id
  					join ums_role as ur on urm.role_id = ur.id
  					join ums_department_role as udr on ur.id = udr.role_id
  					join ums_department as ud on udr.department_id = ud.id
  					join ums_admin_department as uad on ud.id = uad.department_id
  				 where uad.admin_id = 1 and um.state = 1 and ud.state = 1 and ur.state = 1
  	) as t
  where t.`id` not in (select uam.menu_id from ums_admin_menu as uam where uam.admin_id = 1 and uam.state = -1 )
  group by t.`id`,t.`pid`,t.`name`,t.`router`,t.`icon`,t.`is_show`,t.`type`,t.`sort`,t.`view_path`,t.`keep_alive`,t.`state`,t.`ctime`,t.`admin_id` order by t.`pid`, t.`sort`;
  ```
- 获取登录管理员有效的会话令牌

  ```mysql
  select
  	ua.id,ua.accounts,ua.password,ua.nickname,ua.email,ua.note,ua.state,ua.ctime
  	from ums_token as ut
  	join ums_admin as ua on ut.admin_id = ua.id
  where ut.token = token and ut.itime > replace(unix_timestamp(current_timestamp(3)),'.','') 		and ua.state = 1
  order by ut.ctime desc
  limit 1 offset 0;
  ```

### 批量插入

- 管理员绑定角色

  ```mysql
  insert into `ums_admin_role`(`admin_id`, `role_id`) values (1, 1), (1, 2);
  ```

### 批量删除

- 管理员解绑角色

  ```mysql
  delete from `ums_admin_role` where `admin_id` = 1 and `role_id` in (1, 2);
  ```

### 批量修改

- 管理员批量退出

  ```mysql
  update `ums_token` set itime = replace(unix_timestamp(current_timestamp(3)),'.','') where `admin_id` = (1, 2) and itime > replace(unix_timestamp(current_timestamp(3)),'.','')
  ```

### sql 函数

- 替换字符串

  ```mysql
  replace(字段, 旧替换字符, 新换字符);
  ```
- 添加字段

  ```mysql
  alter table 表名 add 字段名 varchar(32) comment '注释';
  ```
- 修改字段

  ```mysql
  alter table 表名 modify 字段名 varchar(32) default null comment '注释';
  ```
- 删除字段

  ```mysql
  alter table 表名 drop column 字段名1,drop column 字段名2;
  ```
- 添加唯一索引

  ```mysql
  ALTER TABLE `table_name` ADD UNIQUE (`column`)
  ```

```
CREATE FUNCTION `underlineToCamel` (
	paramString VARCHAR ( 200 )) RETURNS VARCHAR ( 200 ) CHARSET utf8 DETERMINISTIC BEGIN
	
	SET paramString = LOWER( paramString );
	
	SET paramString = REPLACE ( paramString, '_a', 'A' );
	
	SET paramString = REPLACE ( paramString, '_b', 'B' );
	
	SET paramString = REPLACE ( paramString, '_c', 'C' );
	
	SET paramString = REPLACE ( paramString, '_d', 'D' );
	
	SET paramString = REPLACE ( paramString, '_e', 'E' );
	
	SET paramString = REPLACE ( paramString, '_f', 'F' );
	
	SET paramString = REPLACE ( paramString, '_g', 'G' );
	
	SET paramString = REPLACE ( paramString, '_h', 'H' );
	
	SET paramString = REPLACE ( paramString, '_i', 'I' );
	
	SET paramString = REPLACE ( paramString, '_j', 'J' );
	
	SET paramString = REPLACE ( paramString, '_k', 'K' );
	
	SET paramString = REPLACE ( paramString, '_l', 'L' );
	
	SET paramString = REPLACE ( paramString, '_m', 'M' );
	
	SET paramString = REPLACE ( paramString, '_n', 'N' );
	
	SET paramString = REPLACE ( paramString, '_o', 'O' );
	
	SET paramString = REPLACE ( paramString, '_p', 'P' );
	
	SET paramString = REPLACE ( paramString, '_q', 'Q' );
	
	SET paramString = REPLACE ( paramString, '_r', 'R' );
	
	SET paramString = REPLACE ( paramString, '_s', 'S' );
	
	SET paramString = REPLACE ( paramString, '_t', 'T' );
	
	SET paramString = REPLACE ( paramString, '_u', 'U' );
	
	SET paramString = REPLACE ( paramString, '_v', 'V' );
	
	SET paramString = REPLACE ( paramString, '_w', 'W' );
	
	SET paramString = REPLACE ( paramString, '_x', 'X' );
	
	SET paramString = REPLACE ( paramString, '_y', 'Y' );
	
	SET paramString = REPLACE ( paramString, '_z', 'Z' );
	
	SET paramString = REPLACE ( paramString, '_', '' );
	RETURN paramString;

END

```

