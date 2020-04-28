# mongodb

## 安装
- [官网](https://www.mongodb.com/)
- [各个版本下载地址](http://dl.mongodb.org/dl/win32/x86_64)
- [手册](https://docs.mongodb.com/manual/)

## 使用mongodb
在mongodb4.x 之前我们必须手动启动mongodb，但是mongodb4.x 以后不需要手动启动
mongodb 了，它默认会开机启动  

安装完成后直接运行mongo 命令就可以连上mongod 数据库。

## 创建、查看、删除数据库
- 查看  
  `show dbs`  
- 创建  
  + 使用数据库  
  `use zz`
  + 要想创建数据库成功需要添加一条数据  
  `db.user.insert({"name":"zz"})`
- 删除  
  + 显示当前表  
  `show collections`
  + 删除表 
  `db.user.drop()`
  + 删除数据库  
  `db.dropDatabase()`

## 表增删改查
- 查
  + 查找所有记录  
  `db.user.find()  -- select * from user`
  + 查询去掉后的当前集合中的某列的重复数据  
  `db.user.distinct("name")`
  + 查询某字段值的记录  
  `db.user.find({name:22})`
  + 查询大于的记录  
  `db.user.find({age:{$gt:11}})`
  + 查询小于的记录  
  `db.user.find({age:{$lt:11}})`
  + 查询大于等于的记录  
  `db.user.find({age:{$gte:11}})`
  + 查询小于等于的记录  
  `db.user.find({age:{$lte:11}})`
  + 查询小于等于并且大于等于的记录  
  `db.user.find({age:{$gte:11,$lte:44}})`
  + 模糊查询  
  `db.user.find({name:/xxxx/})`
  + 返回指定列  
  `db.user.find({}，{name:1})  第一个对象中可以加查询条件，第二个对象返回指定的列` 
  + 1 升序、-1 降序  
  `db.user.find().sort({age:1}) db.user.find().sort({age:-1})`
  + 查询前5条  
  `db.user.find().limit(5)`
  + 查询10条以后的条  
  `db.user.find().skip(10)`
  + 使用limit和skip进行分页 ---limit 是pageSize，skip 是(page-1)*pageSize  
  `db.user.find().skip(10).limit(10)`
  + or查询  
  `db.user.find({$or: [{age: 22}, {age: 25}]});`
  + 查找一条  
  `db.user.findOne();`
  + 统计数量  
  `db.user.find().count()`
- 改  
  `db.student.update({"name":"小明"},{$set:{"age":16}})  第一个对象为查询条件，第二个为需要修改的值，如果`
  `db.student.update({"name":"小明"},{$set:{"age":16}}，{multi:true}) 设置multi之后更改所有匹配数据`
  `db.student.update({"name":"小明"},{"name":"大明","age":16});  如果没有$set 直接替换整条数据`
- 增  
  `db.user.insert({name:"xxx"})`
- 删  
  `db.users.remove({age: 132})`
  `db.users.remove({age: 132},{justOne:true}) 只删除一条`  

## 索引
- 查看索引  
  `db.user.getIndexes()`
- 创建索引  
  `db.user.ensureIndex({username:1})`1升序 -1降序  
- 删除索引  
  `db.user.dropIndex({username:1})`  
- 复合索引  
  `db.user.ensureIndex({username:1,age:-1})`查询name和age或者只查name时能索引，但是只查询age时没有索引  
- 指定索引名(方法第二参数)
  `db.user.ensureIndex({username:1},{name:"xxxxx"})`  
- 唯一索引
  `db.username.ensureIndex({age:1},{unique:ture})`age值不能重复，相同时不能插入  

### 索引第二个对象可传参数[unique,name,background,dropDups]  
- unique 唯一索引
- name 索引名
- background 添加索引时会阻塞其他数据库操作，设置为true可以在后台执行
- dropDups 建立唯一索引时是否删除重复记录 <font color="red">3.0+版本已废弃</font>

### explain获得查询方面诸多有用的信息 参数有[executionStats]  
- executionStats 查询具体的执行时间  

## mongodb账户权限配置
1. 创建管理员  
```
  use admin
  db.createUser({
  user:'zz',
  pwd:'zz',
  roles:[{role:'root',db:'admin'}]
  })
```  
2. 修改Mongodb 数据库配置文件
```
路径：C:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg
配置：
security:
  authorization: enabled
```  
3. 重启mongodb 服务
4. 用超级管理员账户连接数据库
```
mongo admin -u 用户名-p 密码
mongo 192.168.1.200:27017/test -u user -p password  //远程连接带ip端口
```  
5. 给zz数据库创建一个用户只能访问zz,不能访问其他数据库
```
use zz
db.createUser(
{
user: "zzadmin",
pwd: "123456",
roles: [ { role: "dbOwner", db: "zz" } ]
}
)
```  
### Mongodb 账户权限配置中常用的命令
- show users; 查看当前库下的用户
- db.dropUser("zzadmin"); 删除用户
- db.updateUser( "admin",{pwd:"password"}); 修改用户密码
- db.auth("admin","password"); 密码认证  
```
mongo admin //先连接数据库
db.auth("zz","zz") //再输入密码
等同于 mongo admin -u zz -p zz
```  
### Mongodb 数据库角色
1. 数据库用户角色：read、readWrite;
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin;
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager;  
4. 备份恢复角色：backup、restore;
5. 所有数据库角色： readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root  
参考：https://www.cnblogs.com/zzw1787044/p/5773178.html

### 连接数据库的时候需要配置账户密码
`const url = 'mongodb://admin:123456@localhost:27017/';`

## mongodb高级查询aggregate 聚合管道
主要用于表关联查询、数据统计  
### MongoDB Aggregation 管道操作符
|  管道操作符   | 描述  |
|  ----  | ----  |
| $project  | 增加、删除、重命名字段 |
| $match  | 条件匹配。只满足条件的文档才能进入下一阶段 |
| $limit  | 限制结果的数量 |
| $skip   | 跳过文档的数量 |
| $sort   | 条件排序 |
| $group  | 条件组合结果统计 |
| $looup  | 用以引入其它集合的数据（表关联查询） |

### MongoDB Aggregation 管道表达式
|  常用表达式操作   | 描述  |
|  ----  | ----  |
| $addToSet  | 将文档指定字段的值去重 |
| $max  | 文档指定字段的最大值 |
| $min  | 文档指定字段的最小值 |
| $sum   | 文档指定字段求和 |
| $avg   | 文档指定字段求平均 |
| $gt  | 大于给定值 |
| $lt  | 小于给定值 |
| $eq  | 等于给定值 |

### 操作符实际例子
1. $project
```
// 返回的数据内容只有trade_no、all_price两个字段
db.order.aggregate([
{
$project:{ trade_no:1, all_price:1 }
}
])
```  
2. $match
```
// 返回大于等于90的数据，内容只有trade_no、all_price两个字段
db.order.aggregate([
{$project:{ trade_no:1, all_price:1 }},
{$match:{"all_price":{$gte:90}}}
])
```  
3. $group
```
// 先根据order_id分组，同组的num相加赋值给total，最后返回含有_id、total的数据
db.order_item.aggregate(
[{$group: {_id: "$order_id", total: {$sum: "$num"}}}]
)
```  
4. $sort
```
// 返回大于等于90的数据，根据all_price降序排序，内容只有trade_no、all_price两个字段
db.order.aggregate([
{$project:{ trade_no:1, all_price:1 }},
{$match:{"all_price":{$gte:90}}},
{$sort:{"all_price":-1}}
])
```  
5. $limit
```
// 只返回一条
db.order.aggregate([
{$project:{ trade_no:1, all_price:1 }},
{$match:{"all_price":{$gte:90}}},
{$sort:{"all_price":-1}},
{$limit:1}
])
```  
6. $skip
```
// 跳过一条数据返回剩下的数据
db.order.aggregate([
{$project:{ trade_no:1, all_price:1 }},
{$match:{"all_price":{$gte:90}}},
{$sort:{"all_price":-1}},
{$skip:1}
])
```  
7. $lookup 表关联(重点)
```
// 还能结合之前的操作符   疑问？items里面的值是否能用之前的操作进行筛选过滤字段
db.order.aggregate([
{
  $lookup:{
    from: "order_item", //需要查的表
    localField: "order_id", // 主表id
    foreignField: "order_id", // 名称可以不一样，自定义
    as: "items" // 返回的字段名叫items
  }
}
])

```