
> 本文使用 docker-compose 部署 jenkins，和使用 Tomcat 部署 jenkins 无论操作、维护以及打包步骤都有不同

> 总的来说，使用 Tomcat 部署 jenkins 是开始麻烦，维护简单；docker 是安装简单，但是使用起来需要处理容器和服务器之间的数据交互，有维护成本

### 使用 docker 安装 jenkins 容器

- 编写 `docker-compose.yml`

```
version: '3'    # 指定 docker-compose.yml 文件的写法格式
services:       # 多个容器集合
  docker_jenkins: 
    user: root  # 为了避免一些权限问题 在这我使用了root
    restart: always # 重启方式
    image: jenkins/jenkins:lts  # 指定服务所使用的镜像 在这里我选择了 LTS (长期支持)
    container_name: jenkins # 容器名称
    ports:      # 对外暴露的端口定义
      - '8080:8080'
      - '50000:50000'
    volumes:    # 卷挂载路径
      - /home/jenkins/jenkins_home/:/var/jenkins_home  # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker     # 这是为了我们可以在容器内使用docker命令
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose # 同样的这是为了使用docker-compose命令

```

> 注意：映射端口和文件目录时，本机放在前面，docker 在后面，请勿写反（血泪教训）。

> 注意二：请设置加速源，不然拉取镜像速度无限慢（除非翻墙）。

speed-up.sh
```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://m60ggkj3.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

- 使用 docker-compose 安装镜像并启动容器

```
    docker-compose up -d
```

### 初始化 jenkins 

安装完毕后访问设置好的端口，等待后输入密码。

密码在 jenkins_home/secrets/initialAdminPassword 文件中，有两种方法查看:

###### 方法一：

```
    cd 映射后的 jenkins_home/secrets
    cat initialAdminPassword
```

###### 方法二：


```
// 以 docker 用户进入 docker 容器
docker exec -u root -t -i 053b56d56e84 /bin/bash
cd /var/jenkins_home/secrets
cat initialAdminPassword
```
> 初始化 jenkins 后 initialAdminPassword 会自行删除

使用初始密码初始化后，可以设置用户名 & 密码，以正常用户登录。选择安装推荐插件，等待安装。

前端项目还需要 nodejs 插件，安装完毕后在全局工具配置 Global Tool Configuration 中设置 nodejs 版本，在 build 项目 - 配置 - 构建环境中勾选 `Provide Node & npm bin/ folder to PATH`

> 坑点一：尽量以 root 用户启动，或者映射的 jenkins_home 目录要有足够的权限，否则会出现 permission denied 错误

> 坑点二：需要使用 nodejs 配置使用 node，否则会出现 npm command not found 的错误。如果不使用 nodejs 插件，则进入 docker 容器内使用 `apk add nodejs` 或者 `apt-get update && apt-get upgrade -y && apt-get install -y nodejs npm `命令自行安装 node 和 npm。




添加用户组
sudo usermod -aG docker jenkins

查看  docker 用户组


sudo chmod 666 /var/run/docker.sock


### 使用 webhook 根据推送自动更新

1. 设置 github api

路径：系统配置 - github 服务器。

API URL：https://api.github.com <== 此为固定
凭据： <== 此为可选

目前共有三种：

- ssh
- 用户名密码
- secret text

2. 设置项目

路径：jenkins 项目 -> 配置 -> 构建触发器 -> GitHub hook trigger for GITScm polling

3. github 项目内，设置回调

路径：github 项目 -> setting -> webhooks

payload url: http://{jenkins_server}/github-webhook/ <== 固定写法，jenkins 服务器/github-webhook/


### 杂项

1. 设置时间

系统设置 - 脚本命令行 - `System.setProperty('org.apache.commons.jelly.tags.fmt.timeZone', 'Asia/Shanghai')`


##### 参考

[jenkins+docker+vue项目的自动部署环境(案例)](https://juejin.im/post/5d369d6e5188253a2e1b93ff#heading-16) 作者：[praise](https://juejin.im/user/5b3b8d03e51d451964620580)

[jenkins和docker私有仓库registry环境安装](https://juejin.im/post/5b6af759e51d451951138eb4#heading-16) 作者：[袁志健](https://juejin.im/user/57cbfd5ca0bb9f007f4b3dc9)
