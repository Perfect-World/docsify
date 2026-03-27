
i5-12450H + 16GB 内存 + Intel 核显 128MB
结论：完全可以本地跑 AI 大模型，但只能跑轻量化小模型，不能跑 7B 级别的大模型。

本地大模型运行引擎（Ollama）+ 国产开源大模型（Qwen2）   免费
ai工具OpenManus
**Ollama（本地大模型运行引擎）
国产开源大模型 Qwen3（通义千问 3，阿里）
AI 工具 OpenManus（AI 自动化 / 智能体）**

i5-12450H + 16GB 内存 + Intel 核显
Qwen3 1.5B / 2B / 3B 版本 → 完美流畅运行
Ollama → 完美支持 CPU 推理
OpenManus → 能对接 Ollama 本地模型

本地聊天、问答、写作、总结
代码解释、简单编程
本地知识库（不联网）
AI 自动化（OpenManus）
对接各种软件（本地 API）
完全隐私，数据不离开你电脑

ollama version is 0.18.3
setx OLLAMA_MODELS "D:\devconf\OllamaModels"
用 ollama run 下载的所有模型，都会自动存在 D:\OllamaModels，不会占 C 盘。

https://ollama.com/library/qwen3.5:9b
ollama run qwen3.5:9b

内网穿透

