
# 写在前面的废话

## Rap2 是神马？

官方回答是：[RAP2](https://github.com/thx/rap2-delos) 是在 RAP1 基础上重做的新项目，它能给你提供方便的接口文档管理、Mock、导出等功能，包含两个组件(对应两个 Github Repository)。

## Rap2 能做神马？

这里给出我个人使用到的见解：

1. 前后端分离的保证。

作为前端开发，总有求一后端环境而不得的时刻：有可能是界面已经开发完全而后端没有 Ready，也可能是前端正在样式走查后端却把环境切跑了。一般情况下，离开了完善的后端环境前端的开发只有停滞下来。但是有了 Rap2，前端可以自由的切换 mock 服务器或者开发服务器，大大减少了对后端的依赖性。

2. 更加友好的接口文档。

我不知道多少前端不看（或者不仔细看）接口文档，这固然有程序员本身的懒惰因素存在，但是不可否认的是后端文档写的五花八门一人一个写法，看起来也是头疼。

> 当然，主要原因还是懒。

Rap2 可以提供更加友好的接口文档特性，同时标准化团队的开发标准。作为一个前端接手新项目时，阅读接口文档（而且很可能东一篇西一篇）不如直接调用 Rap2 的接口、直观的阅读返回数据。

3. 接口数据的沉淀。

新的 Rap2 （Rap1 是没有）提供`历史`选项，可以很方便的观察接口数据变更情况。

4. Rap2 可以有助于前端自动化测试，但是目前这部分我的研究还不深入，所以暂时略过。



## 部署前的准备

1. 阅读 [Rap2](https://github.com/thx/rap2-delos) 的[官方 Wiki](https://github.com/thx/rap2-delos/wiki) ——至少要大略看一眼，部署过程中出现的一些问题多多少少在　wiki 里有涉及到。
2. 如果没有太多定制化操作，完全可以用 docker 进行部署 Rap2。手动部署 Rap2 说明需要对其功能进行部分的修改（我们选择手动部署是因为接入了公司提供统一的登陆方式），因此部署前可以评估下自己的需求。
3. 部署过程中总有各种各样的幺蛾子问题，还请用一颗平和的心态面对。
4. 本部署记录成功操作于 CentOs7（2次）、Mac（1次），windows 建议链接远程服务器。 



# 环境准备

## mysql

### 查看本机是否有 mysql

```
    ps -ef | grep mysql // 查看端口号

    service mysqld status // 如果没有会出现 unit not found

    mysql -u root -p
```

### 如果需要卸载

```
    rpm -e mysql　　// 普通删除模式
    rpm -e --nodeps mysql　　// 强力删除模式，如果使用上面命令删除时，提示有依赖的其它文件，则用该命令可以对其进行强力删除
```

### 安装 mysql

#### macOS
1. 访问 `https://dev.mysql.com/downloads/mysql/`（可能需要翻墙）
2. 选择 mac 系统，下载对应 .dmg。
3. 一路 next。

> 注：安装过程中可以选择是用加强版密码还是用简单（legcy）密码，开发时可以选简单密码。

#### CentOS 7

##### 设置镜像源并安装 mysql

```
    wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm

    sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm

    sudo yum install mysql-server
```

可能的错误：

```
    Error: Package: mysql-community-libs-5.6.35-2.el7.x86_64 (mysql56-community)
            Requires: libc.so.6(GLIBC_2.17)(64bit)
    Error: Package: mysql-community-server-5.6.35-2.el7.x86_64 (mysql56-community)
            Requires: libc.so.6(GLIBC_2.17)(64bit)
    Error: Package: mysql-community-server-5.6.35-2.el7.x86_64 (mysql56-community)
            Requires: systemd
    Error: Package: mysql-community-server-5.6.35-2.el7.x86_64 (mysql56-community)
            Requires: libstdc++.so.6(GLIBCXX_3.4.15)(64bit)
    Error: Package: mysql-community-client-5.6.35-2.el7.x86_64 (mysql56-community)
            Requires: libc.so.6(GLIBC_2.17)(64bit)
    You could try using --skip-broken to work around the problem
    You could try running: rpm -Va --nofiles --nodigest
```

解决：

```
    yum install glibc.i686
    yum list libstdc++*
```


##### 重置密码

```
    mysql -u root
```

可能的错误：`ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)`

解决：`sudo chown -R openscanner:openscanner /var/lib/mysql`


可能的错误：`chown: invalid user: ‘openscanner:openscanner’`

解决：`chown root /var/lib/mysql/`



重启 msql

```
    service mysqld restart
```

登陆：`mysql -u root -p`。此时没有密码，直接回车进入。

操作 mysql ，给 root 设置密码：

```
mysql > use mysql;
mysql > update user set password=password('123456') where user='root';
mysql > exit;
```

重启服务：`service mysqld restart`

> 查看 mysql 编码格式：`show variables like "%char%";`

## redis

### 查看本机是否有 radis

```
   whereis redis-cli

```

### 安装

```

// 访问 https://redis.io/download 查看最新版本

wget http://download.redis.io/releases/redis-6.0.10.tar.gz

// 解压缩

tar -zvxf redis-6.0.10.tar.gz

// 移动到默认目录下
mv redis-6.0.10 /usr/local/redis


// 编译
cd /usr/local/redis
make 

make install
```

成功标志：
```
    INSTALL redis-check-aof

    Hint: It's a good idea to run 'make test' ;)
```

#### 安装中的奇葩幺蛾子

- 问题：编译redis时 提示make cc Command not found。解决：`yum install gcc`。

- 问题2: make[1]: Entering directory '/usr/local/redis/src'。解决：`make MALLOC=libc`。

- 问题3：重新 make 之前运行命令：`make distclean`

- 问题4：`redis In file included from server.c:30:0: server.h:1082:5: error: expected specifier-qualifier-list before ‘_Atomic’ `（还有很多）。解决：`CC=clang make`

- 问题5：[如何安装 clang](https://stackoverflow.com/questions/44219158/how-to-install-clang-and-llvm-3-9-on-centos-7/48103599)

```
// 太长不看版
sudo yum install centos-release-scl
sudo yum install llvm-toolset-7
scl enable llvm-toolset-7 bash
clang --version
```

### 配置与启动

- 编辑 `redis.conf` 文件：
```
    # 运行 ip
    bind 127.0.0.1
    #bind 对应 ip  <== 有需要可以换成其他的
    # 指定以守护进程方式启动
    daemonize yes
    # 指定日志文件夹
    logfile "/usr/local/redis/logs/redis.log"
    # 指定数据文件夹
    dir /usr/local/redis/datas
```

- 创建 logs 文件夹 和 datas 文件夹

```
    [root@localhost redis]# mkdir /usr/local/redis/logs
    [root@localhost redis]# mkdir /usr/local/redis/datas 
```

- 启动

```
redis-server 
redis-server /usr/local/redis/redis.conf
```

- 查看效果

```
    ps -ef | grep 6379 
```


### 关闭

```
    redis-cli -h 127.0.0.1 shutdown
```


## 安装 pandoc

```

wget http://github.com/jgm/pandoc/releases/download/2.7.3/pandoc-2.7.3-linux.tar.gz


tar -zvxf pandoc-2.7.3.tar.gz

mv pandoc-2.7.3/* /usr/local/bin/pandoc

```


修改并编译 .bashrc ，增加：
```
alias pandoc=/usr/local/bin/pandoc/bin/pandoc

```


#　配置与运行 Rap2 服务器

## clone 仓库到本地

```
    git clone ssh://git@git.intra.weibo.com:2222/ad/fe/rap2-delos.git // 超粉 rap2

    git clone https://github.com/thx/rap2-delos // 官方 rap2
```

## mysql 设置 

mysql -u root -p 

CREATE DATABASE IF NOT EXISTS RAP2_DELOS_APP DEFAULT CHARSET utf8 COLLATE utf8_general_ci

create user 'sekiro'@'localhost' identified by '123456'  // 创建本地用户
 
create user 'sekiro'@'%' identified by '123456' // 创建远程用户 二选一

grant all on *.* to 'sekiro'@'localhost';


## 修改后端 config 配置

修改 rap2 目录下 `src/config` 内的 config 文件，配置正确的 mysql 用户密码、redis 启动信息。

eg:
```

// 前面省略
db: {
    dialect: "mysql",
    host: process.env.MYSQL_URL ?? "127.0.0.1",
    port: (process.env.MYSQL_PORT && parseInt(process.env.MYSQL_PORT)) || 3306,
    username: process.env.MYSQL_USERNAME ?? "sekiro",
    password: process.env.MYSQL_PASSWD ?? "123456",
    database: process.env.MYSQL_SCHEMA ?? "RAP2_DELOS_APP",
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    logging: false,
    dialectOptions: {
      connectTimeout: 20000
    }
  },
  redis: {
    host: process.env.REDIS_URL || '127.0.0.1',
    port: (process.env.REDIS_PORT && parseInt(process.env.REDIS_PORT)) || 6379
  },

// 后面省略
```


## rap2 编译

```
    npm install -g pm2 

    npm install -g typescript

    npm run build
    
    npm run start:redis

    npm run create-db
```

一切成功，出现：

```
----------------------------------------
DATABASE √
    HOST     127.0.0.1
    PORT     3306
    DATABASE RAP2_DELOS_APP
----------------------------------------
成功初始化 DB Schema
```

- `Error: Redis connection to 127.0.0.1:6379 failed - connect ECONNREFUSED 127.0.0.1:6379` redis 没打开， pm2 ls -a 查看一下

- `npm run create-db` 时可能报错，检查 `src/config` 下 `config.dev.ts`、`config.prod.ts` 里 mysql 的用户名是否配置正确。


## 运行

- 开发环境： npm run dev 

- 生产环境: npm start

> `npm start` 是以 pm2 启动，可以使用 `pm ls -a ` 查看启动情况。


# 配置并使用 nginx 反向代理前端界面

## 前端页面 build & 部署

偷懒，参见 Jenkins 布置吧。

就是正常的 `npm install`、 `npm run build`。

> 注：rap2 前端页面打包出的文件名字是 build，和惯用的 dist 不同。

## nginx 配置

```
server {
    listen 80;
        listen 443 ssl;
#       ssl on;
        ssl_certificate cert/server.pem;
        ssl_certificate_key cert/privkey.pem;
        server_name   mock.biz.weibo.com;
        root   /data0/jenkins_deploy/rap2;
        error_log /data0/jenkins_deploy/rap2/error.log;
        location ~ ^/(api)/.*$ {
          proxy_pass http://127.0.0.1:40041;
        }
        location / {
            try_files       $uri    $uri    @router;
            index   index.html      index.htm;
        }
             #404
        location        @router {
                rewrite ^.*$    /index.html     last;
        }
  }
```
