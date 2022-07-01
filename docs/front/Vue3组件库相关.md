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

## 参考 & 感谢

[vite](https://cn.vitejs.dev/)
[Vue3 按需引入 ElementPlus](https://segmentfault.com/a/1190000041116726)
[Building Web Components with Vue 3.2](https://www.thisdot.co/blog/building-web-components-with-vue-3-2)
[https://www.programminghunter.com/article/8286638691/](https://www.programminghunter.com/article/8286638691/)
[将Vue组件封装为Web Component](https://juejin.cn/post/7072715334519619598)