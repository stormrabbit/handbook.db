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


- 方法二：完美解决小数问题

```
     formatNumber(num, precision = 2) {
      const numStr = num.toString()
      const index = numStr.indexOf('.')
      return Number( numStr.slice(0, index + precision) ) 
    }

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
- 加入延时处理宽高为 0 的操蛋情况
```
    countImageStatus(url) {

      this.$nextTick( ()=> {
        const im = new Image();
        im.src = url;
        setTimeout(() => {
          this.imgWidth =im.width;
          this.imgHeight = im.height;
          if(this.imgWidth === 0 || this.imgHeight === 0) {
            setTimeout(() => {
              this.countImageStatus()
            }, 500)
          } 
        }, 100)
       
        
      })

    }
```
## 压缩 json 

```
json2str(json) {
      if(typeof json === 'number') {
        return json
      }
      try {
        let _json = (typeof json === "string") ? JSON.parse(json) : json;
        if (Array.isArray(_json)) {
          return `[${_json.map((item) => {
            return this.json2str(item);
          })}]`;
        }
        if(typeof _json === 'object') {
          const val =  Object.keys(_json)
          .map((key) => `"${key}": ${this.json2str(_json[key])}`)
          .join(",");
          return `{${val}}`;
        }
        return `"${`${_json}`.replaceAll("\"", "'")}"`
      } catch (error) {
        return `"${`${json}`.replaceAll("\"", "'")}"`
      }
    },
```

## sock 一直报错的问题

> 今日份的奇葩，` http://127.0.0.1:8900/sockjs-node/info?t=xxxxx`一直报错，虽然不影响开发调试但是实在碍眼。

解决方法：[vue/cle3项目运行报错sockjs-node/info解决方案](https://cloud.tencent.com/developer/article/1489598)


## 傻逼的产物

> 脑残，写完以后才发现这 TMD 不就是 JSON.stringify 么？！

```
json2str(json) {
    if (typeof json === 'number') {
      return json;
    }
    try {
      const _json = typeof json === 'string' ? JSON.parse(json) : json;
      if (Array.isArray(_json)) {
        return `[${_json.map((item) => {
          return this.json2str(item);
        })}]`;
      }
      if (typeof _json === 'object') {
        const val = Object.keys(_json)
          .map((key) => `"${key}": ${this.json2str(_json[key])}`)
          .join(',');
        return `{${val}}`;
      }
      return `"${`${_json}`.replace(/\"/g, "'")}"`;
    } catch (error) {
      return `"${`${json}`.replace(/\"/g, "'")}"`;
    }
  }
}

```

## 防止浏览器拦截 window.open 

```
    viewProfile() {
      const url =`https://hello.world/u/${this.option.id}`;
      this.newTab = window.open('about:blank');
      this.newTab.location.href = url
    },
```


## 使用 compose 写的一个递归调用

> 参考的 redux，阅读源码万岁！

```
export class ProgrammaticParser {
  constructor() {
    this.programmatic = [];
  }

  setProgrammatic(programmatic) {
    this.programmatic = programmatic;
  }
  compose(buildCreativeFunctions = []) {
    if (
      !Array.isArray(buildCreativeFunctions) ||
      buildCreativeFunctions.length === 0
    ) {
      return args => args;
    }

    if (buildCreativeFunctions.length === 1) {
      return buildCreativeFunctions[0];
    }

    return buildCreativeFunctions.reduce(
      (nextBuildCreativesFunction, currentBuildCreativesFunction) => (
        arrays = []
      ) => nextBuildCreativesFunction(currentBuildCreativesFunction(arrays))
    );
  }

  applyMappings(programmatic, mappings = []) {
    const chains = mappings.map((mapping) =>
      this.buildMappingFunction(mapping)
    );
    return this.compose(chains)([programmatic]);
  }

  create() {
    const programmatic = this.programmatic;
    const { creative_style: style } = programmatic || {};
    if (!style) {
      return [];
    }
    const type = STYLE[style];
    const mappings = PROGRAMMATIC[type];

    return this.applyMappings(programmatic, mappings);
  }

  buildMappingFunction(mapping) {
    return (preCreatives) => {
      // target 为需要转化为普通创意时，普通创意的属性
      // source 为待转化程序创意中，程序化创意需要转换的属性
      const { target, source } = mapping || {};
      if (!target || !source) {
        return [];
      }
      const temp = [];
      preCreatives.forEach((preCreative) => {
        const prossibleValues = preCreative[source] || []; //
        prossibleValues.forEach((prossibleValue) => {
          const newValue = {
            ...preCreative,
            [target]: prossibleValue,
          };
          temp.push(newValue);
        });
      });
      return  temp.length ? temp : preCreatives;
    };
  }
}
```


## RAP2 中隐藏的一个很深的 bug

`src/components/editor/InterfaceEditor.tsx` 中 `handleDeleteMemoryProperty` 方法

```
  handleDeleteMemoryProperty = (property: any, cb: any) => {
    const properties = [...this.state.properties]
    const index = properties.findIndex((item) => item.id === property.id)
    if (index >= 0) {
      properties.splice(index, 1)

      // 清除后代属性
      const deletedParentIds = [property.id]
      for (let index = 0; index < properties.length; index++) {
        if (deletedParentIds.indexOf(properties[index].parentId) !== -1) {
          deletedParentIds.push(properties[index].id)
          properties.splice(index--, 1)
          index = 0 // 强制从头开始查找，避免漏掉后代属性
        }
      }

      this.setState({ properties }, () => {
        cb && cb()
      })
    }
  }
```

- 在给 `index` 赋值 `0` 后，循环结束、**`index++`**。再次开始循环时，index 的值为 `1`。即对于 `deletedParentIds.indexOf(properties[index].parentId) !== -1`，等价于 `deletedParentIds.indexOf(properties[1].parentId) !== -1`，永远判断数组第二位元素。

- `index--` 为**先运行、后计算**，对于 `index === 1` 的情况 ` properties.splice(index--, 1)` 等价于 ` properties.splice(1, 1)`，依然会只判断数组第二位元素而忽略第一位元素。

建议修改为：

```
        if (deletedParentIds.indexOf(properties[index].parentId) !== -1) {
          deletedParentIds.push(properties[index].id)
          properties.splice(index, 1)
          index = -1 // 强制从头开始查找，避免漏掉后代属性
        }
```


### 驼峰与下划线互转

```
// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}
```

## a 标签刷新

```
<a href="javascript:location.reload();">刷新</a>
```

## `element-ui` 组件库中 `radio-group` 切换改变值的问题

> 所有编程中的问题都可以通过引入一个中间层来解决，如果没有解决则再引入一个

问题描述：对于 `radio-group` 里的 `@change` 事件，一个坑爹的前提是：该事件的触发是在值改变以后。因此如果想做一些切换前防手贱的操作 —— 比如防止误触而弹出确认框，该事件无法进行拦截。

而 `radio-group` 亦不支持 `before-change` 这样的骚操作，所以如何处理此类场景需要换个思路。

具体场景：假设有组件 A，其中有 RadioGroup 内包含 2 个 RadioBotton B 和 C，以及由 BC 分辨控制显示的 D 和 E 界面。要求选中 B 时展示 D，选中 C 时展示 E。切换 B 和 C 选项时弹出提示，而只有确认时才进行切换操作。而 D 和 E 中分别会有一些半持久化的数据，要求弹出提示并取消时保留这些数据，而确认切换时清掉数据。

代码 & 处理思路：

使用 innerStatus 表示 `RadioGroup` 的状态，使用 status 标记 B 和 C 的状态。

因此组件写法为：

```
// A.vue

render() {
  return <div>
  <el-radio-group v-model="innerStatus">
    <el-radio-button key="B"></el-radio-button>
    <el-radio-button key="C"></el-radio-button>
  </el-radio-group>
  {
    status === 'B' ? <DDDDDD></DDDDDD>:<EEEEEE></EEEEEE>
  }
</div>
}

```

此时 `innerStatus` 与 `status` 的值是互相独立的，即便 `@change` 时 `innerStatus` 的值发生了改变，而 `status` 的值是木有问题的。因此只要在 `@change` 中进行判断，如果用户确认则 `status =innerStatus`，否则 `innerStatus = status`。

完美结束。

## 查看本机链接 github 地址

[这里](http://www.github.com.ipaddress.com/)

## element-plus dialog 相关问题

今日份的坑爹问题，原本可以滚动的页面“偶现”滚动不能。经过排查发现，当使用 element 的 lock-scroll 的时候，启动 dialog 的同时会自动给最顶层的 html 增加 class `el-popup-parent--hidden`，唯一的属性就是 `overflow: hidden`。因此如果原本有表单项的 dialog 的惯常做法 

```
<el-dialog 
  v-if="dialogVisible"
  v-model="dialogVisible"
>
```

会造成 dialog 消失后 `el-popup-parent--hidden` 依然挂在 html 标签的情况，造成原本可以滚动的页面无法滚动，影响体验。

解决方法是，重置表单的时候使用 form 的 reset 方法。

## false 与 undefined 不相等的问题

今日份的坑爹 bug，线上版本。

直接原因是因为 watch 中 `newVal !== oldVal` 时，newVal 的值为 `false` 而 oldVal 的值为 `undefined`。两者同为`非 true`却并不相同，造成了 watch 毫无必要的触发、对属性进行了二次修改。

处理方式：

所有 `true` `false` 比较类判断 `newVal === oldVal` 前面都应该加上双 `!`，写作 `!!newVal === !!oldVal`。

## 通过字体计算 div 的实际宽度

```
export function calculateTextWidth (text, font) {
  const canvas = calculateTextWidth.canvas || (calculateTextWidth.canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

```

## 今日份的坑爹问题

写了一个线上 bug，分片上传时计算出的 md5 值与后端计算出的 md5 值不匹配。

原因是在进行分片的时候，直接使用 file.size/10 当作每一片的长度，未进行取整计算。因此对于不能整除的 size 来说，会有很高的概率切丢一片。

解决办法是使用 `Math.ceil` 向上取整，保证切片长度。

## 读取 & 反解 xpath

```
//获取xpath
function readXPath(element) {
  console.log(element.id)
  
    if (element.id ) {//判断id属性，如果这个元素有id，则显 示//*[@id="xPath"]  形式内容
        return '//*[@id=\"' + element.id + '\"]';
    }
    //这里需要需要主要字符串转译问题，可参考js 动态生成html时字符串和变量转译（注意引号的作用）
    if (element == document.body) {//递归到body处，结束递归
        return '/html/' + element.tagName.toLowerCase();
    }
    var ix = 1,//在nodelist中的位置，且每次点击初始化
         siblings = element.parentNode.childNodes;//同级的子元素
 
    for (var i = 0, l = siblings.length; i < l; i++) {
        var sibling = siblings[i];
        //如果这个元素是siblings数组中的元素，则执行递归操作
        if (sibling == element) {
            return arguments.callee(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']';
            //如果不符合，判断是否是element元素，并且是否是相同元素，如果是相同的就开始累加
        } else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
            ix++;
        }
    }
};


function x(xpath) {
  var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
  return result.iterateNext()
}
```

## 如何用正则替换 http 为 https 

```
export const urlConversion = (path) => {
  const reg = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
  path = path.replace(reg, 'https://$2$3$4$5$6');
  return path;
};
```

## 今日份的 bug 解决

vue 2.x 需要配合 antd-vue 1.x，用 latest 会引用 2 或者 3，对应都是 vue3，会报错。

## 今日份的操蛋问题解决

执行 es-lint 的时候一直报错：

```
✖ vue-cli-service lint:
 ERROR  TypeError: Cannot read property 'range' of null
```

解决方式：[修改 eslint.js ](https://github.com/babel/babel-eslint/issues/681)

## 今日份的踩坑记录

对于和权限相关的菜单，调整层级以及增删菜单项时一定要先确认权限关系。有可能原本的有权限的二级菜单挪动到无权限的一级菜单后，二级菜单权限会一并丢失。

确认删除的权限是否与多数人关联。

确认删除权限的逻辑是硬删除还是软删除。

没事少动数据库，多备份。

实在要改时，提前通知后端备份数据库。

离删库到跑路只有一步之遥。

## 今日份的踩坑之旅

使用 el-upload 的时候，在 `before-upload` 返回时，要么返回 false，要么返回 Promise 并用 reject 返回错误， async/await 并返回 false 是无法阻止继续进行上传的。

## 8.8 踩坑

控制台一直在报错：

```
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "placement"
```

错误原因：[element 版本太高了。](https://blog.csdn.net/weixin_45884050/article/details/125583638)

## 9。19

今日份的傻逼问题：为 element-plus 设置 table 宽度后，在 windows 机器上不起作用。
解决方式：设置宽度的同时设置 min-width。