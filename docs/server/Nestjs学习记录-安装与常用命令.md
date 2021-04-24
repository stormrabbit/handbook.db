# Nestjs 的安装与常用命令

## 安装

```
npm i -g @nestjs/cli
```

## 常用命令

-  新建项目

```
nest new projectName
```

- 新建 userController

```
nest g controller users 
```

- 新建 users module

```
nest g module users
```

- 新建 service

```
nest g service users
```

- 新建中间件

```
nest g middleware logger middleware
```

- 新建拦截器

```
nest g interceptor transform interceptor
```

- 新建过滤器

```
nest g filter all-exception filter
```

## 可参考文章

0. [Nestjs 官方](https://nestjs.com/)

1. [Nest 中文](https://docs.nestjs.cn/)

2. [打开调试模式](https://juejin.cn/post/6844903800575098893)

3. [Nestjs 连接mysql数据库](https://blog.csdn.net/lxy869718069/article/details/103408695)

4. [NestJs学习之旅](https://juejin.cn/collection/6845244185432293389)

5. [nestjs中使用typeorm-model-generator将数据库生成数据模型](https://www.codeleading.com/article/18491747203/)

6. [Nest.js 从零到壹系列（四）：使用中间件、拦截器、过滤器打造日志系统](https://juejin.cn/post/6844904098689449998)

7. [用户认证：基于jwt和session的区别和优缺点](https://juejin.cn/post/6844903856942350349)

