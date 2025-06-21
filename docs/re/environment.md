# 环境

## 硬件

电脑：MacBook Pro 版本15.2 (24C101) Intel Core i7

手机：iphone12mini ios16 未越狱

数据传输线

## 软件

### Frida

在Mac上安装Frida可以按照以下步骤进行：

打开终端，输入以下命令检查Python和pip是否已经安装：

```bash
python3 --version
pip3 --version
```

上面是系统自带的，下面是自己安装的

```bash

/usr/local/python3/bin/python3

```
安装编译工具
安装Xcode Command Line Tools，它包含了一些必要的编译工具：
```bash
xcode-select --install
```
### 2. 使用pip安装Frida
在终端中输入以下命令，使用pip3来安装Frida：
```bash
pip3 install frida frida-tools
或
/usr/local/python3/bin/pip3 install frida frida-tools
```
`frida`是核心库，`frida-tools`包含了一些实用工具，如`frida-ps`（用于列出目标设备上的进程）、`frida-trace`（用于快速跟踪系统调用）等。

### 3. 验证安装
安装完成后，可以通过以下命令验证Frida是否安装成功：
```bash
frida --version
/Users/wencong/.local/bin/frida --version
```
如果安装成功，该命令会输出版本号。

### 4. 可能遇到的问题及解决方法

#### 权限问题
如果在使用`pip3`安装时遇到权限问题，可以在命令前加上`sudo`来获取管理员权限：
```bash
sudo pip3 install frida frida-tools
```