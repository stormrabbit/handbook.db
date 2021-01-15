



### 操作

1. 登录https://icomoon.io/

2. 点击 IconMoonApp

3. Import Icons 

4. 选择 Edit （笔状 icon）清掉颜色

5. 右下角 GenerateFont 

6. Preferences 调整参数

7. Download

8. 下载压缩包，解压后放入对应文件夹

9. 需要修改 style.scss 中对应 font 的路径，替换 $icomoon-font-path 的值为 ~@/assets/fonts

###### 参考文档

[如何将svg转换为css可用的图标字体](https://juejin.im/post/6844903712914145294) 
作者：[_Cynthial](https://juejin.im/user/3210229684125021)


### 补充

坑爹问题，无法转换 icon。错误提示：`Strokes get ignored when generating fonts or CSH files.
You may convert them to fills and reimport your SVG(s).` + `Strokes get ignored when generating fonts.
You can convert them to fills to prevent this.Would you like to deselect icons containing strokes?`

处理方式：

sketch 打开 svg 文件，图层 -> 轮廓化