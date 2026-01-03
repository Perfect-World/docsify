#!/bin/bash

# 根目录
ROOT_PATH="/root/wencong"
# 服务信息
SERVER_INFO_PATH="${ROOT_PATH}/document/server_info.txt"

# 第六步：获取内网IP、公网IP和接受访问状态
printf "【7/9】获取内网IP、公网IP和接受访问状态...\n"
# ========== 1. 获取内网IP ==========
INNER_IP="未知"
if command -v ip >/dev/null 2>&1; then
    INNER_IP=$(ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}/\d+' | grep -v '^127\.' | head -n1 | cut -d'/' -f1)
elif command -v ifconfig >/dev/null 2>&1; then
    INNER_IP=$(ifconfig | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '^127\.' | head -n1)
fi

# ========== 2. 获取公网IP ==========
PUBLIC_IP="未知"
# 优先curl获取公网IP
if command -v curl >/dev/null 2>&1; then
    PUBLIC_IP=$(curl -s --connect-timeout 5 icanhazip.com || curl -s --connect-timeout 5 ifconfig.me || echo "未知")
# 备选wget获取
elif command -v wget >/dev/null 2>&1; then
    PUBLIC_IP=$(wget -qO- --timeout=5 icanhazip.com || wget -qO- --timeout=5 ifconfig.me || echo "未知")
fi

# ========== 3. 检测接受访问状态（入站，是否可被外部访问） ==========
PASSIVE_ACCESS_STATUS="未知"
# 定义需要检查的核心端口（优先检测22，可扩展）
CHECK_PORT="22"
# 标记变量
HAS_PUBLIC_IP=0
HAS_PUBLIC_LISTEN=0
FIREWALL_ALLOWS=0
OUTER_ACCESS=0  # 外网实际可达标记：0=不可达/未知，1=可达
OUTER_ACCESS_MSG=""  # 外网检测详情

# 1. 检查是否有有效公网IP（排除内网IP段）
if [ "${PUBLIC_IP}" != "未知" ] && ! echo "${PUBLIC_IP}" | grep -E '^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)'; then
    HAS_PUBLIC_IP=1
else
    OUTER_ACCESS_MSG="无有效公网IP"
fi

# 2. 检查目标端口是否在公网接口（0.0.0.0）监听
if [ ${HAS_PUBLIC_IP} -eq 1 ]; then
    if command -v netstat >/dev/null 2>&1; then
        if netstat -tuln | grep -E ":${CHECK_PORT} " | grep -E "0\.0\.0\.0:${CHECK_PORT}|:::${CHECK_PORT}"; then
            HAS_PUBLIC_LISTEN=1
        else
            OUTER_ACCESS_MSG="端口${CHECK_PORT}未监听公网接口（仅内网/回环监听）"
        fi
    elif command -v ss >/dev/null 2>&1; then
        if ss -tuln | grep -E ":${CHECK_PORT}" | grep -E "0\.0\.0\.0:${CHECK_PORT}|:::${CHECK_PORT}|*${CHECK_PORT}"; then
            HAS_PUBLIC_LISTEN=1
        else
            OUTER_ACCESS_MSG="端口${CHECK_PORT}未监听公网接口（仅内网/回环监听）"
        fi
    else
        OUTER_ACCESS_MSG="无netstat/ss工具，无法检测端口监听状态"
    fi
fi

# 3. 检查防火墙是否允许外部访问目标端口
if [ ${HAS_PUBLIC_LISTEN} -eq 1 ]; then
    # 检查 ufw 命令是否存在
    if command -v ufw >/dev/null 2>&1; then
    	   # 获取 UFW 状态（处理权限/输出容错）
    	   UFW_RAW_STATUS=$(ufw status 2>/dev/null)
    	   if echo "${UFW_RAW_STATUS}" | grep -iw "active"; then
	       if ufw status | grep -E " ${CHECK_PORT}/tcp +ALLOW +Anywhere" || ufw status | grep -E " ${CHECK_PORT}/udp +ALLOW +Anywhere"; then
	           FIREWALL_ALLOWS=1
	       else
	           OUTER_ACCESS_MSG="ufw防火墙未放行${CHECK_PORT}端口"
	       fi
	   elif echo "${UFW_RAW_STATUS}" | grep -iw "inactive"; then
	       OUTER_ACCESS_MSG="ufw防火墙状态:关闭"
	   else
	       OUTER_ACCESS_MSG="ufw防火墙未知（无权限/输出异常）"
	   fi
    fi
    # 检查 firewall-cmd 命令是否存在
    if [ ${FIREWALL_ALLOWS} -eq 0 ]; then
        if command -v firewall-cmd >/dev/null 2>&1; then
            # 获取 firewalld 状态（处理权限/输出容错）
    	       FIREWALLD_RAW_STATUS=$(firewall-cmd --state 2>/dev/null)
    	       if [ "${FIREWALLD_RAW_STATUS}" = "running" ]; then
                if firewall-cmd --list-ports | grep -E "${CHECK_PORT}/tcp|${CHECK_PORT}/udp"; then
                    FIREWALL_ALLOWS=1
                else
                    OUTER_ACCESS_MSG="firewalld防火墙未放行${CHECK_PORT}端口"
                fi
            elif [ "${FIREWALLD_RAW_STATUS}" = "not running" ]; then
                OUTER_ACCESS_MSG="firewalld防火墙状态:关闭"
            else
                OUTER_ACCESS_MSG="firewalld防火墙未知（无权限/输出异常）"
            fi
        # 无防火墙工具时默认认为允许（仅兼容）
        else
            FIREWALL_ALLOWS=1
        fi
    fi
fi
printf "${OUTER_ACCESS_MSG}"

# 4. 外网实际可达性检测（核心新增逻辑）
if [ ${FIREWALL_ALLOWS} -eq 1 ]; then
    printf "  正在检测外网是否可访问 ${PUBLIC_IP}:${CHECK_PORT}...\n"
    
    # 方法1：nc检测（优先，Linux/macOS通用，加5秒超时）
    if command -v nc >/dev/null 2>&1; then
        NC_RESULT=$(nc -zvw 5 ${PUBLIC_IP} ${CHECK_PORT} 2>&1)
        if echo "${NC_RESULT}" | grep -q "succeeded\|open"; then
            OUTER_ACCESS=1
            OUTER_ACCESS_MSG="nc检测：外网可访问${PUBLIC_IP}:${CHECK_PORT}"
        else
            OUTER_ACCESS_MSG="nc检测失败：${NC_RESULT}"
        fi
    # 方法2：telnet检测（备选，加5秒超时）
    elif command -v telnet >/dev/null 2>&1; then
        # telnet超时处理（用timeout工具）
        if command -v timeout >/dev/null 2>&1; then
            TELNET_RESULT=$(timeout 5 telnet ${PUBLIC_IP} ${CHECK_PORT} 2>&1)
            if echo "${TELNET_RESULT}" | grep -q "Connected\|Escape character"; then
                OUTER_ACCESS=1
                OUTER_ACCESS_MSG="telnet检测：外网可访问${PUBLIC_IP}:${CHECK_PORT}"
            else
                OUTER_ACCESS_MSG="telnet检测失败：${TELNET_RESULT}"
            fi
        else
            OUTER_ACCESS_MSG="无timeout工具，跳过telnet检测"
        fi
    # 方法3：ssh调试（仅输出日志，不修改标记）
    elif command -v ssh >/dev/null 2>&1; then
        printf "  ssh调试检测（仅日志）：\n"
        ssh -v ${PUBLIC_IP} -p ${CHECK_PORT} 2>&1 | grep -E "Connection timed out|Connection refused|Connected" | head -n5
        OUTER_ACCESS_MSG="ssh调试需手动确认，暂标记为未知"
    # 方法4：在线API检测（无nc/telnet时兜底）
    elif command -v curl >/dev/null 2>&1; then
        # 4.1 IP138 API检测
        API1_RESULT=$(curl -s --connect-timeout 10 "http://ip138.com/ips138.asp?ip=${PUBLIC_IP}&port=${CHECK_PORT}&action=2" | grep -o '"result":"[^"]*' | cut -d'"' -f4)
        if [ "${API1_RESULT}" = "开放" ]; then
            OUTER_ACCESS=1
            OUTER_ACCESS_MSG="IP138 API检测：${PUBLIC_IP}:${CHECK_PORT} 开放"
        elif [ "${API1_RESULT}" = "关闭" ]; then
            OUTER_ACCESS_MSG="IP138 API检测：${PUBLIC_IP}:${CHECK_PORT} 关闭（安全组/路由拦截）"
        else
            # 4.2 站长工具API兜底
            API2_RESULT=$(curl -s --connect-timeout 10 "https://tool.chinaz.com/port/?host=${PUBLIC_IP}&port=${CHECK_PORT}" | grep -o '<div class="port-result">.*</div>' | sed 's/<[^>]*>//g')
            if echo "${API2_RESULT}" | grep -q "端口开放"; then
                OUTER_ACCESS=1
                OUTER_ACCESS_MSG="站长工具检测：${PUBLIC_IP}:${CHECK_PORT} 开放"
            else
                OUTER_ACCESS_MSG="在线API检测失败/端口关闭：${API2_RESULT}"
            fi
        fi
    else
        OUTER_ACCESS_MSG="无nc/telnet/curl工具，无法检测外网可达性"
    fi
fi

# 5. 综合最终判定
if [ ${HAS_PUBLIC_IP} -eq 1 ] && [ ${HAS_PUBLIC_LISTEN} -eq 1 ] && [ ${FIREWALL_ALLOWS} -eq 1 ] && [ ${OUTER_ACCESS} -eq 1 ]; then
    PASSIVE_ACCESS_STATUS="可被外部访问（${OUTER_ACCESS_MSG}）"
elif [ ${HAS_PUBLIC_IP} -eq 0 ]; then
    PASSIVE_ACCESS_STATUS="无有效公网IP，无法被外部直接访问"
elif [ ${HAS_PUBLIC_LISTEN} -eq 0 ]; then
    PASSIVE_ACCESS_STATUS="端口${CHECK_PORT}未监听公网接口（仅内网/回环）"
elif [ ${FIREWALL_ALLOWS} -eq 0 ]; then
    PASSIVE_ACCESS_STATUS="防火墙未允许外部访问端口${CHECK_PORT}"
elif [ ${OUTER_ACCESS} -eq 0 ]; then
    PASSIVE_ACCESS_STATUS="外网无法访问（${OUTER_ACCESS_MSG}，大概率是安全组/路由拦截）"
else
    PASSIVE_ACCESS_STATUS="检测异常：${OUTER_ACCESS_MSG}"
fi

# 构造IP信息（内网IP+公网IP+主动访问+接受访问）
IP_INFO="内网ip: ${INNER_IP} | 公网ip: ${PUBLIC_IP} | 主动访问: ${ACTIVE_ACCESS_STATUS} | 接受访问: ${PASSIVE_ACCESS_STATUS}"
printf "IP信息: %s\n" "${IP_INFO}"