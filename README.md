# lhg-hua-studio

> **HuaStudio（花录）1.8 逆向分析**：8 MB 原生 SwiftUI 录屏剪辑工具的完整结构与算法还原。
> 附带 7 分钟深度使用录像、189 个类型骨架、自动缩放算法常数、以及「Agent 剪辑」的实现机制。

**接手请先读 [HANDOFF.md](HANDOFF.md)。** 5 分钟建立全景，包含结论、坑、TODO。

---

## 这是什么

HuaStudio 是 Mac App Store 上一款 8.1 MB 的录屏美化工具，功能和 Screen Studio 同类，但技术路线完全不同：**它是原生 SwiftUI，不是 Electron**。

本仓库是它的逆向分析产物——不是反编译代码（编译型语言做不到），而是**结构级还原**：类型骨架、参数、算法、UI、产品设计。

| 项 | 值 |
|---|---|
| 目标 | HuaStudio 1.8 · alchain.HuaStudio · Mac App Store |
| 二进制 | 5.6 MB universal（x86_64 + arm64），已 strip |
| 链接框架 | SwiftUI 7.2.5 · ScreenCaptureKit · AVFoundation · CoreImage · Combine |
| 解析手段 | Mach-O 段解析 + Swift 5 ABI 元数据 + Vision OCR |
| 产出 | 189 个类型（字段名 100%）、25 个配置项、5 份分析文档、7 分钟录像 |

---

## 三个可以直接用的结论

**① 自动缩放的时间常数**

~~~
缩放开始 = 第一次点击时刻 − 450 ms
缩放结束 = 最后一次点击时刻 + 1500 ms
~~~

误差 0.0ms，从真实录制数据反推。配套默认：倍率 1.6 / 速度 0.9 / 运动模糊 0.08 / 留白 10.5% / 圆角 20 / 阴影 0。

**② 它用 1/30 的体积做到了 Screen Studio 80% 的能力**

8.1 MB vs 245 MB。核心差距不在功能，在**工程选择**：原生 vs Electron、AVFoundation vs ffmpeg、够用 vs 堆满。

**③ 「Agent 剪辑」不是内置 AI，是提示词生成器**

app 生成一段结构化提示词 → 用户粘给任意 AI → AI 通过 CLI 读写 project.json → 编辑器热重载。
**它没做 AI 功能，它做了「让 AI 能用的接口」。**

---

## 目录

~~~
.
├── README.md               ← 你在这里
├── HANDOFF.md              ★ 交接说明（结论 / 坑 / TODO / 怎么继续）
├── AGENTS.md               给 AI Agent 的工作守则
├── llms.txt                LLM 索引（llmstxt.org 规范）
│
├── analysis/
│   ├── HuaStudio-RE.md         逆向总报告：技术栈、二进制解剖
│   ├── HuaStudio-RUNTIME.md    运行时解剖：真实 JSON、算法反推、音频监控
│   ├── HuaStudio-UI.md         界面解剖：三层结构、五个面板、文案范式
│   ├── types.md                189 个 Swift 类型骨架
│   └── strings.md              CLI 参数 / 配置项 / 文件格式 / API 痕迹
│
├── data/
│   ├── swift-types.json        机器可读类型数据
│   └── cli-idle.json           CLI 输出示例（剪辑建议）
│
├── tools/                      8 个可复现脚本（Node + Swift）
│
└── media/
    ├── session-2026-10-24-hua-studio-usage.mp4   7:08 深度使用录像
    └── frames/                                    关键帧 + 剪辑前后对比
~~~

---

## 快速开始

~~~bash
# 如果你有 HuaStudio 装着
HS="/Applications/HuaStudio.app/Contents/MacOS/HuaStudio"
"$HS" cli                    # 完整命令表
"$HS" cli describe           # 看最新录制
"$HS" cli idle <id>          # 剪辑建议（quietSpans 最安全）

# 如果你想复现分析
node tools/macho.cjs
node tools/swift-meta.cjs
node tools/gen-types.cjs
~~~

---

## 边界

这是**学习研究用**的逆向产物。可以学：架构、算法、参数、产品设计、提示词工程。
不要搬：assets 里的壁纸图片、图标、字体（各有版权）。

---

*生成于 2026-10-24 · 分析对象版本 1.8 · 仅用于架构学习研究*
