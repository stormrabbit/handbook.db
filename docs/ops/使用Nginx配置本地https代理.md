
> 开发过程中的问题，本机开发使用的是 http 环境，但是 QA 使用的是 https 环境。因此每次想连 qa 环境都得脱层皮，拜托明月换端口。

# 使用 Nginx 配置本地 https 代理

## 1. 安装 nginx && 鉴定是否安装 nginx

### 1.1 未安装进行安装

```
    sudo brew install nginx
```

### 1.2 已安装查看版本

```
    // 查看版本
    nginx -v
    // 查看 Nginx 运行状态
    ps -ef | grep nginx
    // 查看 conf 位置
    nginx -t
```

### 1.3 启动/停止/重启

```
    sudo nginx
    sudo nginx -s stop
    sudo nginx -s reload
```

> 启动后在浏览器中输入 `localhost:8080` 查看是否成功启动nginx

## 2. 使用 nginx 配置 https 转 http

### 2.1 配置 nginx 

定位到 nginx 的 conf 文件，打开。

加入以下配置：
```
server {
        listen       443 ssl;
        # 域名，实际情况下时，将这个改成想代理的域名，不加协议
        server_name  xx.cn;
        # ssl on; # <== 此条已过期作废
        ssl_session_timeout 5m;        
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置        
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置 
        # 证书位置
        ssl_certificate  ssl/server.crt;#配我们生成的 nginx-1.14.0/https/xx.cn/server.pem;
        ssl_certificate_key ssl/server.key;#配我们生成的 nginx-1.14.0/https/xx.cn/privkey.pem;
        location / {
            proxy_pass http://xx.cn;
            #这里的xx.cn 是我们需要转发的 ，配合 修改hosts文件 ： 127.0.0.1  xx.cn
            # 我的配置是 http://127.0.0.1:80
        }
    }
```
### 2.2 生成证书

```
    openssl genrsa -out privkey.pem 1024/2038
    openssl req -new -x509 -key privkey.pem -out server.pem -days 365
```

> 我运行完命令后，文件生成在桌面

复制生成的文件到`/usr/local/etc/nginx/ssl/`(上文配置的位置)并!改!名!，重启 nginx

### 2.3 信任证书

访问代理地址，点击地址前的`不安全`提示。

查看证书，拖拽证书到桌面。

双击打开，选择添加到系统、信任程度选择始终信任。

打开系统钥匙串，在系统一栏双击刚添加的证书。查看信任选项中，是否勾选始终信任（坑爹的是我上一步添加进去还是系统默认）。

### 2.4 访问

访问地址，依然会有不安全提示 —— 不过点击高级选项可以选择继续前往。

> 为了网络安全，谷歌真是操碎了心。 // <== 这是场面话。

> 我 TM 真是谢谢你啊！ // <== 此句代表折腾一圈后的心声。


## 参考 && 感谢

- [Mac OS系统下，Nginx的配置和常用命令](https://www.jianshu.com/p/05900b778395) 作者：[流浪的三鲜馅](https://www.jianshu.com/u/db8965f63627)
- [用 Nginx 实现 https 转 http(方便本地调试)](https://blog.csdn.net/thewindkee/article/details/80681009) 作者：[thewindkee](https://blog.csdn.net/thewindkee)