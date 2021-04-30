# 常用 JavaScript 速查

## 判断值是否为 null

- 错误示范：
  - `val == null`，忽略了 val 为 undefined（要同时判断 null 和 undefined 时可使用本法）。
  - `!val`，忽略了数字 0、空字符串。

> typeof null 的是 'object'。

- 正确示范：
  - !val && typeof(val)!='undefined' && val!=0 && val != ''，排除所有可能性剩下的的唯一结果就是真相
    -   val === null，最简单的方法

### 有关 axios 的 put 传值问题

```
    axios.put('xxxxUrl', {
        //.....
        // 这里是 body
    }, {
        params: {
            // ...
            // 这里是 query
        }
    })
```

#### safari 和 chrome 兼容性问题

-   问题描述：chrome 上样式正常，safari 13.05 版本样式错位。

-   出现原因：safari 中 document.getElementsByClassname 时获得元素的顺序与 chrome 不同。（坑爹啊）

-   解决方式：改为循环遍历元素，并将赋值(classname = )改为 remove。


#### 分片上传时后端解析文件失败的问题

> 今天碰见和很奇葩的问题，又起了新的上传后发现，上传的内容后端无法解析，检查以后发现上传的是 arrayBuffer 类，猜测应该是之前使用 arrayBuffer 时被后端兼容了。转换成 blob 后，问题解决。

- [上传文件类型转换](https://www.haorooms.com/post/js_file_base64_blob)


#### 分片上传时线程启动太多无法响应 websocket 造成链接丢失的问题

- 问题描述：

> 使用切片上传时，通过 websocket 长连接获得上传以及同步进度。而切片上传因为要启动多个线程进行并发上传，很容易造成上内存占满无法和长连接进行交互，造成长连接丢失。

- 处理方式：

1. 缩短并发连接数量（Chrome 理论上线 255，适当缩短）
2. 使用 setTimeout 延迟连接建立

- 拓展阅读：[所谓的伪多线程](https://segmentfault.com/a/1190000008723632)


#### 跨域问题

- 问题描述：

> 使用 post 上传时，部分接口始终提示跨域（即便是配置了 axios 的跨域参数）不通过，错误如下：`Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.has been blocked by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.`

- 错误原因：

1. post 请求如果 content-type 是 application/json 的情况下，是复杂的网络请求，需要处理 options 请求。
2. 复杂的网路请求，需要手动配置 header，不能使用 “*”

- 参考文献

1. [cors跨域中关于access-control-allow-headers导致的错误](https://www.jianshu.com/p/cecb73b26a11)
2. [http跨域时的options请求](https://www.jianshu.com/p/5cf82f092201)


### no-prototype-builtins 问题

- 问题描述

> 主页莫名其妙的崩了，看了眼 Jenkins build 报错：`error  Do not access Object.prototype method 'hasOwnProperty' from target object  no-prototype-builtins`

- 问题排查

查询发现报错的原因是 eslint 为了安全起见禁止目标对象直接调用 Object 原型方法，以避免原型链改变后 Object 对象也被改变。

- 解决方法

调用 Object 的方法并改变 this 的指向：`Object.prototype.hasOwnProperty.call(headers, header)`

### jade 模板转义字符的处理

- 一个很坑爹的老项目，传递

- 解决方法

[jade 模板转义符处理方式123](https://blog.csdn.net/rcjjian/article/details/72814653)

### elementPlus 导航 menu，打开一个收起其余展开的

```
     <el-menu
      :router="false"
      :default-active="currentMenu"
      active-text-color="00ff00"
      ref="menu"
        @open="handleOpen"
      @select="handleSelect"
      :uniqueOpened="true"  // <=== 就是这里
      >
```

> 差点自己写了一个展开收起，凸(艹皿艹 )...

### 使用 push 进入页面后，滚动条自动到顶 

```
  router.afterEach((to,from,next) => { window.scrollTo(0,0); });
```

### element 表单项 label 修改

```
     <el-form-item prop="license" :label-width="formLabelWidth">
          <div slot="label"> // <== 使用 slot 添加，自定义 label
            <el-popover placement="top-start"  trigger="hover" content="该应用若需要在新浪新闻推广，此项为必填项！">           
              <icon slot="reference" class="sf-tools-tools-info" />
            </el-popover>

            应用权限
          </div>
          <ad-permission
            v-model="editAppForm.permission"
            placeholder="请选择应用权限"
          ></ad-permission>
        </el-form-item>
```

> 艹，又差点自己轮了一个

### vue dom 监听鼠标按下与弹起

```
     <p :class="!subItem.id ? 'cv-menu-button' : ''" @mousedown="testChange(1)" @mouseup="testChange(0)">
```


### excel 兼容性问题

使用 xlsx 处理 excel，windows 和 mac 生成的 .xls 结构不同。mac 导出的只能在 mac 用，windows 导出的两边都不能用。为了兼容双系统，excel 使用 .xlsx 比较好。


### Object.assign 问题

- 问题描述：

今天测试报了个 bug，仔细研究以后发现造成 bug 的原因是表单项数据未重置。排查代码的时候发现，使用 v-model 绑定的属性 `creative_license` 明明已经重置为 `''`（空字符串），但是表单项中依旧保留有上一次表单提交数据。

- 解法1:
  
在表单项上增加 v-if（表单本身是个 dialog），使用 dialog 本身的 visible 属性即时加载/卸载表单项。

- 解法2:

深入了解以后发现，未能重置的原因[在这里](https://segmentfault.com/a/1190000039136809)。简单的说就是，下面这种写法无法触发 `this.editAppForm.creative_license` 的 set 方法，因而不会触发双向绑定。

```
   this.editAppForm = Object.assign(this.editAppForm, data.appInfo, {
          app_permission,
          creative_license,
          privacy_policy,
        })
```

以下这种写法可以有效避免：

```
          this.editAppForm = Object.assign({},this.editAppForm, data.appInfo, {
          app_permission,
          creative_license,
          privacy_policy,
        });
```

## Vue 使用 clipboard 进行复制粘贴

- 安装

```
  npm install clipboard --save
```

- 在组件中引入

```
  import ClipboardJS from 'clipboard';
```

- 具体实现代码
`html`
```
  <div>
    <span id="copycode">{{wmid}}</span>
    <el-button class="sf-wd_cp_btn" @click="doCopy" type="text" data-clipboard-target="#copycode">复制</el-button>
  </div>
```

> 2 个关键点：1. 被复制的 html 需要有 id；2. 复制功能的按钮组件要有属性 `data-clipboard-target` 且值为 1 的 id。

`js` 代码

```
      const clipboard = new ClipboardJS('.sf-wd_cp_btn')
      clipboard.on('success', (e) => {
        Message.closeAll()
        Message({
          message: `已复制:${this.wmid}`,
          type: 'success',
          offset: 100
        })
        clipboard.destroy()
      })
    },
```

> 弹出提示后要主动调用`clipboard.destroy()`。否则的话因为组件未销毁、clipboard 多次创建，会出现多次提示（即执行多次复制操作）。
> 多次点击前需要使用 `Message.closeAll()` 清除之前的操作。


## vue 在循环中使用 slot 的方法

> 废话不多说，直接从项目里挖代码gi

- 父组件（slot 提供者）

```
  <sc-account-container :activeName="sources[0].name" v-model="sources" v-slot:default="{source}">  <==关键第一步
    <component v-model="source.data" :is="source.component"/>
  </sc-account-container>
```

- 子组件（slot 接收者）

```
    <el-tabs
      v-model="activeName2"
    >
      <el-tab-pane 
        v-for="(source, idx) in value"
        :key="idx"
        :name="source.name"
        :label="source.label"
      >
        <slot
          :source="source"   <== 关键第二步
        />
      </el-tab-pane>
    </el-tabs>
```

- 引申研究 vue2 与 vue3 中的 slot 比较。

## 比较对象的方法

> 算是爬坑记录。

今天在处理代码的时候，因为在 watch 中有 emit 双向绑定，所以多次出现数据重载的情况，于是决定比对象相同则不触发 emit。

一开始是使用每个 key 比较，但是消耗有点大。于是使用了一个偷鸡的方法，JSON.stringify(obj) === JSON.stringify(oldObj)，于是暂时解决了。

结果在改变值的时候，偶尔还是会出现多次重载、甚至卡死的情况。多次定位后，发现即便是相同的对象 JSON.stringify 后也会因为 key 的位置有变动，结果得出了错误的结论。

坑爹。


## 获取窗口宽度

```
  mounted() {
    testPut()
    this.screenHeight = document.documentElement.clientHeight 
    const _this = this
    window.onresize = function () { // 定义窗口大小变更通知事件
      // _this.screenWidth = document.documentElement.clientWidth // 窗口宽度
      _this.screenHeight = document.documentElement.clientHeight // 窗口高度
    }
  }
```

## js 格式化数字

- 方法一：

```
  return (num/10000).toFixed(2)
```

> 方法一的问题是，如果 number/10000 的值是 2.10，那么格式化后的值是 2.10。


- 方法二：

```
  return ()
```
## 一个快速复制对象的方法

```
const iValue = JSON.parse(JSON.stringify(this.value))
```

> PS：此方法可以复制对象的值，但是无法复制对象的方法（function）。

## 直接在 html 中使用 vue

> 今天做个旧需求，需要改造一个老项目，做一个落地页。考虑为一个页面就安装 vue 使用 npm 有点不值当，因此决定直接在 html 中使用 vue。

1. 在 html 中引用 vue 的 pro 版本： `<script src="https://cdn.jsdelivr.net/npm/vue"></script>`

> 我引用的是公司提供的特定版本，保证版本稳定性。

2. 在 html 中增加 `div`， 并给予 id。

```
  <div id="app"></div>
```

3. 新建 script 标签，编写 vue

```
   new Vue({
        template: `<div>
                    // 正常编写 html
                  </div>`,
        data:() => ({
            values: 123
        }),
        mounted() {

        },
        // ... 正常的 vue
    }).$mount('#app')

```

> 后记：npm 用多了以后，突然发现已经忘记 vue 的本质是一个 html 框架，只是对原有 html 进行改造和替换。

> 后记2：vue 2.0 和 vue 3.0 使用的是不同的构造方法，`new Vue` 要替换成 `Vue.createApp` 而 `$mount` 要替换成 `mount`。

## 节流

```
  function throttle(fn, time) {
      let _arguments = arguments
      let canRun = true 
      return function () {
          if (!canRun) return
          canRun = false
          setTimeout(() => {
              fn.call(this, _arguments)
              canRun = true
          }, time);
      }
  }
```

## vue 的事件处理

> 今天处理了一个业务上的 bug，发现原本点击 checkbox 能展开下一级菜单的交互不见了。经过排查，发现是有人在上一级 div 中增加了 `click.stop.prevent`。

[Vue 中的事件处理](https://cn.vuejs.org/v2/guide/events.html)

## 防抖组件库

- [debounce](https://www.npmjs.com/package/debounce)

## 格式化时间输出

```
    formateDate (date) {
      const time = (date == null ? new Date() : new Date(date))
      const month = (time.getMonth() + 1).toString().padStart(2, '0')
      const strDate = time.getDate().toString().padStart(2, '0')
      return `${time.getFullYear()}-${month}-${strDate}`
    },
```

## element-plus message 保持只有一个 message

```
ElMessage.closeAll()
```

## 一个随手写的数据缓存

```
  async getInfo () {
    const info = localStorage.getItem('abcd') // <== 先从本地拿
    if (info) {
      return JSON.parse(info)
    }
    try {
      return (await this.fetchInfo()) || JSON.parse(INFO)  // <== 本地没有从服务端取
    } catch (_) {
      return JSON.parse(INFO) // 服务端没有用写死的
    }
  }
```

## 升级完 mac git 没了

```
xcode-select --install
```

## 判断图片是横图还是竖图

```
    isHZ() {
      if(this.url){
        const img = new Image();
        img.src = this.url;
        return img.width > img.height;
      }
      return false;
    },
```

## 压缩 json 

```
json2line(json) {
      if(typeof json === 'number') {
        return json
      }
      try {
        let _json = (typeof json === "string") ? JSON.parse(json) : json;
        if (Array.isArray(_json)) {
          return `[${_json.map((item) => {
            return this.json2line(item);
          })}]`;
        }
        if(typeof _json === 'object') {
          const val =  Object.keys(_json)
          .map((key) => `"${key}": ${this.json2line(_json[key])}`)
          .join(",");
          return `{${val}}`;
        }
        return `"${`${_json}`.replaceAll("\"", "'")}"`
      } catch (error) {
        return `"${`${json}`.replaceAll("\"", "'")}"`
      }
    },
```