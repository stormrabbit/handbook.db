
### 日常抽风系列：
- `nginx: [emerg] still could not bind()`
- nginx: [error] open() "/run/nginx.pid" failed (2: No such file or directory)

处理方式（简单粗暴）：
```
killall -9 nginx
systemctl restart nginx
```


### 报文过短

抽风症状：

> 后端接口可以访问，网页访问 413.

解决方式：

`client_max_body_size 20m;`