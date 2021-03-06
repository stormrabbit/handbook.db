# Mysql 常用命令总结

- 登陆

```
    mysql -u root -p
```

- 查看数据库

```
    show databases;
```

- 进入数据库

```
 use mysql;
```

- 创建用户

```
    create user 'sekiro'@'localhost' identified by '123456' // 创建本地用户

    create user 'sekiro'@'%' identified by '123456' // 创建远程用户
```

- 为用户赋予权限

```
    grant all on *.* to 'sekiro'@'localhost';
    GRANT ALL PRIVILEGES ON gengar.* to 'gengar'@'%';
```

- 查看所有用户

```
    select user from mysql.user;
```

- 查看 RAP2_DELOS_APP 内所有数据表

```
    use RAP2_DELOS_APP
    show tables;
```

- [数据表增加列](https://blog.csdn.net/Agly_Clarlie/article/details/78195162)
```

ALTER TABLE `users` ADD COLUMN `pwd` VARCHAR(32) AFTER `name`;

```
## windows 安装 mysql 的方法

[这里](https://blog.csdn.net/zhouzezhou/article/details/52446608)