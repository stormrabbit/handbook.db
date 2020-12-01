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