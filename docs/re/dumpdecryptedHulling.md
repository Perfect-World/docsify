## 注入dumpdecrypted.dylib进行脱壳

1.安装app
- 下载好ios和android使用的app安装包
  - 同仁棋牌.apk 同仁棋牌.ipa
- mac远程连接iphone手机，传ipa安装
  - scp /Users/wencong/Documents/duro/破解软件app/同仁棋牌.ipa mobile@192.168.0.101:/var/mobile/Containers/Shared/AppGroup/6C647C96-E320-45C2-8421-030A431C1C1A/File\ Provider\ Storage/wencong
- 手机上使用trollstore安装ipa
- 下载地址

2.判断安装包是否加壳
- iproxy 2222 22
- ssh -p 2222 mobile@127.0.0.1 
  - zhaowen863
- ps -A | grep 00\ /var/containers/Bundle/Application
- 找到对应的文件名
- 如果没有找到，使用手机上的Filza软件，进入目录后查找
- 如小红书 scp mobile@192.168.0.101:/var/containers/Bundle/Application/77392CA9-9D95-4BB4-896A-B74C12F83541/discover.app/discover /Users/wencong/Documents/duro/破解软件app/执行程序/
- 打开machOview将discover拖拽到窗口
  - 然后选择 Executable (ARM.V7) 或者 Executable (ARM64ALL) ,2个不同的架构,
  - 先选一个, 选择了arm 64查看arm64下的 Load Commands 下面的LC_ENCRYPTION_INFO_64.查看里面的Crypt ID .
  - 如果是0,就是没加密.其他数字是加密方式

- scp mobile@192.168.0.101:/var/containers/Bundle/Application/9F07FEDF-3AB6-48D8-B84A-DCD5737D48B3/hnta.app/hnta /Users/wencong/Documents/duro/破解软件app/执行程序/
- scp mobile@192.168.0.101:/var/containers/Bundle/Application/CADDD518-126E-4348-B8A4-EC3A8C8F81BD/Blackjack.app/Blackjack /Users/wencong/Documents/duro/破解软件app/执行程序/
- 结果都是0, 无壳























