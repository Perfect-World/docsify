#!/bin/bash

if lsof -i:50041; then
    pids=$(lsof -i:50041 | awk '{print $2}')
    kill -9 $pids
    echo "关闭占用端口号50041进程, 等待1秒"
    sleep 2
fi
echo "启动docsify服务"
docsify serve ../docs --port 50041
echo "访问: http://localhost:50041/"
# sh document/local_start.sh
# kill -9 $(ps -ef | grep docsify | grep -v grep | awk '{print $2}')

