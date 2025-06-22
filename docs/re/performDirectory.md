## 获取执行目录

[脚本](./js/frida_script.js)

```bash
# 是否连接上手机
idevice_id -l
# 查找手机上app程序
/Users/wencong/.local/bin/frida-ps -Uai 
/Users/wencong/.local/bin/frida-ls-devices
#    -  黑杰克_xyz          com.mobilityware.BlackJackFreeAA  
#    -  同仁棋牌             dffd.vafe.fawe   

/Users/wencong/.local/bin/frida -U -N com.mobilityware.BlackJackFreeAA -l /Users/wencong/project/frontier/docsify/docs/re/js/frida_script1.js

// 获取主应用的 bundle 路径
const mainBundlePath = ObjC.classes.NSBundle.mainBundle().bundlePath().toString();
console.log("主应用 Bundle 路径:", mainBundlePath);

// 获取主应用的可执行文件路径
const executablePath = ObjC.classes.NSBundle.mainBundle().executablePath().toString();
console.log("可执行文件路径:", executablePath);

```

