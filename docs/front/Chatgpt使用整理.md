# Chatgpt使用整理
> 因为总所周知的原因，chatgpt 登陆必须需要翻墙。
## chatgpt 介绍

- [openai 官网](https://openai.com/)
- [chatgpt](https://chat.openai.com/chat)

## 注册与登陆

登陆之前，需要运行此段代码，不然浏览器检测会报错：`OpenAI‘s services are not available in your country `。

```
window.localStorage.removeItem(Object.keys(window.localStorage).find(i=>i.startsWith('@@auth0spajs')))
```

登陆 `https://chat.openai.com/chat`，选择注册（可以使用 gmail 或者 hotmail）。

会根据地区选择输入电话号码接收验证码，所选择电话必须是非中国电话号码。

新开 tab 页登陆[sms-activate](https://sms-activate.org/)，注册一个外国手机号。在选择服务输入框中输入 `openai`，再选择国家（我选择的是美国）。花 1 美元（7 块钱）注册一个手机号，然后将注册的手机号填入上一个 tab 的输入框。在 `https://sms-activate.org/history` 页面等待一会，可以收到验证码。输入验证码，完成注册。


## 使用整理

总的来说，问题越具体、目的性越强，chatgpt 的回答越有参考价值。比如“推荐两个前端项目”的回答，就不如“推荐两个易于上手的 vue 脚手架项目”来的高效。因此 chatgpt 回答的精确程度和提问者的专业程度成正比。

以下是几个有代表性的 chatgpt 提问：

1. 对于 js 代码 `data.aaa && data.aaa[0].bbb === 1 ? 'aaa' : ((data.aaa && data.aaa[0].bbb) > 1 && data.ccc > 2) ? 'bbb' : '-'`，有没有可读性更高且更为安全稳定的写法。
2. 在页面中会同时调用 a、b、c 三个接口，三个接口都需要登陆才可以使用。应该如何处理，在调用 a 接口发现未登陆，跳转到登陆页面，同时不需要继续调用b 和 c 接口。
3. 使用 element 组件库实现这么一个组件：该组件是一个 input 输入框，该输入框可以根据 prefix 的选择切换查询条件 a 或者条件 b

> 从这一点来说，chatgpt 永远只是工具而已，不会有代替人的可能。

### chatgpt 回答准确率的问题

chatgpt 回答并不是百分之百准确，从代码层面来说，编写长的代码时也会有一些很无语的问题。虽然和逻辑，但是不合常理。因此在使用完 chatgpt 生成代码后，还是需要运行并检查一下。

