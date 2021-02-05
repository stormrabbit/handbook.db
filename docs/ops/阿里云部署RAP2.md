
### 步骤

##### Docker 

1. 安装 Docker

```
curl -sSL https://get.daocloud.io/docker | sh
```

> 碰到问题：`Delta RPMs disabled because /usr/bin/applydeltarpm not installed.`

> 解决方式：`yum install deltarpm`

2. 安装需要软件包

```
sudo yum install -y yum-utils device-mapper-persistent-data 

```

3. 设置 yum 源
```
# 阿里源，国内速度快 （本文设置这个源，安装成功）
$ sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

4. 安装 docker 

```
$ sudo yum install docker-ce 
```

5. 启动

```
$ sudo systemctl start docker
$ sudo systemctl enable docker
```

6. 检查安装情况
```
docker version
```

7 如果安装有问题，卸载老版本
```
sudo yum remove docker  docker-common docker-selinux docker-engine
```

##### 安装 docker compose

1. 安装依赖包

```
sudo yum install epel-release
```

2. 安装 python-pip:

```
$ sudo yum install -y python-pip

```

> 碰到问题：pip 版本过低，执行命令`pip install --upgrade pip`后修复

> Centos8 里提示 pip not found，另一种安装方法:
```
sudo curl -L "https://get.daocloud.io/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose

```

3. 安装 Docker Compose

```
sudo pip install docker-compose
```

4. 升级 python 包

```
$ sudo yum upgrade python*
```

5. 验证安装

```
docker-compose version
```

6. 卸载
```
sudo rm /usr/local/bin/docker-compose
sudo pip uninstall docker-compose
```

##### docker 常用命令

```
# 开启 Docker
$ sudo service docker start

# 关闭 Docker
$ sudo service docker stop

# 重启 Docker
$ sudo service docker restart

```
```
# 开启 Docker
$ sudo systemctl start docker

# 关闭 Docker
$ sudo systemctl stop docker

# 重启 Docker
$ sudo systemctl restart docker
```

```
# docker 版 hello world
sudo docker run hello-world
```

##### 使用 docker 部署 Rap2

```
mkdir /home/wizard/rap
cd /home/wizard/rap
git clone https://github.com/thx/rap2-delos.git
cd rap2-delos/
mv docker-compose.yml /home/wizard/rap/
cd ..
rm -fR rap2-delos/
# 拉起 docker
docker-compose up -d
# 初始化
docker-compose exec delos node scripts/init
```
###### 日常使用 & 维护
```
# 部署成功后 访问
http://localhost:3000 # 前端（可自定义端口号）
http://localhost:38080 # 后端
# 如果访问不了可能是数据库没有链接上，关闭 rap 服务
docker-compose down
# 再重新运行
docker-compose up -d
# 如果 Sequelize 报错可能是数据库表发生了变化，运行下面命令同步
docker-compose exec delos node scripts/updateSchema

# Rap 经常会进行 bugfix 和功能升级，用 Docker 可以很方便地跟随主项目升级
# 拉取一下最新的镜像
docker-compose pull
# 暂停当前应用
docker-compose down
# 重新构建并启动
docker-compose up -d --build
# 有时表结构会发生变化，执行下面命令同步
docker-compose exec delos node scripts/updateSchema
# 清空不被使用的虚悬镜像
docker image prune -f
```


##### 参考文章

- [Rap2 官方文档](https://github.com/thx/rap2-delos)
- [Centos7 上安装 docker 笔记](https://blog.csdn.net/hylaking/article/details/87978819)
- [安装 Docer 和 Docker Compose(Centos 7)](https://juejin.im/post/5da2c97e6fb9a04ddb3b7bc4)
