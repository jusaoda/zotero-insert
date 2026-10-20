# zotero-insert

Zotero 划词中文翻译插件。当前版本 **1.2.1**，适用于 Zotero 10.0.x。

## 功能

- 在 PDF 和阅读模式中选中英文，自动翻译为简体中文。
- 免费模式：MyMemory，无需 API Key。
- AI 模式：DeepSeek 官方 API 或上海交通大学模型服务。
- 交大模型快捷选项：`deepseek-chat`、`deepseek-reasoner`、`minimax-m2.7`、`qwen3.6-27b`。
- 识别并保留数学公式片段；AI 返回后校验公式占位符。
- 按住译文顶部“⋮⋮ 拖动移动”，可移动浮窗；右下角可以调整宽度和高度。

## 安装

下载仓库中的 [selection-zh-1.2.1.xpi](releases/selection-zh-1.2.1.xpi)，在 Zotero 中打开：

工具 → 插件 → 齿轮菜单 → Install Plugin From File…，选择下载的 `.xpi`。

## 配置

Zotero → 设置（macOS：⌘ + ,）→ 划词中文翻译。

1. 选择免费模式或 AI 模式。
2. AI 模式下选择服务来源和模型，填写对应 API Key。
3. 点击“保存设置”，重新选择英文即可生效。
4. 可点击“保存并测试 AI 翻译”检查连接。

各服务分别保存 API Key，存储在本机 Zotero 密码管理器中。源码和安装包均不包含个人 Key。留空会保留已保存的 Key，可单独清除当前服务的 Key。

免费模式向 MyMemory 发送选文；AI 模式向所选模型服务发送选文。费用与额度以服务方为准，不会自动切换服务。每次最多选中 4000 字符，不会自动上传整篇 PDF。

## 打包

需要 Python 3，无额外依赖：

```sh
python3 build.py
```

生成的安装包位于 `dist/`。修改版本时同步更新 `manifest.json`。

## 验证与限制

已实际验证：Zotero 安装、模式切换、Key 保存与清除、DeepSeek 官方和交大 `deepseek-chat` 翻译、浮窗移动及双向缩放。交大的其他模型选项尚未逐一实测。

复杂公式识别采用启发式规则；PDF 提取的上下标可能变成普通文本，需核对原文。插件暂不提供自动更新，可用新版 XPI 手动升级。
