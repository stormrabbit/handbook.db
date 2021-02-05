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

#### windows 上 nvm 切换失误的问题

- 问题描述

今天在家写代码的时候，使用 nvm 切换环境始终不成功。看了网上很多方法，包括删除对应的 nodejs 文件都无法正常切换。后来无意中发现在 mac 中的 v10.21.0 不在 windows 可用的 release 中，windows 对应的是 v10.23.1 。奇葩的是，虽然不可用，但是用 nvm install 是可以正常安装的（捂脸）。因此无论怎么切换，windows 中都无法正常使用。

- 解决办法

使用 ` nvm list available` 查看 windows 可用的版本，如果没有的话可以访问 [https://nodejs.org/download/release]( https://nodejs.org/download/release) 查看更多的包。

> 坑爹的是即便是 v10.21.0 切换不成功，依然会提示正在使用。害的我以为依赖库有问题，删了装装了删。