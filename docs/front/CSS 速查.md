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
