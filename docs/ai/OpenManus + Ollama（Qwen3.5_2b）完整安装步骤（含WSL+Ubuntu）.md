# OpenManus + Ollama（Qwen3.5:2b）完整安装步骤（含WSL+Ubuntu）

说明：本步骤为Windows系统+WSL（Ubuntu）环境，最终实现本地Ollama（Qwen3.5:2b模型）运行，可通过Ollama自带网页界面、WSL脚本两种方式使用，全程对应实际操作，关键结果处留空填写。

## 一、前期准备（已完成）

1. Windows系统已开启WSL，并安装Ubuntu（版本：__________）

2. Windows系统已安装Ollama（版本：__________）

3. Ollama已下载Qwen3.5:2b相关模型（模型名称：__________，如qwen3.5:2b-instruct）

4. Ubuntu终端可正常访问，用户名：__________（如zhao_）

## 二、Ubuntu（WSL）环境配置步骤

### 步骤1：进入OpenManus目录（已下载源码）

终端执行命令：

```bash
cd ~/OpenManus
```

执行结果：终端路径变为：__________（如(venv) zhao_@wencong:~/OpenManus$）

### 步骤2：安装python3-venv（解决虚拟环境创建失败问题）

终端执行命令：

```bash
sudo apt install -y python3-venv
```

执行结果：输入Ubuntu密码（输入不显示），安装完成，无红色报错，提示：__________（如0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.）

### 步骤3：创建并激活虚拟环境

1. 创建虚拟环境，终端执行：

2. 激活虚拟环境，终端执行：

### 步骤4：安装依赖（解决torch缺失、flash-attn报错问题）

1. 单独安装torch（清华源，CPU版），终端执行：

2. 删除requirements.txt中flash-attn（CPU环境不支持），终端执行：

3. 安装剩余依赖，终端执行：

### 步骤5：创建启动脚本（run_ollama.py）

终端执行整段命令（生成可直接对话的脚本）：

```bash
cat > run_ollama.py << EOF
import requests
import json
import os

# 获取 Windows 主机 IP（WSL 访问 Windows 专用）
HOST_IP = os.popen("cat /etc/resolv.conf | grep nameserver | awk '{print \$2}'").read().strip()
OLLAMA_URL = f"http://{HOST_IP}:11434/api/chat"
MODEL_NAME = "qwen3.5:2b-instruct"

def chat_with_ollama(message):
    data = {
        "model": MODEL_NAME,
        "messages": [{"role": "user", "content": message}],
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=data, timeout=10)
        return response.json()["message"]["content"]
    except Exception as e:
        return f"连接错误：{str(e)}"

print("="*60)
print("🎉 本地 AI 助手已启动成功！")
print(f"✅ 模型：{MODEL_NAME}")
print(f"✅ 连接 Windows Ollama 成功")
print("❌ 输入 exit 退出")
print("="*60)

while True:
    user_input = input("\n你：")
    if user_input.lower() in ["exit", "quit"]:
        print("👋 再见！")
        break
    ai_response = chat_with_ollama(user_input)
    print(f"\nAI：{ai_response}")
EOF
```

执行结果：无报错，OpenManus目录下生成run_ollama.py文件，查看命令（ls）可看到：__________

## 三、Windows Ollama 配置（解决WSL连接失败问题）

### 步骤1：设置Ollama允许外部访问

1. 按Win+R，输入cmd，打开Windows命令提示符

2. 执行命令：

### 步骤2：重启Ollama服务

1. 右下角托盘找到Ollama小章鱼图标，右键 → 退出

2. 从Windows开始菜单，重新打开Ollama

3. 验证Ollama启动：命令提示符执行

## 四、启动并验证（两种使用方式）

### 方式1：WSL终端脚本启动（run_ollama.py）

1. 确保Ubuntu终端已激活虚拟环境（前缀有(venv)），路径在~/OpenManus

2. 执行启动命令：

3. 验证对话：输入“你好”，AI正常回复，结果：

### 方式2：Ollama自带网页界面（最简单）

1. Windows浏览器打开地址：

2. 下拉框选择模型（__________），输入对话内容，验证正常使用：__________

### 方式3：Open WebUI界面（可选，更美观）

1. Ubuntu终端执行安装命令（如未安装）：

2. Windows浏览器打开地址：

3. 配置Ollama地址：Settings → Models → 填写http://localhost:11434 → 刷新模型，选择__________模型，验证正常使用：__________

## 五、常见问题及解决方法

- 问题1：重启电脑后，Ollama无法连接 → 解决：重新打开Ollama（开始菜单找Ollama），重启后验证ollama list

- 问题2：WSL脚本提示连接错误 → 解决：重新执行Windows cmd命令setx OLLAMA_HOST 0.0.0.0，重启Ollama

- 问题3：Ollama list看不到模型 → 解决：执行ollama serve --reindex，重新扫描模型目录

- 问题4：依赖安装报错 → 解决：使用清华源（-i https://pypi.tuna.tsinghua.edu.cn/simple），添加--no-cache-dir参数

## 六、备注

1. 虚拟环境激活后，才能运行run_ollama.py，退出虚拟环境命令：deactivate

2. 所有安装文件、模型、脚本均已保存在本地，重启电脑后无需重装，只需重新启动Ollama和虚拟环境即可

3. 若需更换模型，修改run_ollama.py中的MODEL_NAME，或在网页界面直接选择其他已下载模型
> （注：文档部分内容可能由 AI 生成）