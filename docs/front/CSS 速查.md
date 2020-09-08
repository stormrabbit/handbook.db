#### div 限制文字行数

```
.expd{
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:5;
   word-break:break-all; // 加这句以处理纯数字和特殊符号
}
```

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