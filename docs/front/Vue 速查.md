
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