# 设置数据库

```
mongod.exe --dbpath D:\mytools\mongodb\data // 非安全启动

mongod.exe --auth --dbpath D:\mytools\mongodb\data\db // 安全启动
```


---
> 命令行运行mongod.exe
> 
> 
> 结果如下：
> 
> 
> 
> 错误原因：
> 
> 官方最新版的MongoDB需要： 
> VC++2015 RC x64的支持，否则会报出
> 
> 下载网址：https://www.microsoft.com/zh-cn/download/details.aspx?id=48145
> 
> 可以通过命令： msinfo32    产看自己电脑的版本等系统信息。

---

# 添加管理员


```
db.createUser({user: 'root',pwd: '123456789',roles: ['dbOwner']})
```
>注:3.4以前的addUser已经被废弃

# 添加基本安全设置以后访问方式

```
mongo 127.0.0.1:27017/mydb -u root -p // 回车后输入密码
```

# crud 操作

## 选中数据库

```
use mydb
```


## 增


```
db.user.save(a); //db.表名.save(数据)
```

## 删


```
db.user.remove( {name : "user1" } )
```

## 改


```
db.user.update( {"_id" : ObjectId("595b406f24ceea3ec9ef1c85"),"name" : "user1"}, {$set:{name:"user3", card:"KK8566"} } );

// db.表名.update({修改字段: 原值}, {$set: {修改字段:修改值}})
```

## 查

```
db.user.find({"name": "进击的废材"});

// db.表名.find();

// 接 .forEach( printjson); 去重打印
// findOne() 返回查询首个的值
// 接 .limit(数字); 限制结果集
```

# 基于mongoose的增删改查
## 安装npm依赖mongoose

```
npm install mongoose -save
```

## 创建连接

```
var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/mydb';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
```

## 创建Sechma(DAO层)

```
// 拿到Schema
var mongoose = require('./db.js');
var Schema = mongoose.Schema;
// 创建关系
var PlayerSchema = new Schema({
  name: {
    type: String
  },
  team: {
    type: Number
  },
  canBeSelected: {
    type: Boolean
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Player', PlayerSchema);
```
-   versionKey: false 的作用:
> {versionKey: false}是干嘛用？如果不加这个设置，我们通过mongoose第一次创建某个集合时，它会给这个集合设定一个versionKey属性值，这个属性值包含这个文档的内部版本，数据库中显示为_v，如图：


## 增删改查(基本可以算是service层)

### 增

```
playerService.insertPlayer = function(name, team, getInfoBack) {
  var player = new Player({
    name: name,
    team: team,
    canBeSelected: true
  });

  player.save(function(err, res) {
    if (err) {
      console.log("Error:" + err);
      getInfoBack(err);
    } else {
      console.log("Res:" + res);
      getInfoBack(res);
    }
  });
}
```

### 删

```
playerService.deletePlayer = function(_id, getInfoBack) {
  Player.remove({
    _id: _id
  }, function(err, res) {
    if (err) {
      console.log("Error:" + err);
      getInfoBack(err);
    } else {
      console.log("Res:" + res);
      getInfoBack(res);
    }
  });
}
```

### 改
```
playerService.updatePlayer = function(_id, team, getInfoBack) {
  console.log('_id:' + _id);
  console.log('team:' + team);
  Player.update({
    _id: _id
  }, {
    team: team
  }, function(err, res) {
    if (err) {
      console.log("Error:" + err);
      getInfoBack(err);
    } else {
      console.log("Res:" + res);
      getInfoBack(res);
    }
  });
}

```

### 查


```
playerService.findAllPlayers = function(getInfoBack) {
  Player.find({}, function(err, docs) {
    if (err) {
      console.log("Error:" + err);
      getInfoBack(err);
    } else {
      console.log("Res:" + docs);
      getInfoBack(docs);
    }
  });
}

playerService.findPlayerById = function(id, getInfoBack) {
  Player.findOne({
    _id: id
  }, function(err, docs) {
    if (err) {
      console.log("Error:" + err);
      getInfoBack(err);
    } else {
      getInfoBack(docs);
    }
  });
}

playerService.findPlayerByTeam = function(team, getInfoBack) {
  Player.find({
    team: team
  }, function(err, docs) {
    if (err) {
      console.log("Error:" + err);
      getInfoBack(err);
    } else {
      getInfoBack(docs);
    }
  });
}

```




# mongodb 使用脚本
mongodb 是基于js的,所以可以使用js脚本进行数据的保存或者复制
使用脚本的方式是讲脚本放入 mongodb 所在的bin目录下,然后运行命令行.

比如:

`js脚本test.js`


```
for (var i = 100 - 1; i >= 0; i--) {
  var tempNo = parseInt((Math.random() * 8)) + 1;
  var player = {
    name: '测试' + i,
    team: NumberInt(tempNo.toFixed(0)), // 使用NumberInt 是为了去掉小数点
    canBeSelected: true
  }
  db.players.save(player);
}
print('over');
```

`执行脚本的命令`


```
mongo 127.0.0.1:27017/mydb --quiet test.js
```


