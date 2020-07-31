
### 日常抽风系列：
- `nginx: [emerg] still could not bind()`
- nginx: [error] open() "/run/nginx.pid" failed (2: No such file or directory)

处理方式（简单粗暴）：
```
killall -9 nginx
systemctl restart nginx
```