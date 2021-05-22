## Mac 电脑上使用移动硬盘保存文件

因为 Mac 的安sha全bi限制，外接移动硬盘无法直接写入文件，必须使用迂回的方式。

1. 确保移动硬盘链接，查看硬盘挂在的节点。

```
    diskutil info /Volumes/Elements
```

> /Volumes/Elements 为移动硬盘访问路径。

2. 查看输出结果  Device Node 对应值。

```

   Device Identifier:         disk2s1
   // 查看此处结果
   Device Node:               /dev/disk2s1
   Whole:                     No
   Part of Whole:             disk2

   ....
   ....
```

3. 使用命令行弹出硬盘，但是不要拔掉 USB。

```
    hdiutil eject /Volumes/Elements
```

> 成功会提示：`"disk2" ejected`

4. 创建目录。

```
    sudo mkdir /Volumes/MYHD
```

> 名字可以随便起

5. 使用命令行挂载移动硬盘。

```
    sudo mount_ntfs -o rw,nobrowse /dev/disk2s1 /Volumes/MYHD/
```

6. 使用命令行进行文件写入操作。

```
    cp ~/文件名 /Volumes/MYHD/
```

## mac 电脑查看/隐藏被隐藏的文件

```
$ defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder // 显示
$ defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder // 隐藏
```
