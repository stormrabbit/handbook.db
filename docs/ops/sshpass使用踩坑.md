# sshpass 安装失败

> 干你娘的新系统！

运行：

```
    brew install https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb
```

报错：

```
    Traceback (most recent call last):
    'brew extract' or 'brew create' and 'brew tap-new' to create a formula file in a tap on GitHub instead.: Invalid usage: Non-checksummed download of sshpass formula file from an arbitrary URL is unsupported!  (UsageError)
    'brew extract' or 'brew create' and 'brew tap-new' to create a formula file in a tap on GitHub instead.: Invalid usage: Non-checksummed download of sshpass formula file from an arbitrary URL is unsupported!  (UsageError)
```

运行：

```
    wget https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb
```

报错：

```
    sshpass.rb: Operation not permitted
```

访问：

```
    https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb
```

得到文件：

```
    require 'formula'

    class Sshpass < Formula
    url 'http://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz'
    homepage 'http://sourceforge.net/projects/sshpass'
    sha256 'c6324fcee608b99a58f9870157dfa754837f8c48be3df0f5e2f3accf145dee60'

    def install
        system "./configure", "--disable-debug", "--disable-dependency-tracking",
                            "--prefix=#{prefix}"
        system "make install"
    end

    def test
        system "sshpass"
    end
    end
```

保存在本地，命名为：`sshpass.rb`

运行：`brew install sshpass.rb`

输出结果：

```
    ==> Downloading http://sourceforge.net/projects/sshpass/files/sshpass/1.06/sshpass-1.06.tar.gz
    ==> Downloading from https://jaist.dl.sourceforge.net/project/sshpass/sshpass/1.06/sshpass-1.06.tar.gz
    ######################################################################## 100.0%
    ==> ./configure --prefix=/usr/local/Cellar/sshpass/1.06
    ==> make install
    🍺  /usr/local/Cellar/sshpass/1.06: 9 files, 77.9KB, built in 12 seconds

```

> macOS 我去年买了个表。听见了没？你买了个表。

> wget 无法使用？`brew install wget`

