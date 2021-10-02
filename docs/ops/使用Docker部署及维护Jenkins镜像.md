# 使用 Docker 部署以及维护 Jenkins 镜像

## 安装 docker 以及 docker-compose

[懒](https://www.runoob.com/docker/centos-docker-install.html)
[懒2](https://www.runoob.com/docker/docker-compose.html)


> Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务 —— 关系有点类似于 mysql 和小海豚。

## 安装与运行

### 安装最新版 Jenkins 镜像

```
docker pull jenkins/jenkins:lts
```

### 查看安装情况

```
docker images // 查看现有 docker 镜像
docker inspect  // 返回镜像元数据
```

### 以镜像源创建容器并启动

```
docker run -d --name jenkins_new -p 8081:8080 -v /data/jenkins_home:/var/jenkins_home jenkins/jenkins:lts;
```

备注：
-d //启动在后台
--name //容器名字
-p //端口映射（8081：宿主主机端口，8080：容器内部端口）
-v //数据卷挂载映射（/data/jenkins_home：宿主主机目录，另外一个即是容器目录）
enkins/jenkins:lts //Jenkins镜像（最新版）

> 使用 `docker ps -a` 查看会发现启动失败，有可能是 jenkins_home 权限问题，使用 chmod 777 开放权限后 restart。

### 初始化

运行成功后访问 Jenkins（需正确使用 url 和端口），会有初始页面

![初始化洁面](../../imgs/jks.png)

进入镜像执行命令 `cat /var/jenkins_home/secrets/initialAdminPassword`，复制密码并粘贴。

> 进入镜像的方法 `docker exec -u root -t -i 容器id /bin/bash`

安装推荐插件，等待执行完成设置。

## 更新、维护以及打包新镜像

> 此处只讨论使用 Dockerfile 定制镜像、使用 docker-compose.yml 启动镜像。

### 使用 Dockerfile 定制镜像

> [Dockerfile 语法指南](https://github.com/qianlei90/Blog/issues/35) 

#### 1. 编写 Dockerfile

```
FROM jenkins/jenkins:lts
LABEL author="user"
USER root
RUN apt-get update \
    && apt-get install vim -y
```

#### 2. 使用 Dockerfile 创建镜像

进入到 Dockerfile 所在文件夹，执行

```
docker build -t my_docker:v1 .
```

> my_docker 是镜像名称

查看现有镜像，build 成功会添加镜像到当前镜像列表。

## 错误处理

### 1. 安装好后出现 `RequestsDependencyWarning: urllib3 (1.13.1) or chardet (2.3.0) doesn't match a supported version!` 错误

- 解决方式：
```
pip uninstall urllib3
pip uninstall chardet
pip install --upgrade requests

```

## 参考

[docker 官方文档](https://docs.docker.com/)
[Dockerfile 编写指南](https://zhuanlan.zhihu.com/p/105885669)
[CentOS Docker 安装](https://www.runoob.com/docker/centos-docker-install.html)
[Docker Compose 安装](https://www.runoob.com/docker/docker-compose.html)
[yml 入门教程](https://www.runoob.com/w3cnote/yaml-intro.html)
[Docker常用命令集.md](Docker常用命令集.md)
[docker 学习全记录](https://www.cnblogs.com/poloyy/category/1870863.html?page=3)