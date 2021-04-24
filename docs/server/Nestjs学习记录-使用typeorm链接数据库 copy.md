# Nestjs学习-使用typeorm链接数据库

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

