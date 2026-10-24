# 交接说明 · HuaStudio（花录）逆向分析

> 接手的人或 AI，读这一份就够了。5 分钟建立全景。
> 项目日期：2026-10-24 · 目标版本：HuaStudio 1.8（Mac App Store）

---

## 一句话现状

**分析已完成 80%。** 拿到了完整类型骨架、全部可调参数、自动缩放算法的两个核心常数、完整 UI 结构与「Agent 剪辑」的实现机制。剩下的是函数级反汇编（可选）。

---

## 三条硬结论（可以直接引用）

### 结论 1：它不是 Electron，是原生 SwiftUI

8.1 MB 单二进制，universal（x86_64 + arm64），技术栈从 LC_LOAD_DYLIB 直读：

~~~
SwiftUI 7.2.5 · ScreenCaptureKit · AVFoundation · CoreImage · Combine · Carbon
~~~

**没有 Web 技术、没有 Electron、没有 ffmpeg。** 录制链路纯 AVFoundation：
AVCaptureSession → CVPixelBuffer → CoreImage → AVAssetWriter。

> 所以 Screen Studio 那套「反混淆 JS bundle」的方法完全不适用。这里用的是 Mach-O + Swift ABI 元数据解析。

### 结论 2：自动缩放的两个核心常数

从真实录制数据反推，误差 0.0ms：

~~~
缩放开始 = 第一次点击时刻 − 450 ms
缩放结束 = 最后一次点击时刻 + 1500 ms
~~~

- **450ms 提前量**：点下去才开始缩放，人眼会觉得「卡半拍」。提前让缩放在点击**发生前**推进。
- **1500ms 退出延迟**：点完立刻拉回会打断阅读。

配套默认值：倍率 **1.6**、速度 **0.9**、运动模糊 **0.08**、留白 **10.5%**、圆角 **20**、阴影 **0**。

**这五个数字就是「专业感」和「业余感」的分界线。**

### 结论 3：「Agent 剪辑」没有内置 AI

它只做一件事：**生成一段提示词**。

~~~
用户点「Agent 剪辑」→ app 生成提示词（录制元信息 + 完整 CLI 表 + 领域经验）
→ 用户粘给任意 AI → AI 通过 cli 子命令读写 project.json
→ 编辑器实时热重载 → 用户 ⌘Z 可撤回
~~~

**本质：它没做 AI 功能，它做了「让 AI 能用的接口」。**

四件事加起来不到 100 KB 代码：可脚本化的 CLI + 非破坏数据层（.bak）+ 写给模型看的说明书 + 实时反馈界面。就让 8 MB 的工具接上了全世界所有模型。

---

## 文档地图

| 文件 | 内容 | 什么时候看 |
|---|---|---|
| [analysis/HuaStudio-RE.md](analysis/HuaStudio-RE.md) | 逆向总报告：技术栈、二进制解剖、拿到了什么 | 第一次接手 |
| [analysis/HuaStudio-RUNTIME.md](analysis/HuaStudio-RUNTIME.md) | 运行时解剖：真实项目 JSON、缩放算法反推、音频监控 | 想知道参数从哪来 |
| [analysis/HuaStudio-UI.md](analysis/HuaStudio-UI.md) | 界面解剖：三层结构、五个面板、文案范式、Agent 剪辑机制 | 想复刻产品 |
| [analysis/types.md](analysis/types.md) | **189 个 Swift 类型骨架**（字段名 100% 准确） | 想写同构代码 |
| [analysis/strings.md](analysis/strings.md) | CLI 参数、25 个配置项、项目文件格式、API 痕迹 | 想知道能调什么 |

数据：[data/swift-types.json](data/swift-types.json)（机器可读）、[data/cli-idle.json](data/cli-idle.json)（示例输出）

影像：[media/session-2026-10-24-hua-studio-usage.mp4](media/session-2026-10-24-hua-studio-usage.mp4) —— 7 分 08 秒的深度使用录像（1104×720 @60fps）
关键帧：[media/frames/](media/frames/) —— 编辑器全貌 / 美化面板 / 导出弹窗 / 剪辑前后对比

---

## 工具链

全部可复现，不依赖联网。

~~~bash
node tools/macho.cjs              # Mach-O 解析：fat → slice → load commands → section 表
node tools/swift-meta.cjs         # Swift 5 ABI：swift5_types → ContextDescriptor → FieldDescriptor
node tools/gen-types.cjs          # 生成 types.md（含 swift-demangle 批处理）
node tools/extract-objc.cjs       # objc_methname / cstring 提取
node tools/extract-ui.cjs         # 按语言分类 UI 文案
node tools/extract-cli.cjs        # CLI 参数 / 配置项提取
node tools/analyze-recording.cjs  # 分析录制产物（光标 / 点击 / 缩放段）
swiftc -O tools/ocr.swift -o ocr -framework Vision -framework AppKit   # 中文 OCR
~~~

输入：/Applications/HuaStudio.app/Contents/MacOS/HuaStudio（fat binary，脚本会自动选 arm64 slice）

---

## 已完成 / 未完成

### 已完成

- 二进制结构、段布局、链接框架
- 206 个类型描述符 → 189 个带字段（字段名 100% 准确）
- 全部 25 个配置项 + 9 个 CLI 参数名
- 项目文件格式（project.json / timeline.json / track.json / meta.json）
- 缩放算法两个常数（450 / 1500）+ 中心偏移规律
- 音频队列健康度指标的含义
- 完整 UI 结构与四平台导出预设
- Agent 剪辑的实现机制
- CLI 剪辑实战一次（剪 12.2s / 加速 2 段 / 加运镜 1 段 / 导出 B 站版）

### 未完成（可选，需要时再做）

| 项 | 方法 | 成本 |
|---|---|---|
| 复杂泛型的完整类型 | 写 typeref 解析器（当前 40% 显示为 ?） | 半天 |
| 函数体逻辑 | Hopper / Ghidra 反汇编，按 types.md 的地址定位 | 数天 |
| 「原始」视图差异 | 逐帧 diff 两视图 | 1 小时 |
| 打码的拖拽交互 | 观察 Handle 8 向的行为 | 1 小时 |
| Agent 提示词是模板还是动态填充 | 对比两次生成的提示词 | 10 分钟 |
| 导出编码参数选择逻辑 | 多次导出 + ffprobe 对比 | 1 小时 |

---

## 坑（踩过的，别再踩）

### Swift ABI 五条

1. **ContextDescriptorKind 编码**：Class=16、Struct=17、Enum=18。**我一开始记反了，导致 46 个类型全错位。**
2. **字段描述符统一在 +16**，不是「只有 class 才 +16」。
3. **relative pointer 的基准是「该字段自身的地址」**，不是结构体起点。
4. **mangled name 必须加 $s 前缀**才能被 swift-demangle 识别（SS → $sSS → String）。
5. **fat binary 要选 arm64 slice**（offset 3,014,656），否则所有 section 偏移都错。

### CLI 三条

1. **入口是 cli 位置参数**，不是 --help。直接跑 --help 会静默启动 GUI 并卡住。
2. **--range 默认是 master（成片）时间轴**，加 --source 才是源时间轴。describe 和 idle 输出的都是**源毫秒**——不加 --source 会剪错地方。
3. **产物落在沙盒容器**，--out 的绝对路径会被忽略：
   ~/Library/Containers/alchain.HuaStudio/Data/Library/Application Support/HuaStudio/Exports/

### 其他

- 编辑器开着时 CLI 改动会**实时热重载**，用户能 ⌘Z 撤回——这是设计，不是 bug。
- 改观感前确认 describe 里「美化:开」，否则渲帧看不到效果。
- 二进制符号被 strip（只剩 1,250 个 Swift 符号，多为 undefined），**别指望 nm 恢复方法名**。

---

## 怎么继续

如果是 AI agent 接手，第一步：

~~~bash
HS="/Applications/HuaStudio.app/Contents/MacOS/HuaStudio"
"$HS" cli describe                      # 看最新录制
"$HS" cli idle <id>                     # 拿剪辑建议（quietSpans 最安全）
"$HS" cli                                # 完整命令表
~~~

如果是人接手想复刻产品，读顺序：

~~~
1. analysis/HuaStudio-UI.md        ← 产品长什么样
2. analysis/HuaStudio-RUNTIME.md   ← 参数是什么、算法怎么算
3. analysis/types.md               ← 数据结构怎么写
4. analysis/HuaStudio-RE.md        ← 技术栈选型
~~~

如果是人接手想继续逆向，从上面「未完成」表里挑一项。

---

## 边界

这是**学习研究用**的逆向产物。可以学：架构、算法、参数、产品设计、提示词工程。
不要搬：assets 里的壁纸 jpg、图标、字体（各有版权）。

详见 [analysis/HuaStudio-UI.md](analysis/HuaStudio-UI.md) 与 README 的边界一节。
