> 主要参考[GitBook 简明教程](http://www.chengweiyang.cn/gitbook/index.html)，作者：[chengwei](http://www.chengweiyang.cn/)

### 发布

```
gitbook build
```

### 预览（默认 4000，-p 可指新端口）
```
gitbook serve
```

### 统计提交记录和提交代码行数

```
git log --author=yourname --since="2017-08-01" --no-merges | grep -e 'commit [a-zA-Z0-9]*' | wc -l

git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' 
```