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

## 参考 & 感谢

[vite](https://cn.vitejs.dev/)
[Vue3 按需引入 ElementPlus](https://segmentfault.com/a/1190000041116726)
[Building Web Components with Vue 3.2](https://www.thisdot.co/blog/building-web-components-with-vue-3-2)
[https://www.programminghunter.com/article/8286638691/](https://www.programminghunter.com/article/8286638691/)
[将Vue组件封装为Web Component](https://juejin.cn/post/7072715334519619598)