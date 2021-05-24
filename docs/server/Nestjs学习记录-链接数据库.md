# Nestjs学习-链接数据库

## 使用 typeorm 链接 mysql 数据库

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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/Users';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepostory: Repository<Users>,
  ) {}

  async retrieveAllUsers(): Promise<Users[]> {
    return await this.userRepostory.find({
      where: {
        status: 0,
      },
    });
  }
}

```

4. 在 module 的 imports 中引入。

```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
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

6. 在 controller 中增加路由并引入 service

```
import {
  Controller,
  Get,
} from '@nestjs/common';
import { Users } from 'src/entities/Users';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('list')
  retrieveList(): Promise<Users[]> {
    return this.usersService.retrieveList();
  }
}

```



## 使用 mongoose 连接 mongodb

> [官方文档](https://docs.nestjs.com/techniques/mongodb)

1. 安装依赖

```
npm install --save @nestjs/mongoose mongoose
```

2. 引入 db module

```
import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dnd_users')
  ],
})
export class AppModule { }


```

3. 新建 schema 文件

```
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
    {
        name: String,
        nickname: String,
    }
);
```


> schema 和 interface 不同， schema 接收的是一个对象，interface 是对类的定义

4. module 中引入 schema 

```
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'users', schema: userSchema}])
    ],
    controllers: [UsersController],
    providers: [usersService],
}) 
export class UsersModule { }



```

> 引入的时候 `forFeature` 中的 `name` 指定 collection，需要和 service 中的 inject 字段相同。

> 使用 mongoose 查询时，注意 id 类型是 Types.ObjectId。