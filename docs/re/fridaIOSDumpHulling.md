## Frida-iOS-dump脱壳

脱壳
  1.dump

  - 事先在mac和iphone上安装好frida
  - 获取应用包名
    - /Users/wencong/.local/bin/frida-ps -Uia
    - 同仁棋牌  -   -   -  dffd.vafe.fawe  
    - 黑杰克_xyz  -   -   com.mobilityware.BlackJackFreeAA
    - 小红书  -   -   -   com.xingin.discover
  - 基于Frida的工具 脱壳/砸壳工具 
    - ios frida-ios-dump https://github.com/AloneMonkey/frida-ios-dump
  - android frida-unpack https://github.com/dstmath/frida-unpack
  - 修改对应配置
    - User = 'mobile'
    - Password = 'zhaowen863'
  - 手机上打开应用
    - /usr/local/python3/bin/python3 /Users/wencong/Documents/duro/破解软件app/frida-ios-dump-master/dump.py com.xingin.discover
    - mv 小红书.ipa /Users/wencong/Documents/duro/破解软件app/脱壳后的app/
      2.用手机上的AppsDump2脱壳
  - 复制路径，粘贴到备用录，用scp上传文件到电脑
  - scp mobile@192.168.0.101:/var/mobile/Containers/Data/Application/933C9026-4CD5-450C-979A-B089D7D6F340/Documents/DumpIpa/小红书-8.71.ipa /Users/wencong/Documents/duro/破解软件app/脱壳后的app/
