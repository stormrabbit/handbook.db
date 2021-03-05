#### eslint

> [lint 格式化](https://blog.csdn.net/qq_42496307/article/details/103788015)

#### vue jsx 语法

> [vue jsx 语法](https://zhuanlan.zhihu.com/p/157164874)
> 写惯了 React 的人泪流满面

#### 组件设计规范

> [前端组件设计原则](https://juejin.im/post/6844903767108747278) 作者:[_没有好名字了_](https://juejin.im/user/3386151544041326)
> 刚好在折腾组件库，脑壳疼

### v3 源码解析

> [源码解析](https://vue3js.cn/start/)

#### 虚幻4

> [虚幻4](https://www.unrealengine.com/zh-CN/onlinelearning-courses)

#### 动态修改 apk 渠道号

> [需求](https://bytedance.feishu.cn/docs/doccnWHO1ZOWn3YrZVblvoEw4th)
> [思路](https://www.cnblogs.com/lanxingren/p/10656647.html)
> [签名机制](https://developer.android.com/about/versions/nougat/android-7.0#apk_signature_v2)
> [参考1](https://linxinfa.blog.csdn.net/article/details/103349960?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-2.control)
> [参考1](https://www.jianshu.com/p/7a91c20c4b0d)
> [参考1](https://ljsalm089.github.io/2018/04/02/Android-APK%E6%B8%A0%E9%81%93%E4%BF%A1%E6%81%AF%E5%86%99%E5%85%A5%E5%AE%9E%E7%8E%B0/)
> [参考2](https://github.com/Meituan-Dianping/walle/tree/master/walle-cli)

#### 直播研究

- [七牛官网](https://developer.qiniu.com/sdk#official-sdk)
- [七牛 github](https://github.com/pili-engineering)

#### python 学习

- [Github](https://github.com/python)
- [python 100 天](https://github.com/jackfrued/Python-100-Days)

#### umijs

- [官方文档](https://umijs.org/zh-CN/docs/getting-started)

#### 图床

- [Chevereto](https://zhuanlan.zhihu.com/p/107600699)

#### vuex

- 一个小思考，如何优雅的在 vuex 中监听 url 变化
- 另一个小思考，如何优雅的分包
- 如何优雅的在table 中使用 pop-dialog ？

#### Windows 安装前端环境遇到的问题

- 同一电脑配置多个 ssh
- npm install 报错，near xxxx，解决方式 npm clean
- 如何在 window 上使用 vm
- 如何在 windows 上安装 node、nvm+
- windows 与 mac 因分隔符等问题带来的编程差异 ？

#### 最近做的事情

- 写代码中遇到的定时器问题，雷达查询

#### router

- router [前置守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

> 不用傻逼兮兮的再包一个 push 了

#### el form 表单研究。

> 今天写代码踩了个坑，写 form 表单的时候，错把`<el-form :model="crtObj" ></el-form>`写成了`<el-form v-model="crtObj" ></el-form>`。于是验证各种不触发，排查了半天。

#### list 的滚动研究

> 写代码得时候处理 pc 端下拉刷新时遇到很多问题，关键是 PC 端用下拉得交互并不优雅。得想个办法，整点阳间得东西。

#### xlsx 得用法研究

> 写代码得时候用到了 xlsx，但是判断行数得时候遇到了点问题。目前是计算整个 cell，但是终归不是特别好得办法。

#### nvm 编译问题??

今天遇到一个很奇葩的问题，测试使用 nvm 的深喉一直无法用上 npm。解决了一晚上，前段后端大佬一起来看都没看明白。先记录下，如果能解决明天更新。

解决了。

解决的方式很奇怪。

首先，错误问题是软链，软链到 node 一直失败。解决的方式是把 npm 里的 #/usr/bin/env node 改成了 #/usr/bin/node，npm 和 node 都可以正常使用。

但是，问题是 npm install 其他安装包的时候一律全跪了。

所以问题是，软链后配置文件有问题。

尝试研究 /usr/bin/env 文件，原本以为是文件夹就手贱删除了。后来发现 /usr/bin/env 是包含所有 linux 环境变量的文件，于是紧急从其他服务器复制了一份过来。

再次研究 .bash_profile，发现其中引用了 .bashrc 文件。再次 vim 打开 .bashrc，不知道谁手贱加了一句`$path=:HOME:$path`。注释掉后，软链成功。可以正常使用 node、npm，包括 nvm 也可以正常使用了。

解决时间从周五晚上到周六下午 5 点，坑爹。

### axios 处理多接口

- 问题描述

对接的系统要接 2 个后端，域名不一致、返回结果格式不一致、要求传递参数也不一致。

- 预备处理方式

1. api 写不同的后置拦截器，处理不同的结果。
2. 使用 axios 的 [paramsSerializer](https://github.com/axios/axios)

看看哪天有时间处理了

### D2C

> 设计图真的可以转代码嘛？

[D2C](https://developer.aliyun.com/article/711769)
[P2C](https://mp.weixin.qq.com/s/_A0LATzlYsMtJQfPBGcHhA)
[imgcook](https://www.imgcook.com/?spm=a2c6h.12873639.0.0.7b2c154adruzDZ)

### 一个有趣的 css

[nes.css](https://nostalgic-css.github.io/NES.css/)

### 爬虫相关

如何写一个爬虫的项目，爬取掘金前端区每日更新文章

### 轮子工厂

[轮子工厂](http://www.wheelsfactory.cn/#/)

### css ben 命名

- [css 命名规范](https://zhuanlan.zhihu.com/p/72631379)

### vue 双向绑定原理 + 源码实现

> 这几天写了个组件，简直折寿三年。简而言之，我需要把一个数据分成 2 个部分，然后四处修改还有保证其数据完整性。简直要命。

[双向绑定原理](https://juejin.cn/post/6844903479044112391)

### css 不换行的问题

- 问题描述：

今天写代码的时候遇到了一个非常难受的问题，即在 `display:flex`，设置了 `flex:1` 的情况下，如果中心 `div` 内的文字过多，直接会把右边的 `button` 顶开 20 px 左右，只有强制设置 `div` 的宽度才可以限制让文字进行**隐藏**。

但问题是这是一个在组件内部的 style，不可能直接写死。于是尝试使用 js 在 vue 中动态获取，然而坑爹的来了：因为该组件是包含在 tabpanel 内部的一个子组件，如果渲染时默认激活的不是它，那么在 mounted 中获取到的宽度只能是 0。

前前后后试了很多方法，都没办法获得满意的数据。

想打人。

##### 3.5 无意中找到了问题所在 & 解决方法

原 css

```
.xxx__description {
  flex:1;
  ....
}

```

然后文字一多就会把正行顶出去一块。

本来是使用比较精确的方式，计算宽度。结果手一滑，写 css 的时候变成了这样：

```
.xxx__description {
  flex:1;
  width: 0;
  ....
}
```

问题解决。

分析原因，猜测是默认不写 `width` 的话，其值为 `width: auto`，宽度会自动计算字体的宽度。后来复盘，手动使用 `width: auto` 确实造成了相同的错误。

但是不明白为什么 `width: 0` 就限定了宽度？


### xmind 打开

[官网](https://www.xmind.cn/download/)
[破解](https://www.jianshu.com/p/3cde926a03bb)

### flutter 2.0

[flutter](https://flutter.dev/)