# [crud 写法](https://docs.nestjs.com/recipes/crud-generator)

## 基础代码

```
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('page') page:number) {
    return this.usersService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
```

## 补充说明

- `post/put/patch` 等以 body 携带参数的请求以 `@Body` 装饰器 + `dto` 的方式进行接收。dto 为接收参数的实体类，属性对应各个参数名和类型。
- `@Query` 和 `@Params` 装饰器获取 `query` 和 `params` 如未指定接收属性（比如 @Param()），则会获取整个 query 和 params 对象，获取结果是一个类（而不是基础类型）。
- 根据 restful 的设计原则，get 对应查询、post 对应新增、put/patch 对应更新（区别是全部/部分更新属性）、delete 对应删除。
- 后端的删除一般不是物理删除，而是更新数据的 status（比如从 0 -> 1）+ 查询时忽略 status 为 1 的数据。