
### 1. 点击区域外触发事件，区域内不触发事件

代码：

```
        clickoutside: { // 初始化指令
            bind(el, binding) {
                // eslint-disable-next-line consistent-return
                function documentHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                    return false;
                }
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                    binding.value(e);
                }
                }
                // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
                el.__vueClickOutside__ = documentHandler;
                document.addEventListener('click', documentHandler);
            },
            unbind(el) { // 解除事件监听
                document.removeEventListener('click', el.__vueClickOutside__);
                delete el.__vueClickOutside__;
            }
        }
```

使用：`v-clickoutside`


### 2. Vue 配置别名

`vue.config.js`

```
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets',resolve('src/assets'))
      // ....
  }
};
```

### 3. 下拉加载更多

  load: { 
            bind(el, binding) {
                const load = binding.value;
                el.addEventListener('scroll', load);
            },
        }

### 4. 文本超出并显示省略号 css 版

```

overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box; //作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
-webkit-line-clamp:2; //显示的行
```


### 5. Vue 中使用 oc 语法功能

运行命令：

```
npm install --save-dev @babel/plugin-proposal-optional-chaining
```

修改 babel 

```
module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'import',
      { libraryName: 'vant', libraryDirectory: 'es', style: true },
      'vant'
    ],
    ["@babel/plugin-proposal-optional-chaining"]  //解析 可选链式语法
  ]

```


代码中使用

```
    result?.code?.xxxxx
```

[传送门](https://blog.csdn.net/xishuiinsz/article/details/103981987)

### 6. css 动态计算高度

```
calc(100% - 15px)

```

### 7. v-charts

[v-charts](https://v-charts.js.org/#/)使用报告

### 8. nextTrick

- 参数
  - {Function} [callback]
  - {Object} [context]

- 用法

  在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

- 使用

```
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

- 解决的问题：

  1. 渲染后才有数据、dom
  2. 渲染后才能得知确切的值


### 9. 在 watch 中使用 debounce

```
  npm install debounce
```

##### 在 watch 中使用的正确姿势

```
    value: {
      handler: debounce( function() {
        console.log(this.value);
      }, 100)
    },
```

##### 错误使用姿势

```

  value(val) {
    debounce(()=> {
      console.log(val);
    }, 100)()
  },
```



- 踩坑点：
  1. 必须使用 function() {} 的形式，使用箭头函数 this 会指错对象。
  2. debounce 实际上是高阶函数，执行后生成了具体的功能函数。必须将 handler 指向 debounce 的运行结果而不能包在函数体内，否则相当于多次生成节流函数并调用（所以节流无效）。

### 10. 操作本地缓存

vue 提供了 `localStorage` 直接操作本地缓存，具体可以看[这个](https://cn.vuejs.org/v2/cookbook/client-side-storage.html)。

### 11. Vue 引入静态资源的方法

```
<img :src="require('./assets/images/03.jpg')" alt=""> // √
<img :src="require('./assets/images/'+ this.imgName +'.jpg')" alt=""> // √
<img :src="img3" alt=""> // √
<script>
export default:{
    data(){
        return {
          imgName:'03.jpg',
          img3:require('./assets/images/03.jpg'),
        }
      },
}
</script>
// 编译后:
<img src="/img/03.ea62525c.jpg" alt="">
```
