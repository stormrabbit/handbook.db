###### 安装

```
    npm install -g pm2
```

###### 启动并监视运行

```
    pm2 start main.js --watch
```

###### 显示已有进程

```
    pm2 ls -a
```

###### 重命名

```
    pm2 start app.js --name wb123
```

###### 停止

```
    pm2 stop main // 停止 main 的运行
    pm2 stop all // 全部停止
```

###### 删除

```
    pm2 delete main // 删除 main
    pm2 detete all // 全部删除
```

###### 查看

```
    pm2 describe main // 查看 main 的详细信息
    pm2 monit // 查看性能
```


#### 参考 

[nodejs高大上的部署方式-PM2](https://www.cnblogs.com/zhoujie/p/nodejs4.html) 作者[单曲循环](https://www.cnblogs.com/zhoujie/)