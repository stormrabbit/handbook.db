# Vue3 组件开发学习笔记

## 6.30

### vite 创建 vue3 app

```
npm create vite@latest
// 选择内容
cd project
npm install -ddd --unsafe-perm
```

> Vite 需要 Node.js 版本 >= 14.18.0。
> 为什么用 vite？因为比 vue-cli 快。
> 更为轻量的组件可以考虑[petite-vue](https://github.com/vuejs/petite-vue)。

### 引入 Element-plus 并按需加载

#### 安装 Element-plus

```
npm install element-plus --save
```

##### 使用 Volar 特别注意

```
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

> [Volar 是什么？](https://zhuanlan.zhihu.com/p/375096539)

#### 在 Vite 中按需加载与自动引入

```
npm install -D unplugin-vue-components unplugin-auto-import
```

修改 `vite.config.ts`

```
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

> 插件加入后，所有的独立组件无需再使用 `import` 与 `components` 进行声明式引入，插件会在运行时自动创建创建 `auto-imports.d.ts` 与 `components.d.ts` 并自动引入所用组件。

### 编写并使用 Web Component

[什么是 Web Component 并有哪些优缺点？](https://icode.best/i/14322846737555)
 
#### [使用 Vue3 编写 Web Component](https://www.thisdot.co/blog/building-web-components-with-vue-3-2)

1. 创建一个 .ce.vue 文件
> .ce.vue 是特定扩展名，表示这是一个 custom component

```

<template>
  {{ currentDateTime }}
</template>

<script setup>
import { ref } from 'vue'

let currentDateTime = ref(new Date())

setInterval(() => {
  currentDateTime.value = new Date()
}, 1000)
</script>
```

2. 创建一个 index.ts 声明注册方法

```
import { defineCustomElement } from 'vue'
import CurrentTime from './index.ce.vue'

const CurrentTimeElement = defineCustomElement(CurrentTime)

export const register = (tagName = 'current-time') => customElements.define(tagName, CurrentTimeElement)

```

3. 注册并使用

经过个人测试，发现 `register` 这个动作最好放在 `App.vue` 中，然后 `current-time` 就可以放在其他组件里使用了。

> 在 vue style 中使用 scope 关键字会造成 current-tiem 调用失败，原因未知（简直莫名其妙）。

### 6.30 总结

- 使用 vite 构建的 Vue3 项目
- 引入 element-plus 并按需自动加载。
- 简单的 Web Componet 开发与注册使用。

## 7.1 

### [Vite 修改端口号](https://cn.vitejs.dev/config/server-options.html#server-host)

```

export default defineConfig({
  server: {
    port: 31000
  },
  // ...
});
```
> defineConfig 真好用，ts 类型强校验真好用。
> vite 真牛逼，说换就换了。

### Vite 打包组件

```
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    minify: "terser",
    lib: {
      entry: "src/currenttime/index.ts",
      formats: ["es"],
      name: "CurrentTime",
      fileName: 'current-time'
    },
    // rollupOptions: {
    //   external: ["vue"],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       vue: "Vue", // 全局声明 vue，但是 webcomponent 会造成打了一个 vue 进去结果找不到 vue 的情况
    //     },
    //   },
    // },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});

```
#### 打包与样式问题

本来想基于 element-plus 进行封装，但是发现虽然可以安装成功组件，但是样式无论如何都引用不进来。按需加载、自动加载等 ，都不可以。使用 import 也不行。

最后直接复制粘贴到组件 style 标签内，打包后生成 style.css 并一起引用。
#### 打包成功后引用

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite App</title>
  <link rel="stylesheet" type="text/css" href="./dist/style.css">
  <script type="module">
    import { register } from './dist/current-time.es.js'
    // import './dist/style.css'
    register('custom-element')
  </script>
</head>

<body>
  <div id="app"></div>
  <custom-element></custom-element>
</body>

</html>
```

### [打包并发布 npm](https://juejin.cn/post/7046187185615142949)

几个关键属性
```
  "main": "dist/vue3-slider.umd.js",
  "module": "dist/vue3-slider.es.js",
  "types": "vue3-slider.d.ts", // ts 需要类型
  "files": ["dist/*", "vue3-slider.d.ts"],

```

> [.d.ts 作用](https://juejin.cn/post/6987735091925483551)

### 7.1 总结

- 打包组件库
- 学习使用 tsx 语法和 ts
- 发布 npm

#### 几个遗留问题

- 如何方便的引用样式
- `formats` 的类型和区别，[umd 和 es 的区别](https://juejin.cn/post/7009971893281226759)
- 如何打包的时候把 d.ts 文件也打进去

## 7.3

### 打包出的 webcomponent 在 react 中可以显示，但是编译时报错 `Property 'web-component' does not exist on type 'JSX.IntrinsicElements'.`

[解决方法](https://codingdict.com/questions/80730)

```
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'current-time': CurrentTimeProps
    }
  }
}

interface CurrentTimeProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  // propsName?: propsType
}
```

### 7.3 总结

- 打包以及运行踩坑
- .d.ts 问题如何处理？

## 7.4 

- 打包与样式问题

### [vite 项目引入 scss loader](https://cn.vitejs.dev/guide/features.html#css)

```
# .scss and .sass
npm add -D sass

# .less
npm add -D less

# .styl and .stylus
npm add -D stylus
```

#### 因此对于 element-plus 组件样式有了新的解法

```
@import "./node_modules/element-plus/theme-chalk/el-menu.css";
@import "./node_modules/element-plus/theme-chalk/el-input.css";
@import "./node_modules/element-plus/theme-chalk/el-icon.css";
@import "./node_modules/element-plus/theme-chalk/el-tag.css";
```


## 7.5 

- 预备多组件导出的打包改动
- 移动 index.d.ts 位置与 declare function

### 导出多个组件预备

重新划分了代码结构，分为 `components` 与 `module`，`components` 是使用 `element-plus` 直接写组件，`module` 存放 `web components` 的包装。

增加了 `index.d.ts` 声明 register 方法，不然 react build 会报错

```
// index.ts
import { register } from "./module/currenttime/index";

export default {
  registerCurrentTime: register,
};
```

```
// index.d.ts
export declare const registerCurrentTime: (tagName?: string) => void;
```

## 7.6 

- 导出后组件引用问题

### 导出后组件引用问题

使用 `export default` 导出后，无法在使用 es6 的解构方式进行引入

```
import {register} from 'vite-components'
```
> 这样引用会报错，原因和解决方式在[这里](https://www.jianshu.com/p/ba6f582d5249)

我还是使用了 default，并且使用整体作为一个组件库引入。

```
import ViteComponents from 'vite-components'
ViteComponents.register()
```

## 7.7

- 编译运行时黄字错误（不影响使用）处理
- webcomponent props 传值

### 编译运行时黄字错误（不影响使用）处理

错误内容：`Failed to resolve component: wbcp-current-time If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. at <App>`

解决方式：

```
  // vite.config.ts
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => (tag.indexOf('wbcp-') !== -1)
        },
      },
    }),
```

> 参考文章中的写法是 `isCustomElement: (tag: string[]) => tag.includes('-')`，然而在项目中使用报错。其一是参数 tag 类型为 `string` 而不是 `string[]`；其二是 `tag.includes` 会报错 `string 上不存在 includes`。按照其他文章修改在 `tsconfig.json` 里增加 `"lib": ["esnext", "dom", "es6", "es2017"]` 依旧无效，所以换成了 `tag.indexOf("-") !== -1`。
> 使用 `tag.indexOf("-") !== -1` 容易误伤，改成特殊前缀 ` (tag.indexOf('wbcp-') !== -1)` 后可以正常显示。


### webcomponent props 传值

参考[官方文档](https://v3.cn.vuejs.org/guide/web-components.html#%E4%BC%A0%E9%80%92-dom-property)写法

```
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- 等效的简写 -->
<my-element .user="{ name: 'jack' }"></my-element>

App.vue
<!-- currenttime 写法-->
<wbcp-current-time .format="'HH:mm:ss'"></wbcp-current-time>
```


```
// src/module/currenttime/index.ce.vue
// setup 定义 props
const props = defineProps({
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss'
  }
})
```

> 补充阅读：[Vue3中 <script setup lang="ts"> 使用总结](https://juejin.cn/post/7031565983269519367)
> [vue3 中的 provide 和 inject 是什么？](https://juejin.cn/post/6973450516294533151)

## 7.8 

- [package json 中的 export 是什么](https://runebook.dev/zh-CN/docs/webpack/guides/package-exports)
- [组件库搭建总结](https://www.cnblogs.com/shapeY/p/14659660.html)
- [tsconfig 中的 include 是什么]
- 组件库包结构处理

### package json 中的 export 是什么？

起因是看到别人的组件库中有：

```
  "main": "./dist/mzl-ui.umd.js",
  "module": "./dist/mzl-ui.es.js",
  "exports": {
    ".": {
      "import": "./dist/mzl-ui.es.js",
      "require": "./dist/mzl-ui.umd.js"
    }
  },
```

### 组件库搭建总结

包结构布局：参考 [element-plus](https://github.com/element-plus/element-plus)

## 参考 & 感谢

[vite](https://cn.vitejs.dev/)
[Vue3 按需引入 ElementPlus](https://segmentfault.com/a/1190000041116726)
[Building Web Components with Vue 3.2](https://www.thisdot.co/blog/building-web-components-with-vue-3-2)
[https://www.programminghunter.com/article/8286638691/](https://www.programminghunter.com/article/8286638691/)
[将Vue组件封装为Web Component](https://juejin.cn/post/7072715334519619598)