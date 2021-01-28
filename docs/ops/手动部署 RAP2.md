
# 查看本机是否有 mysql

```
    ps -ef | grep mysql

    service mysqld status
```

# redis

## 1. 查看本机是否有 radis

```
   whereis redis-cli

```

## 2. 没有，安装

```

// 访问 https://redis.io/download 查看最新版本

wget http://download.redis.io/releases/redis-6.0.10.tar.gz

// 解压缩

tar -zvxf redis-6.0.10.tar.gz

// 移动到默认目录下
mv redis-6.0.10 /usr/local/redis


```

> 问题：编译redis时 提示make cc Command not found。解决：`yum install gcc`。

> 问题2: make[1]: Entering directory '/usr/local/redis/src'。解决：`make MALLOC=libc`。


### 2.1 配置与启动

- 编辑 `redis.conf` 文件：
```
    # 绑定地址去除回环地址，添加物理地址
    #bind 127.0.0.1
    bind 对应 ip
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
    /usr/local/redis/bin/redis-server /usr/local/redis/redis.conf
```

- 查看效果

```
    ps -ef | grep 6379 
    /usr/local/redis/bin/redis-cli -h 对应ip -p 6379 
```


### 关闭

```
    /usr/local/redis/bin/redis-cli -h 对应ip shutdown
```


# 安装 pandoc

```

wget http://github.com/jgm/pandoc/releases/download/2.7.3/pandoc-2.7.3-linux.tar.gz


tar -zvxf pandoc-2.7.3.tar.gz

mv pandoc-2.7.3/* /usr/local/bin/pandoc

```


修改并编译 .bashrc ，增加：
```
alias pandoc=/usr/local/bin/pandoc/bin/pandoc

```

# 连接 mysql

mysql -e 'CREATE DATABASE IF NOT EXISTS RAP2_DELOS_APP DEFAULT CHARSET utf8 COLLATE utf8_general_ci'

create user 'test'@'localhost' identified by '123456'


Grant all privileges on RAP2_DELOS_APP.* to 'test'@'local';

grant all on *.* to 'test'@'localhost';

-- 1. 使用alter user
alter user set user.host='%' where user.user='root';
-- 2. 使用create user
create user 'userName'@'%' identified 'your_password';


防止出现 404 的方法

nginx 配置如下：

```
        location / {
        # 404
      
            try_files   $uri    $uri    @router;
            index   index.html  index.htm;

    }
         #404
        location    @router {
            rewrite ^.*$    /index.html last;
        }

```