# Postman：API 接口调试利器

> Postman 是一款 API 接口调试工具，使用它可以很方便的对接口进行测试，并且后端人员可以将自己的调试结果导出，方便前端人员调试。

## 安装

- 下载地址：https://www.getpostman.com/downloads/
- 下载完安装包后直接双击安装即可。

## 设置

### 主题设置

这里不得不说，Postman 的界面还是做的很好的，比起 Swagger 来说好多了，Postman 默认提供了两种主题，一种亮色和一种暗色，可以通过左上角的 File->Settings 按钮打开。

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_01.png)

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_02.png)

### 调整字体大小

可能界面默认的字体大小并不适合你，尤其是大屏幕的电脑，可以在 View 下的 Zoom In 和 Zoom Out 按钮进行放大和缩小。

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_03.png)

## 进行接口调试

> 测试接口均来自 mall-admin 后台，启动后可以直接测试。

### 调用 GET 请求

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_04.png)

### 调用 POST 请求提交 JSON 格式数据

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_05.png)

### 调用 POST 请求提交表单

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_06.png)

### 调用文件上传接口

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_07.png)

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_08.png)

### 调用需要登录的接口

### 调用登录接口获取令牌

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_09.png)

### 设置令牌头并调用需要登录的接口

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_10.png)

## 调试文件的导入与导出

### 将调试接口信息进行保存

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_11.png)

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_12.png)

### 导出 Collection 中的调试信息

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_17.png)

### 导入 Collection 中的调试信息

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_18.png)

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_19.png)

## 使用过程中的一些技巧

### 设置不同的环境

我们开发时，都会分本地环境和测试环境，本地环境用于本机调试接口，测试环境用于前后端联调接口。上面我们把[http://localhost:8080](http://localhost:8080)这个 ip 端口直接写在请求路径之中，当我们要调试测试环境接口时，就会产生麻烦。定义多个环境变量，在接口地址中进行引用，可以解决这个问题。

#### 添加本地环境

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_13.png)

#### 添加测试环境

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_14.png)

#### 引用环境变量

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_15.png)

#### 环境变量的切换

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_16.png)

### 设置通用的登录令牌

当我们有很多接口需要登录令牌头时，如果以前使用的令牌失效了，那所有接口的令牌头都会需要修改，这里可以把登录令牌定义好，再引用，这样令牌失效了，只需要修改一处即可。

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_20.png)

![页面展示](https://www.wencong.store:9004/common/docsify/postman/postman_screen_21.png)
