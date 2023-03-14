# Python3 上手笔记
> ChatGpt 真的是好老师

## 介绍&准备

### python 概览

#### Python2 与 Python3 有什么区别？新人推荐使用哪一个？

Python2和Python3是两个主要的Python版本。虽然两者的语法和基本功能非常相似，但它们之间还是有一些重要的区别：

1. 语法差异：Python2和Python3在语法上存在一些不同，例如，Python3中print语句被改成了print函数，同时增加了一些新的关键字和操作符。
2. 字符编码：Python2默认使用ASCII编码，而Python3则默认使用UTF-8编码。这意味着，在Python3中，字符串默认是Unicode编码，不需要像Python2中那样使用特定的编码格式。
3. 兼容性：由于语法和功能的不同，Python2和Python3并不完全兼容。这意味着一些使用Python2编写的代码可能需要进行一些修改才能在Python3中运行。
4. 支持周期：Python2于2020年1月已经停止更新和支持，不再发布新版本。而Python3仍在持续更新和发展。

对于新手，推荐使用Python3，因为它是Python的最新版本，包含了许多新特性和改进，并且也是Python的未来发展方向。此外，Python3也更加注重编程的安全性和可靠性，例如，在处理字符串时使用默认的Unicode编码可以避免许多常见的错误和安全问题。虽然一些库和工具仍然依赖于Python2，但大多数情况下，新手应该选择使用Python3编写他们的项目。

#### Python3 能做什么？

Python3 可以用于许多不同的方面，以下是其中的一些：

1. Web 开发：Python3 有许多流行的 Web 框架，如 Django、Flask 等，可用于构建 Web 应用程序和 API。
2. 数据科学和机器学习：Python3 有许多流行的数据科学和机器学习库，如 NumPy、Pandas、Scikit-learn、TensorFlow 等，可用于数据处理、建模、可视化和机器学习等领域。
3. 自动化和脚本编写：Python3 有一个强大的标准库，可用于编写自动化脚本、批处理脚本和系统管理任务，如处理文件、网络、数据库等等。
4. 游戏开发：Python3 有一些游戏开发框架和库，如 Pygame、PyOpenGL 等，可用于创建 2D 或 3D 游戏和图形应用程序。

此外，Python3 还可以用于网络爬虫、自然语言处理、桌面应用程序、科学计算、图像处理等许多其他领域。

##### 追问：请详述有关网络爬虫方面

Python3 在网络爬虫方面非常流行，并且有许多用于网络爬虫的库和框架可供选择。以下是其中的一些：

- Beautiful Soup：Beautiful Soup 是一个用于解析 HTML 和 XML 文档的库。它提供了一种简单的方法来查找、遍历和修改文档树，可用于 Web 爬虫和数据抽取。
- Scrapy：Scrapy 是一个流行的 Python 网络爬虫框架。它基于 Twisted Python 框架构建，提供了许多高级功能，如异步网络请求、分布式爬虫、数据管道等等。
- Requests：Requests 是一个用于发送 HTTP 请求的库。它提供了一种简单的方法来发送 GET、POST、PUT、DELETE 等 HTTP 请求，并处理响应数据。
- Selenium：Selenium 是一个用于 Web 应用程序自动化测试的库，也可以用于 Web 爬虫。它提供了一种简单的方法来模拟用户行为，如点击、输入、提交表单等等。
- PyQuery：PyQuery 是一个类似于 jQuery 的库，用于解析 HTML 文档并提供一种简单的方式来查找、遍历和修改文档树。

使用 Python3 编写网络爬虫时，需要注意遵守网站的爬虫规则，避免对目标网站造成过多负担。此外，还需要注意数据隐私和安全问题，避免在爬取过程中泄露个人或机构的敏感信息。

### 安装与 `hello world`

#### mac 安装 Python3 

可以使用 homebrew 安装 Python3:

```
brew install python3
```

注意：在安装Python之前，请确保已经安装了Xcode Command Line Tools。

##### 为什么需要在安装 python3 之前检测是否安装 XCLT。

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
> ps: 此更新有可能重启 mac，谨慎选择重启时刻。

##### homebrew 是什么？如何在本机安装 homebrew 以及其他情况

###### homebrew 是什么？

Homebrew 是 Mac 上流行的包管理器，可以用于安装和管理多种开发工具和库。它简化了在 Mac 上安装各种软件和工具的流程，让用户可以轻松地获取最新的版本并快速更新已安装的软件。

使用 Homebrew，用户可以通过简单的命令行操作安装和卸载软件，而无需手动下载、解压和编译源代码。Homebrew 会自动下载软件的二进制安装包或源代码，并将其编译、安装和配置好。

Homebrew 支持安装的软件和工具非常丰富，包括 Python、Node.js、Git、Vim、Emacs、MySQL、PostgreSQL 等。同时，Homebrew 还有一个社区贡献的软件仓库，称为 Homebrew Cask，用于安装和管理 macOS 应用程序。

总之，Homebrew 是 Mac 上安装和管理软件的好帮手，可以让用户更加高效地进行开发和管理。

###### homebrew 相关命令：

- 检测本机是否已安装：`brew --version`
- 安装：`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- 升级：`brew update`
- 检测与诊断：`brew doctor`
- 查看 homebrew 镜像源：`brew config`
- 更换 homebrew 镜像源为中国：
  - 先备份：`cp /usr/local/Homebrew/Library/Homebrew/brew.sh /usr/local/Homebrew/Library/Homebrew/brew.sh.bak`
  - 更换国内源：`/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`
  - 如果需要恢复：`cp /usr/local/Homebrew/Library/Homebrew/brew.sh.bak /usr/local/Homebrew/Library/Homebrew/brew.sh`

#### 验证本机 python3 是否安装成功以及第一个 python3 程序

- 查看本机 python3 版本：`python3 --version`
> 注意是 **python3** 不是 **python**
- *Hello，world*：
  - 命令行输入 `python3` 启动 p3 解释器。
  - 输入 `print("hello, world")`

##### vscode 相关配置

###### 为 vscode 添加 python3 风格的插件

使用 VS Code 进行 Python3 开发，推荐安装以下几个插件：

- Python：Python 官方提供的 VS Code 扩展，提供了 Python3 的语法高亮、代码补全、调试等功能。
- Pylance：微软推出的 Python 语言服务插件，提供了代码补全、语法检查、类型检查等功能，能够极大地提高开发效率和代码质量。
- Code Runner：可以快捷地运行代码，支持多种语言，包括 Python3。

安装这些插件可以让 Python3 开发更加高效、便捷和准确。除了上述插件，还有许多其他的插件可以提供各种功能和工具，可以根据自己的需求选择安装。

###### vscode 插件 +

考虑到 chatgpt 提供的比较基础，又进行了 google，并依据[此文章](https://cloud.tencent.com/developer/article/1681760) 进行了增加。

- Pylint：pylint是python默认的语法提示工具，除了它，你还可以选择安装其他的语法提示工具（比如flake8）
- Anaconda：看下知乎介绍，目前没用着。用的时候再补充吧。

###### 安装 pylint 后，`hello.py` 中 `print("hello, world")` 有蓝色提示，查看原因出现警告`Missing module docstringPylint`。

Missing module docstring 是 Pylint 的警告信息，意思是某个 Python 模块（module）缺少了文档字符串（docstring）。

文档字符串是在模块、函数、类等定义之前用三个引号包括起来的字符串，用于解释该模块、函数、类等的功能和用法。缺少文档字符串会给代码维护和使用带来困难，因此，良好的 Python 编码习惯要求为每个定义编写文档字符串。

要解决 Missing module docstring 警告，可以在该模块的开头添加文档字符串

```
"""
这是一个示例模块，用于演示文档字符串的用法。
"""
print("hello, world")
```

错误解决。

###### 使用 code runner 后报错：/bin/sh: python: command not found

主要原因是 code runner 使用 python 的解释器位置不对（也可能是因为解释器太多），需要修改 code runner python 解释器位置。

1. 打开 VS Code 编辑器，并进入 Code Runner 插件的扩展页面。点击插件页面右侧的齿轮图标，选择“Extension Settings”进入插件的用户设置页面。
2. 在搜索框中输入 `code-runner.executorMap` 来查找 Code Runner 的配置项。
3. 找到 Python 对应的配置项，一般为“python”，然后将对应的 Python 解释器路径写在配置项的值中，例如：
```
"code-runner.executorMap": {
   "python": "python3 -u"
}
```
4. 修改完成，保存。
> 查看本机 python 解释器位置：`which python3`，注意是 **`python3`**。

###### 如何使用 vscode 打开特定文件夹

可以使用 code 命令在命令行中打开 VS Code 并打开某个文件夹。

首先，打开终端（Terminal），进入到要打开的文件夹所在的目录。

在终端中输入以下命令：`code .`

上述命令中的 **`.`** 表示当前目录，也可以替换为要打开的目录的路径。

按下回车键，VS Code 将会自动打开，并加载该目录的所有文件和子目录。

此外，还可以使用 code 命令打开指定的文件：`code filename.py`

上述命令将会打开文件名为 filename.py 的文件。

###### vscode 使用命令行 打开时出现错误提示：zsh: command not found: code

如果在终端中运行 code 命令时出现 zsh: command not found: code 错误提示，可能是因为 VS Code 没有被正确添加到系统路径中。

可以尝试按照以下步骤解决该问题：

1. 打开 VS Code，然后打开命令面板（Command Palette），快捷键为 Shift+Command+P（MacOS）或 Ctrl+Shift+P（Windows/Linux）。
2. 在命令面板中输入 `Shell Command: Install 'code' command in PATH` 并选择该命令。这个命令将会自动将 code 命令添加到系统路径中。
3. 重启终端并重新运行 code 命令，应该可以正常打开 VS Code 了。
> 我在此步成功了。

如果以上方法没有解决问题，可以尝试手动将 code 命令添加到系统路径中。还需要做以下额外步骤

4. 在终端中运行以下命令，打开 shell 配置文件：（用 vim 也行）
    - bash：`$ nano ~/.bashrc`
    - zsh: `$ nano ~/.zshrc`
5. 添加 `export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"` 到末尾。
6. 按下 Ctrl+X，然后按下 Y 和 Enter，保存并退出 nano 编辑器。
7. 重启终端。

###### nano 是啥？和 vim 有啥区别？

Nano和Vim都是Linux和Unix操作系统下的命令行文本编辑器，它们都能够完成文本编辑的基本功能。但是，它们也有一些区别：

- 界面：Nano的界面比Vim更加简单易用，新手上手更加容易。
- 快捷键：Nano的快捷键比Vim更加简单，适合不需要频繁使用文本编辑器的用户。而Vim的快捷键非常复杂，需要一定的学习成本，但是一旦掌握，能够大大提高编辑效率。
- 功能：Vim比Nano功能更加强大，支持更多的操作和编辑方式，可以方便地进行代码编写和调试。但是对于只需要进行基本文本编辑的用户来说，Nano已经足够了。

总的来说，Nano比Vim更加容易上手，适合初学者和对于编辑器没有特殊需求的用户。而Vim则适合有一定编程经验的用户，它的高效编辑和强大的功能在程序开发中会非常有用。

## python3 编程学习

### python3 基础语法与常用数据结构

- [官方文档](https://docs.python.org/zh-cn/3/)：查看学习。
- [互动式学习](https://www.codecademy.com/learn/learn-python-3)：貌似要收费？？

### python3 标准库

标准库中有很多函数和模块，以下是其中一些常用的函数和模块：

- os：提供了一些与操作系统交互的函数，如文件和目录的操作、进程管理、环境变量。
- sys：提供了对 Python 解释器的访问和控制，如命令行参数、标准输入输出等。
- datetime：提供了日期和时间处理的函数和类，如日期的表示和计算、时区转换、时间戳等。
- math：提供了数学运算的函数，如三角函数、指数、对数、小数等。
- random：提供了随机数生成的函数。
- re：提供了正则表达式操作的函数和类。
- json：提供了 JSON 数据格式的编码和解码。
- urllib：提供了从 Web 服务器获取数据的函数和类。
- email：提供了处理电子邮件的类和函数。
- tkinter：提供了 GUI 编程的功能。

### 3 个 github 上面向新手的 github 项目

- [Python for Everybody](https://github.com/csev/py4e): 该项目是由美国密歇根大学开设的Python课程，涵盖从基础的编程概念到高级数据结构和网络编程。它提供了大量的练习和解决方案，并使用简单的语言和示例，使新手可以轻松理解。
- [Beginner Python Projects](https://github.com/Mrinank-Bhowmick/python-beginner-projects): chatgpt 提供的链接已经失效，这个是自己找的。
- [Python Crash Course](https://github.com/ehmatthes/pcc): 该项目是一本畅销书籍的伴随项目，它涵盖了从基础知识到数据可视化、Web应用程序和游戏开发等广泛主题。它提供了大量的示例代码、练习和项目，以帮助新手学习Python。

### python3 引用第三方库并使用

#### pip 安装与使用

- 检查是否安装：
  - `pip3 --version`，Python3 用这个。
  - `python3 -m pip --version`，这个可以看自带 pip 的路径。
- 安装（比如安装 python3 request）：`pip3 install requests`。
- 升级：`pip3 install --upgrade requests`。

#### 使用 request 请求接口

`demo2.py`

```
"""
第三方导入使用
"""
import requests
r = requests.get('https://api.github.com/events', timeout=15)
temp = r.json()
print(temp)

```
> 使用 request 时，需要设置超时时间 timeout，不然会有警告提示 `Missing timeout argument for method 'requests.get' can cause your program to hang indefinitely`，request 没有默认超时时间，不设置的话会一直等待不会超时。

##### 具体 request 使用
> 详细可以参考[这里](https://www.runoob.com/python3/python-requests.html)

- 一行代码 Get 请求：`r = requests.get('https://api.github.com/events')`
- post 请求：`r = requests.post('https://httpbin.org/post', data = {'key':'value'})`