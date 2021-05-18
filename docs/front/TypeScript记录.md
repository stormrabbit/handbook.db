# TypeScript 踩坑 & 经验记录

## import 报错的问题

- js 写法

```
import path from 'path'
```

- ts 写法

```
import * as path from 'path';
```