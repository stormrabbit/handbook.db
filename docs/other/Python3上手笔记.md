# Python3 上手笔记
> ChatGpt 真的是好老师

## 基本介绍

### Python2 与 Python3 有什么区别？新人推荐使用哪一个？

Python2和Python3是两个主要的Python版本。虽然两者的语法和基本功能非常相似，但它们之间还是有一些重要的区别：

1. 语法差异：Python2和Python3在语法上存在一些不同，例如，Python3中print语句被改成了print函数，同时增加了一些新的关键字和操作符。
2. 字符编码：Python2默认使用ASCII编码，而Python3则默认使用UTF-8编码。这意味着，在Python3中，字符串默认是Unicode编码，不需要像Python2中那样使用特定的编码格式。
3. 兼容性：由于语法和功能的不同，Python2和Python3并不完全兼容。这意味着一些使用Python2编写的代码可能需要进行一些修改才能在Python3中运行。
4. 支持周期：Python2于2020年1月已经停止更新和支持，不再发布新版本。而Python3仍在持续更新和发展。

对于新手，推荐使用Python3，因为它是Python的最新版本，包含了许多新特性和改进，并且也是Python的未来发展方向。此外，Python3也更加注重编程的安全性和可靠性，例如，在处理字符串时使用默认的Unicode编码可以避免许多常见的错误和安全问题。虽然一些库和工具仍然依赖于Python2，但大多数情况下，新手应该选择使用Python3编写他们的项目。

### Python3 能做什么？

Python3 可以用于许多不同的方面，以下是其中的一些：

1. Web 开发：Python3 有许多流行的 Web 框架，如 Django、Flask 等，可用于构建 Web 应用程序和 API。
2. 数据科学和机器学习：Python3 有许多流行的数据科学和机器学习库，如 NumPy、Pandas、Scikit-learn、TensorFlow 等，可用于数据处理、建模、可视化和机器学习等领域。
3. 自动化和脚本编写：Python3 有一个强大的标准库，可用于编写自动化脚本、批处理脚本和系统管理任务，如处理文件、网络、数据库等等。
4. 游戏开发：Python3 有一些游戏开发框架和库，如 Pygame、PyOpenGL 等，可用于创建 2D 或 3D 游戏和图形应用程序。

此外，Python3 还可以用于网络爬虫、自然语言处理、桌面应用程序、科学计算、图像处理等许多其他领域。

#### 追问：请详述有关网络爬虫方面

Python3 在网络爬虫方面非常流行，并且有许多用于网络爬虫的库和框架可供选择。以下是其中的一些：

- Beautiful Soup：Beautiful Soup 是一个用于解析 HTML 和 XML 文档的库。它提供了一种简单的方法来查找、遍历和修改文档树，可用于 Web 爬虫和数据抽取。
- Scrapy：Scrapy 是一个流行的 Python 网络爬虫框架。它基于 Twisted Python 框架构建，提供了许多高级功能，如异步网络请求、分布式爬虫、数据管道等等。
- Requests：Requests 是一个用于发送 HTTP 请求的库。它提供了一种简单的方法来发送 GET、POST、PUT、DELETE 等 HTTP 请求，并处理响应数据。
- Selenium：Selenium 是一个用于 Web 应用程序自动化测试的库，也可以用于 Web 爬虫。它提供了一种简单的方法来模拟用户行为，如点击、输入、提交表单等等。
- PyQuery：PyQuery 是一个类似于 jQuery 的库，用于解析 HTML 文档并提供一种简单的方式来查找、遍历和修改文档树。

使用 Python3 编写网络爬虫时，需要注意遵守网站的爬虫规则，避免对目标网站造成过多负担。此外，还需要注意数据隐私和安全问题，避免在爬取过程中泄露个人或机构的敏感信息。

## mac 安装 Python3 

可以使用 homebrew 安装 Python3:

```
brew install python3
```

注意：在安装Python之前，请确保已经安装了Xcode Command Line Tools。

### 为什么需要在安装 python3 之前检测是否安装 XCLT。

Xcode Command Line Tools是在MacOS中开发工具的命令行工具集合，其中包括了一些常用的开发工具和库。在安装Python时需要使用其中的一些工具来编译安装Python以及一些Python库。如果没有安装Xcode Command Line Tools，可能会导致Python无法正常安装或者编译失败等问题。

- 检测本机是否安装 XCLT：`xcode-select -p`

如果已经安装，会输出 `/Applications/Xcode.app/Contents/Developer` 类似的内容。

如果没有安装，会输出类似于以下内容：

```
xcode-select: error: command line tools are not installed, use "xcode-select --install" to install
```

此时需要运行 `xcode-select --install` 进行安装。

- 检测是否需要更新：`softwareupdate --list`

该命令会列出所有可用的软件更新，其中如果有 Xcode Command Line Tools 的更新，会显示如下信息：`Command Line Tools for Xcode-13.2		Command Line Tools for Xcode 13.2`

如果没有更新或者当前已经是最新版本，不会显示任何有关 Xcode Command Line Tools 的信息。

- 更新 XCLT：`sudo softwareupdate --install --all`
> ps: 此更新有可能重启 mac，谨慎使用。

### homebrew 是什么？如何在本机安装 homebrew 以及其他情况

#### homebrew 是什么？

Homebrew 是 Mac 上流行的包管理器，可以用于安装和管理多种开发工具和库。它简化了在 Mac 上安装各种软件和工具的流程，让用户可以轻松地获取最新的版本并快速更新已安装的软件。

使用 Homebrew，用户可以通过简单的命令行操作安装和卸载软件，而无需手动下载、解压和编译源代码。Homebrew 会自动下载软件的二进制安装包或源代码，并将其编译、安装和配置好。

Homebrew 支持安装的软件和工具非常丰富，包括 Python、Node.js、Git、Vim、Emacs、MySQL、PostgreSQL 等。同时，Homebrew 还有一个社区贡献的软件仓库，称为 Homebrew Cask，用于安装和管理 macOS 应用程序。

总之，Homebrew 是 Mac 上安装和管理软件的好帮手，可以让用户更加高效地进行开发和管理。

#### homebrew 相关命令：

- 检测本机是否已安装：`brew --version`
- 安装：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- 升级：`brew update`
- 检测与诊断：`brew doctor`
- 查看 homebrew 镜像源：`brew config`
- 更换 homebrew 镜像源为中国：
  - 先备份：`cp /usr/local/Homebrew/Library/Homebrew/brew.sh /usr/local/Homebrew/Library/Homebrew/brew.sh.bak`
  - 更换国内源：`/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`
  - 如果需要恢复：`cp /usr/local/Homebrew/Library/Homebrew/brew.sh.bak /usr/local/Homebrew/Library/Homebrew/brew.sh`
