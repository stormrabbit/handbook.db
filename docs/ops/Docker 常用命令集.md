###### 查看 docker 容器

```
    docker ps -a
```
###### 查看 docker image

```
    docker images
```

###### 停止 docker 容器

```
    docker stop 容器id
```

###### 删除 docker 容器

```
    docker rm 容器id
```

###### 删除 docker 镜像

```
    docker rmi 镜像id
```

###### docker compose 使用 docker-compose.yml 安装镜像

```
    docker-compose up -d
```

###### 以用户身份进入 docker 容器

```
docker exec -u root -t -i 容器id /bin/bash
```