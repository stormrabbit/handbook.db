# Redis 操作

## 基础操作

- 查询所有 key

```
key *
```

- 查询 key `koa:sess:o5fisCPMe5KBqe5eeK9ANNSDOdCqJuIY`

```
get koa:sess:o5fisCPMe5KBqe5eeK9ANNSDOdCqJuIY
```

- 清除所有 key

```
//删除当前数据库中的所有Key
flushdb
//删除所有数据库中的key
flushall
```