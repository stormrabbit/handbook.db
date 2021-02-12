# nestjs 学习记录

## 记录
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