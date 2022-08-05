# chrome 插件编写笔记

## 谷歌扩展的 abc

### 用来练手的小项目 - 改变浏览器背景颜色

#### 创建 `manifest.json`

```
{
    "name": "my first demo",
    "description": "这是我的第一个 demo",
    "version": "1.0",
    "manifest_version": 3
}
```
> manifest_version 是什么？

#### 使用浏览器加载该扩展

1. `更多工具` - `扩展程序`或者直接访问`chrome://extensions/`
2. 加载已解压的扩展程序 - 选择刚才的文件夹。

> 写错了 manifest.json 文件会报错找不到配置。

#### 增加功能 - 后台程序(background script)

1. 在 `manifest.json` 中注册

```
{
    ....
    "background": {
        "service_worker": "background.js"
    }
}
```

> background.js 在每次插件加载时运行。

2. 编写 `background.js`

```
let color = '#1784d8'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('已在 localstorage 中存储 color 信息')
  console.log('Default background color set to %cblue', `color: ${color}`);
});
```
> 此时重载会报错， 控制台 Failed to construct 'URL': Invalid URL

3. 因为用到了 localstorage，需要添加权限

```
{
    ...
     "permissions": ["storage"]
}
```
> 重载正常，点击 servcie worker 可以看到输出内容。

#### 增加功能 - 用户界面(user interface)

1. 用户界面有[很多种](https://developer.chrome.com/docs/extensions/mv3/user_interface/)，demo 使用的是 popup。
2. 创建 html 与 css。
```
// index.html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf8">
    <link rel="stylesheet" href="index.css">
    <title>demo</title>
</head>

<body>
    <div>这是一个demo</div>
    <button id="changeColor">我是按钮</button>
</body>

</html>
```

```
button {
  height: 30px;
  width: 100px;
  /* outline: none; */
  margin: 10px;
  /* border: none; */
  border-radius: 2px;
  font-size: 10px;
  cursor: pointer;
}

button.current {
  box-shadow: 0 0 0 2px white,
    0 0 0 4px black;
}
```
> chrome 教程中的代码未设置 `<meta charset="utf8">`，输中文会乱码。

3. 注册 `index.html`

```
{
    //....
    "action": {
        "default_popup": "index.html"
    }
}
```

#### 给插件添加 icon

1. 下载教程提供的 icon 并解压。
2. 在 `manifest.json` 中配置。

```
{
    //...
    "action": { 
        //...
        "default_icon": {
            "16": "/images/get_started16.png",
            "32": "/images/get_started32.png",
            "48": "/images/get_started48.png",
            "128": "/images/get_started128.png"
        }
    }
}
```

或者

```
{
    //...
    "icons": {
        "16": "/images/get_started16.png",
        "32": "/images/get_started32.png",
        "48": "/images/get_started48.png",
        "128": "/images/get_started128.png"
      }
}
```

> 第一种写法只能配置了装载后的 icon，在 `chrome://extensions/` 里是没有的；第二种可以兼顾。

#### 增加功能 - 添加 js 文件

1. 初始化 js 文件
```
// index.js
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});
```
```
//html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="utf8">
    <link rel="stylesheet" href="index.css">
    <title>demo</title>
</head>

<body>
    <div>这是一个demo</div>
    <button id="changeColor">我是按钮</button>
</body>

</html>

<script src="index.js"></script>
```

> script 标签似乎遵守严格的先后顺序，因此如果把 js 放在 button 之前会报空指针问题。

2. js 增加逻辑

- manifest.json 中申请权限。

```
{
    // ...
    "permissions": ["storage", "activeTab", "scripting"],

}
```
> 未申请权限直接调用 js，因为使用到了 `chrome.tabs.query` 和 ` chrome.scripting.executeScript` 会报 null 错误。
 
- 增加点击事件

```
// index.js
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    const currentColor = document.body.style.backgroundColor
    chrome.storage.sync.set({ color:currentColor });
    document.body.style.backgroundColor = color;
  });
}

```
> changeColor 似乎不需要进行初始化，chrome 会直接按照 id 初始化为变量。
> chrome://extensions 不支持 script 注入（can not inject content scripts），请用真实网页。

#### 增加选择菜单

## 参考

- [知乎：如何从零开始写一个 chrome 扩展](https://www.zhihu.com/question/20179805)
- [谷歌官方：getting start extensions](https://developer.chrome.com/docs/extensions/)