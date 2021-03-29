## 安装

```
latest stable
$ npm install vue@next
```

#### 2.0 升 3.0

```
vue upgrade --next
```

#### 区别

###### 1. 使用 createApp 创建的实例代替 Vue

###### 2. 组件上 v-model 用法已更改

- 用于自定义组件时，v-model prop 和事件默认名称已更改
    - value -> modelValue
    - input -> update:modelValue
- 现在可以在同一个组件上使用多个 v-model 进行双向绑定
- 现在可以自定义 v-model 修饰符

###### 3. 已经不能直接使用 this.$refs 引用组件

- [refs](https://developer.51cto.com/art/202011/631064.htm)
