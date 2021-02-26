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


### 今日爬坑：css 居中

饿了么 button 自定义 icon 垂直居中对齐

```
<el-button 
            class="classA"
            plain
          > <i class="classB icon" />自定义列</el-button>
```

> 关键是自定义的 svg 文件后再跟个 icon

### 表单输入高亮

```
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
```

### 防止 xss 攻击的库

- [xss](https://www.npmjs.com/package/xss)
- [sanitize-html](https://www.npmjs.com/package/sanitize-html)

### element-ui 中重写 cell 样式

- [合集这里](http://www.jsphp.net/vue/show-25-539-1.html)

### 使用 css 修改 img 标签中 svg 图像颜色

```
  filter: grayscale(1);
```

### 使用 flex 让 div 居中设置

```
  <div style="display: flex;align-items: center;">
    <div style="flex:1"/>
    <span>骄傲的少年</span>
    <div style="flex:1"/>
  </div>
  

```

### css border 虚线

```
  border: {
    1px dashed #fff;
  }
```

> 平时都是写实线，实在忘了虚线的写法


### css hover 显示/隐藏


- html

```
          <div class="cv-with-data-name-p">
            <span> {{scope.row.name + 'test'}} </span>
            
             <icon class="el-icon-edit cv-with-data-name-edit" /> 
         
          </div>
```
- css

```
.cv-with-data-name-p {
  display: flex;
  align-items: center;
    &:hover {
      .cv-with-data-name-edit{
           visibility: visible;
         
      }
    } 
}
```

### element 重写 messagebox 样式

```
 this.$confirm('删除该条转化后，不可以用于计划投放，是否确认删除？', '确认删除', {
        customClass: 'cv-with-data-message-box', // <===这里
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFunc({ id: row.id, sdk_id: id })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
     
    },
```


### element 抹掉 table 的分割线
```
  <el-table
        :data="dataList"
        class="customer-no-border-table"
        :show-header="false"
        v-loading="dataListLoading"
        style="width: 100%;">
      </el-table>

  *去掉表格单元格边框*/
    .customer-no-border-table th{
      border:none;
    }
    .customer-no-border-table td,.customer-no-border-table th.is-leaf {
      border:none;
    }
    /*表格最外边框*/
    .customer-no-border-table .el-table--border, .el-table--group{
      border: none;
    }
    /*头部边框*/
    .customer-no-border-table thead tr th.is-leaf{
      border: 0px solid #EBEEF5;
      border-right: none;
    }
    .customer-no-border-table thead tr th:nth-last-of-type(2){
      border-right: 0px solid #EBEEF5;
    }
    /*表格最外层边框-底部边框*/
    .customer-no-border-table .el-table--border::after,.customer-no-border-table .el-table--group::after{
      width: 0;
    }
    .customer-no-border-table::before{
      width: 0;
    }
    .customer-no-border-table .el-table__fixed-right::before,.el-table__fixed::before{
      width: 0;
    }
    .customer-no-border-table .el-table__header tr th{
      background: #fff;
      color: #333333 ;
      padding: 3px ;
      fontWeight: 550 ;
      height: 36px ;
      border: 0px;
      font-size: 15px;
    }
    /*去掉鼠标悬停背景颜色*/
    .el-table tbody tr:hover>td {
      background-color:#ffffff!important
    }

  ```

  ### build 出的样式缺少 icon 的问题

  - 问题描述：

  测试反馈，build 出来的项目缺少左上角的 icon。后来检查 build 出的 dist 文件夹，index.html 里有关 icon 的 css 变成了这个样子：

  ```
        <!--[if IE]><link rel="icon" href="/img/favicon.7cfb7b6da2496ea66bdb0c4f3f6e6e28.ico" /><![endif]-->
  ```

  我翻了翻 public 里的 index.html 写法：

  ```
      <link rel="icon" href="<%=require('@/assets/images/favicon.ico')%>" />

  ```

  - 解决方式：

  ```
        <link rel="icon" href="<%=require('@/assets/images/favicon.ico')%>" />
    <link rel="shortcut icon"  href="<%=require('@/assets/images/favicon.ico')%>"  type="image/x-icon"  />



  ```


  ### li 内 元素垂直居中

  ```
  .cv-menu {
    li {
      line-height: 60px;
      height: 60px;
    }
  }

  ```

  ### 如何处理 span 排列时有空格的问题

  - 问题描述：

今日份的坑爹问题，一个查询下拉的组件中使用了 `<span> 1234 <strong>567</strong>890</span>` 的方式显示搜索的内容。但是奇葩的是，显示的样子是 `1234 567 890` 的样子，换句话说文字之间多了空格。

后来查询发现，`span` 并排排列的话，之间会有默认的空格，简直是哔了狗了。

解决的方式是在父组件中添加 `display: flex`，使得内部子组件横向排列。