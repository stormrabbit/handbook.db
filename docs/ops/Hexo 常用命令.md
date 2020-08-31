Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

### 更新部署

``` bash
$ hexo d -g
```

### 新建页面

``` bash
$ hexo new page "about"
```

### hexo 部署至阿里云保姆式教学

[猛击这里](https://hjxlog.com/posts/20191130a1.html)

### 磁盘空间满的发现与处理

查看 Jenkins 占用的磁盘空间：

```
    df -h 
```

磁盘满原因：job 没有及时清理，日志与 build 保存太多。

清理路径：项目 -> 配置 -> 丢弃旧的构建，保持构建的天数和构建最大个数按需填写。

磁盘空间释放暴力版：

- 进入 docker 容器
- 进入 Jenkins_home 下 job 目录
- 手动删除每个 Jenkins 项目文件的 builds 目录内容
- 重新跑一遍对应的 Jenkins 项目
