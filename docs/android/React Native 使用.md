1. 设置 npm 代理，加速下载

```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

2. Yarn、React Native的命令行工具（react-native-cli）#

> Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```
npm install -g yarn react-native-cli
```



```
// 安装完yarn后同理也要设置镜像源
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

3. 安装 create-react-native-app 工具,创建脚手架

- 安装工具
```
npm install -g create-react-native-app
```

- 创建脚手架

```
create-react-native-app AwesomeProject

```

>创建完成以后还需要 expo 才能运行,直接

```
cd AwesomeProject
npm start
```
>只能看到一张二维码

4. 安装 Expo
 
Android 端直接安装 Exop 基本 GG,需要先去 [Expo 官网](https://expo.io/) 下载 Windows 工具,安装运行注册-启动项目-右上角 Device.
修改 App.js 终于可以跑起来了(蛋疼).

`使用命令行的方法`

```
npm install exp --global
exp init your-project-name
cd your-project-name
exp start
```


