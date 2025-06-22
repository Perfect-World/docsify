# 环境

## 硬件

电脑：MacBook Pro 版本15.2 (24C101) Intel Core i7

手机：iphone12mini ios16.1.1 未越狱 

数据传输线

## 软件

### Frida

在Mac上安装Frida可以按照以下步骤进行：

打开终端，输入以下命令检查Python和pip是否已经安装：

```bash
python3 --version		# Python 3.13.3
pip3 --version		# pip 25.0.1
# wencong自定义安装路径
/usr/local/python3/bin/python3 --version 		# Python 3.12.0
/usr/local/python3/bin/pip3 --version		# pip 23.2.1
```

安装编译工具，安装Xcode Command Line Tools，它包含了一些必要的编译工具：
```bash
xcode-select --version  # xcode-select version 2409.
xcode-select --install
```
### 2. 使用pip安装Frida
在终端中输入以下命令，使用pip3来安装Frida：
```bash
# 是否已安装
/usr/local/python3/bin/pip3 show frida frida-tools
# 安装
pip3 install frida frida-tools
# wencong自定义安装
/usr/local/python3/bin/pip3 install frida frida-tools
# 更新最新版本 2025年6月20日 Frida 17.2.4 发布
/usr/local/python3/bin/pip3 install --upgrade frida frida-tools 
```
`frida`是核心库，`frida-tools`包含了一些实用工具，如`frida-ps`（用于列出目标设备上的进程）、`frida-trace`（用于快速跟踪系统调用）等。

### 3. 验证安装
安装完成后，可以通过以下命令验证Frida是否安装成功：
```bash
frida --version
# wencong自定义安装
/Users/wencong/.local/bin/frida --version  # 16.6.6
```
如果安装成功，该命令会输出版本号。

### 4. 可能遇到的问题及解决方法

#### 权限问题
如果在使用`pip3`安装时遇到权限问题，可以在命令前加上`sudo`来获取管理员权限：
```bash
sudo pip3 install frida frida-tools
```

### 5.手机ios安装frida

1.多巴胺半越狱

2.sileo搜索frida，安装/更新

启动`Cydia`并添加 Frida 的仓库，方法是前往`Manage`-> `Sources`-> `Edit`->`Add`然后输入`https://build.frida.re`。现在你应该能够找到并安装`Frida`Frida 的软件包，该软件包允许 Frida 将 JavaScript 注入到 iOS 设备上运行的应用中。这需要通过 USB 连接，所以你需要准备好 USB 数据线，不过现在还不需要插入。

```bash
# 列出设备上运行的应用
/Users/wencong/.local/bin/frida-ps -U
```



