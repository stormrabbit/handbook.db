#### div 限制文字行数

```
.expd{
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:5;
    word-break:break-all;
    overflow-wrap: break-word;
    // 加这句以处理纯数字和特殊符号
    // 最终版本就是这样
}
```

- 事实证明，这样偶尔也会失效，尤其在只有符号的情况下。安全起见，需要设置最大宽度 max-width。

#### :before && :after

CSS中，::before 创建一个伪元素，其将成为匹配选中的元素的第一个子元素。常通过 content 属性来为一个元素添加修饰性的内容。此元素默认为行内元素。

使用：

```
/* CSS3 语法 */
element::before { 样式 }  

/* （单冒号）CSS2 过时语法 (仅用来支持 IE8) */
element:before  { 样式 }  

/* 在每一个p元素前插入内容 */
p::before { content: "Hello world!"; }
```

### !important 例外规则

当在一个样式声明中使用一个 !important 规则时，此声明将覆盖任何其他声明。虽然，从技术上讲，!important 与优先级无关，但它与最终的结果直接相关。使用 !important 是一个坏习惯，应该尽量避免，因为这破坏了样式表中的固有的级联规则 使得调试找bug变得更加困难了。当两条相互冲突的带有 !important 规则的声明被应用到相同的元素上时，拥有更大优先级的声明将会被采用。

### CSS样式覆盖规则

- 最近祖先优先
- 直接指定的样式优先
- 样式权值高者优先
- 样式权值相同时，后者优先