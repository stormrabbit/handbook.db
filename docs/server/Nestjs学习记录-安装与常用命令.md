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