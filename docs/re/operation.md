操作

检查设备连接状态

```bash
# 如果正确连接，会显示设备的 UDID。
idevice_id -l # wencong mac usb 连接 iphone后  00008101-000128383651001E
```

查看可用的设备列表

/Users/wencong/.local/bin/frida-ls-devices

获取设备的进程列表

`-U`连接到 `USB` 设备

-D`如果当前有多台 `USB` 设备，可以使用该参数指定设备的 `UDID`（`frida-ls-devices` 列出的那些 `id`）`

-R/-H`连接到远程 `frida-server`，主要用于远程调试`

-a`仅显示正在运行的应用`

-i`显示所有已安装的应用（包括 `AppStore`安装的应用和系统应用





https://juejin.cn/post/7079726534096846862
