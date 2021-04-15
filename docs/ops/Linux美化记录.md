1. 安装 zsh

- centos:

```
yum -y install zsh
```

> `zsh --version`验证是否安装成功

2. 安装美化 `on-my-zsh`

git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh

3. 切换使用

```
    chsh -s $(which zsh)
```

如果失败用这个

```
    usermod -s /bin/zsh username
```