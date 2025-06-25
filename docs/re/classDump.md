## class-dump-z导出头文件

获取头文件，字符串，符号表

  - 利用class-dump获取
    /Users/wencong/devconf/class-dump/class-dump-3.5/class-dump -S -s -H /Users/wencong/Documents/duro/破解软件app/执行程序/hnta -o /Users/wencong/Documents/duro/破解软件app/headers/hnta1

    /Users/wencong/devconf/class-dump/class-dump-3.5/class-dump -S -s -H /Users/wencong/Documents/duro/破解软件app/执行程序/Blackjack -o /Users/wencong/Documents/duro/破解软件app/headers/Blackjack

  - nm -nmUj /Users/wencong/Documents/duro/破解软件app/执行程序/Blackjack
    __mh_execute_header



dwarfdump /Users/wencong/Documents/duro/破解软件app/执行程序/Blackjack
dwarfdump --arch arm64 --uuid /Users/wencong/Documents/duro/破解软件app/执行程序/Blackjack
UUID: 4D4482D8-D60F-3CCC-83F7-70CC1E29DDBD (arm64) /Users/wencong/Documents/duro/破解软件app/执行程序/Blackjack

/Users/wencong/Downloads/dsdump-master/compiled/dsdump -sc /Users/wencong/Documents/duro/破解软件app/执行程序/Blackjack
/Users/wencong/Downloads/dsdump-master/compiled/dsdump_0.8.3/dsdump_ios -sc /Users/wencong/Documents/duro/破解软件app/执行程序/Blackjack

dsdump 提取 Swift 头文件
nm -nm /Users/wencong/Documents/duro/破解软件app/脱壳后的app/Blackjack.app | grep "T _T0"
