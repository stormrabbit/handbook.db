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