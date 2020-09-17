### npm 查看源和换源

```
npm config get registry  // 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像
```

#### 镜像源

```
npm --- https://registry.npmjs.org/

cnpm --- https://r.cnpmjs.org/

taobao --- https://registry.npm.taobao.org/

nj --- https://registry.nodejitsu.com/

rednpm --- https://registry.mirror.cqupt.edu.cn/

npmMirror --- https://skimdb.npmjs.com/registry/

deunpm --- http://registry.enpmjs.org/
```

### gifsicle 无法正常安装的问题

报错：npm verb stack Error: gifsicle@4.0.1 postinstall: `node lib/install.js`

解决方式：添加 vpn

#### 检测过程

1. Jenkins build，长时间无法完成。
2. 查看输入日志，提示 npm verb stack Error: gifsicle@4.0.1 postinstall: `node lib/install.js` 。
3. 进入 `node_modules/gifsicle/lib`，查看 `index.js` 与 `install.js`。发现 gifsicle 安装后会运行 `https://raw.githubusercontent.com/imagemin/gifsicle-bin/v${pkg.version}/vendor/` 执行进一步安装。
4. 在服务器上执行 `wget https://raw.githubusercontent.com/imagemin/gifsicle-bin/v4.0.1/vendor/source/gifsicle.tar.gz`，响应超时。
5. 配置 `raw.githubusercontent.com` 代理，可正常访问。

> 注：代理要配置在 docker 虚拟机内，配置到外面没用。
