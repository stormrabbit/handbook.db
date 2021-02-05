
### 接收输入参数
> 注意，变量名和等号之间不能有空格!!!注意，变量名和等号之间不能有空格!!!注意，变量名和等号之间不能有空格!!!

> 重要的事说三遍

> 输入参数按照 0 1 2 3 ... 排列，$1 为第一个参数，$0 为脚本本身
```
#!/bin/bash
temp=$1
echo $temp
```

### 条件判断

1. 判断输入参数是否为空

```
if [ ! "$1" ] # 判断参数是否为空
then
    echo "没有输入参数"
else
    echo $1
fi
```

2. 判断路径文件是否存在，不存在则创建
```
    if [ ! -d "${_file_path}" ];
    then
        echo "文件夹不存在，创建${_file_path}\n"
        mkdir -p ${_file_path}
    fi
```

### 输出内容到文件

```
echo -e "hello,world" > file1
cat file1
```

> echo xxx > fileName 是指把屏幕上输出的内容输入到 fileName 中
> 操作系统换行符支持情况不同，如果有换行需要 -e 保持换行格式
