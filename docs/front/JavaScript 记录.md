## 常用 JavaScript 速查

#### 判断值是否为 null

- 错误示范：
    - `val == null`，忽略了 val 为 undefined（要同时判断 null 和 undefined 时可使用本法）。
    - `!val`，忽略了数字 0、空字符串。

> typeof null 的是 'object'。

- 正确示范：
    - !val && typeof(val)!='undefined' && val!=0 && val != ''，排除所有可能性剩下的的唯一结果就是真相
    -  val === null，最简单的方法

#### 有关 axios 的 put 传值问题

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

- 问题描述：chrome 上样式正常，safari 13.05 版本样式错位。

- 出现原因：safari 中 document.getElementsByClassname 时获得元素的顺序与 chrome 不同。（坑爹啊）

- 解决方式：改为循环遍历元素，并将赋值(classname = )改为 remove。


#### 大文件上传模式

> [大文件上传](https://zhuanlan.zhihu.com/p/68271019) 作者：[前端热门技术](https://www.zhihu.com/column/noahlam)

> 需要实现一下

#### eslint

> [lint 格式化](https://blog.csdn.net/qq_42496307/article/details/103788015)