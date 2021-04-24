# [使用中间件、拦截器和过滤器构建日志系统](https://juejin.cn/post/6844904098689449998)

## 中间件

### 概念

这里写出个人对中间件的理解：所谓的中间件，就是函数式编程中链式调用的一环。通过对纯函数的使用，对一个固定的输入值都会有一个固定的输出值，在保证功能扩展的同时可以最大程度的保证高度的独立性。

中间件函数的功能：

1. 对请求和相应对象进行更改。
2. 结束请求 - 响应周琦。
3. 使用 next() 调用中间件函数。

> 跑题，一个标准的 **redux** 中间件写法：` state => next => action => { ....  return next(action)}`（[似曾相识](http://angrykitty.link:40440/2020/07/03/redux-code-review/#more）。
> 跑题2，中间件的本质是组合函数，又称 [compose 函数](https://juejin.cn/post/6844903988647690254)。


### 使用中间件记录请求日志

1. 创建中间件

```
nest g middleware logger middleware // 在 middleware 文件夹下创建名为 logger.middleware.ts 的中间件
```
2. 修改 `src/middleware/logger.middleware.ts` 文件

```
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/utils/log4js';

// 这里是创建中间件时 nest 提供的标准写法
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const code = res.statusCode;
    next();
    // 组装日志信息
    const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`;
    // 根据状态码，进行日志类型区分
    if (code >= 500) {
      Logger.error(logFormat);
    } else if (code >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }
  }
}

// 这是函数式写法，二选一即可
export function logger(
  req: Request,
  // @Body() body,
  res: Response,
  next: () => any,
) {
  const code = res.statusCode;
  next();
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(
      req.body,
    )} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    // Logger.log(logFormat);
  }
}

```

3. 在 `main.ts` 引入中间件

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  await app.listen(3000);
}
bootstrap();

```

> 注：需要`app.use(express.json())` 和 `app.use(express.json())` 才能拿到 `req,body` 和 `req.params`。
> 注2：`body-parser` 已被废弃而且毛用没有，别问我咋知道。


## 拦截器

### 概念

中间件针对 request，拦截器针对 response。

### 使用拦截器记录 response 日志

1. 创建拦截器

```
  nest g interceptor transform interceptor // 在 interceptor 文件下创建名为 transform.interceptor.ts 的拦截器
```

2. 修改 transform.interceptor.ts 文件

```
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Logger } from '../utils/log4js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map((data) => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${JSON.stringify(data.data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return data;
      }),
    );
  }
}

```

> 此处用到了 pip 和 rxjs。

> 输出结果时 User 为 undefiend 是因为未将用户信息绑定在 req 上，如果使用 AuthGuards('jwt) 则会显示（解密后的） user 信息。

3. 在 main.ts 中引入

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();

```

### 使用拦截器规范化返回值

1. 创建 `data.interceptor.ts` 文件

```
nest g interceptor data interceptor

```

2. 修改 `data.interceptor.ts` 文件

```
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(map((data) => ({ code: 200, data })));
  }
}

```

3. 引入 main.ts

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { DataInterceptor } from './interceptor/data.interceptor';
import { AllExceptionFilter } from './filter/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  app.useGlobalInterceptors(new TransformInterceptor()); // 日志记录
  app.useGlobalInterceptors(new DataInterceptor()); // 返回值规范化
  await app.listen(3000);
}
bootstrap();

```

## 过滤器

### 概念

中间件负责处理 request，拦截器

```
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/utils/log4js';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    Logger.error(logFormat);
    response.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: `${status >= 500 ? '访问出错' : '链接异常'}`,
    });
  }
}

```

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { DataInterceptor } from './interceptor/data.interceptor';
import { AllExceptionFilter } from './filter/exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new DataInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}
bootstrap();

```