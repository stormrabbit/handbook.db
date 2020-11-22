# Windows 设置 SSH

## 1. 设置 config

```
    git config --global user.name "Git账号" 
    git config --global user.email "Git邮箱"
```

## 2. 生成新的 SSH 密钥

```
    ssh-keygen -t rsa -C "your_email@example.com"
```

## 3. 添加 SSH 到 SSH-agent（存疑）

- `eval $(ssh-agent -s)`
- `ssh-add rsa路径`

## 4. 添加 SSH 到 Github（或者其他需要的）账户

## 5. 测试链接

```
ssh -T git@github.com
```

