# nestjs 学习记录

## 记录

### [nestjs 打开调试模式](https://juejin.cn/post/6844903800575098893)

```
  npm run start:debug
```


### 如何用 nestjs 链接数据库（以 mysql 为例）

[npm](https://blog.csdn.net/lxy869718069/article/details/103408695)
```
    npm install --save @nestjs/typeorm typeorm mysql
```

### 如何将返回值包装成相同的结构

将使用[拦截器](https://juejin.cn/post/6844903939196846087)的概念

### 如果查询出错，如何处理统一的错误

？？待完善

### 使用插件快速生成 entinies 

[typeorm-model-generator](https://www.codeleading.com/article/18491747203/)


## 总结

### nestjs 安装、使用

待完善

### nestjs 常用创建 controller/service/module

待完善


### nestjs 连接数据库123（以 mysql 为例）

1. 安装 typeorm 等相关依赖包

```
   npm install --save @nestjs/typeorm typeorm mysql 
```

2. 编写一个实体类，类的属性和 mysql 数据库中表的属性一一对应

> 以 user 表为例

`user.entity.ts`

```
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'tinyint', name: 'status' })
  status: number;
}
```
可以使用 [typeorm-model-generator](https://www.codeleading.com/article/18491747203/) 快速生成数据库内表对应的 entity，但是生成出来的 entity 命名不规范。

生成方法：

在 package.json 中加入：

```
"db": "rm -rf src/entities & npx typeorm-model-generator -h 127.0.0.1 -d rebecca -p 3306 -u billy -x 123456 -e mysql -o src/entities --noConfig true --ce pascal --cp camel -a"
```

执行：`npm run db`

3. 在 service 中引入 `entity` 和 `Repository`（来自`typeorm`）,使用依赖注入在构造器中创建对应的实例。

```
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepostory: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepostory.query(' select * from users');
  }
}
```

4. 在 module 的 imports 中引入。

```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

```

5. 在总的 module 中创建数据库链接。

```
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'billy',
      password: '123456',
      database: 'rebecca',
      entities: [__dirname + '/**/*{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}

```

### [nestjs crud 写法](https://docs.nestjs.com/recipes/crud-generator)


### [nestjs 与 jwt](https://juejin.cn/post/6844903856942350349)

#### 什么是 jwt

jwt = Json Web Token。

#### jwt 流程

1. 用户输入登陆信息。
2. 服务器验证登陆信息，验证无误下发 token。
3. 客户拿到 token 后做缓存（存在 cooke 或者 localstorage）中。
4. 请求服务器时携带 token。
5. 服务器解码 token，验证成功则返回请求数据。

#### jwt 组成

jwt 是一个字符串，有三部分组成：`头部（header）`、`载荷（payload）`、`签名（signature）`。

> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTkwNTcxODMsImV4cCI6MTYxOTA4NTk4M30.RI0eBVx-2u1S0J2mSu03v7s8J0bBHEV4w1ul1PLGJ5s <== 一个 token

header 主要是记录基本信息，比如签名算法、类型；

payload 存放的是非敏感信息，比如用户名、token 签发/过期时间；
> jwt 标准 payload 属性：`iss`、`iat`、`exp`、`aud`、`sub`

signature 是服务端通过密钥对 header 和 payload 进行加密后得到的字符串，如果不知道服务端密钥就无法进行加密得到正确的签名。

#### jwt 的优缺点

##### 优点

1. 方便。服务端并不需要存储或者记录下发的 token，只需要每次验证 token 是否合法。
2. 符合 restful api 标准。RESTful API的原则之一是无状态，发出请求时，总会返回带有参数的响应，不会产生附加影响。用户的认证状态引入这种附加影响，这破坏了这一原则。
3. 方便，again。jwt的载荷中可以存储一些常用信息，用于交换信息，有效地使用 JWT，可以降低服务器查询数据库的次数。


##### 缺点

1. 安全性不足。jwt的payload是使用base64编码的，并没有加密，因此jwt中不能存储敏感数据。
2. 性能有损耗。jwt 本身比较长，每次请求需要带在 header 会造成 header 很大（甚至会比 body 要大）。
3. 无法废弃。在 token 过期之前，使用 token 都可以成功请求数据。即同一个人连续登陆 2 次，无论使用第一次获得的 token 还是第二次获得的 token 都能访问服务器。
4. 续签麻烦。因为 jwt 是无状态的，因此过期后没好办法在服务端无缝续签。要么让客户再次登陆（前端有感知），要么服务端自己记录 token 过期时间（变相成为了 session）。

> jwt 不适用场景：单点登录和会话管理。两者同时点中了 jwt 最大的弱点：无法在服务端记录状态。


