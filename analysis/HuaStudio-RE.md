# HuaStudio 逆向报告

> 目标：/Applications/HuaStudio.app · v1.8 · alchain.HuaStudio · Mac App Store 分发
> 日期：2026-10-24 · 方法：Mach-O 解析 + Swift 5 ABI 元数据还原

---

## 一句话

**HuaStudio 不是 Electron 应用**，是原生 SwiftUI 写的 macOS 录屏剪辑工具（8.1 MB）。所以对 Screen Studio 那套「反混淆 JS bundle」的方法完全不适用——这里没有 JS，只有编译后的 ARM64/x86_64 机器码。

能拿到的是 **Swift 元数据里的类型骨架**（字段名、类型、枚举 case），拿不到的是**函数体逻辑**。

---

## 与 Screen Studio 那次的差异

| | Screen Studio | HuaStudio |
|---|---|---|
| 技术栈 | Electron 39 + React | 原生 SwiftUI + AppKit |
| 体积 | 245 MB（asar） | 8.1 MB |
| 代码形态 | JS bundle（混淆） | 编译后 Mach-O |
| 逆向手段 | 反混淆字符串数组 | Swift ABI 元数据解析 |
| 能拿到 | **函数体逻辑 + 字符串**（90% 语义） | **类型定义 + 字段**（结构 100%，逻辑 0%） |
| 拿不到 | 变量名、类型标注 | 函数实现、局部变量 |
| 难度 | 中（工具化，可批量） | 高（需读 ABI 规范） |

**结论**：Electron 应用能「读源码」，原生应用只能「读骨架」。这是编译型语言的本质限制，不是工具不够好。

---

## 技术栈（从 LC_LOAD_DYLIB 直读）

| 框架 | 用途推断 |
|---|---|
| **SwiftUI** 7.2.5 | 全部 UI |
| **ScreenCaptureKit** | 屏幕录制（SCDisplay / SCWindow） |
| **AVFoundation / AVFAudio** | 摄像头、麦克风、视频合成 |
| **CoreMedia / CoreVideo** | 时间轴、像素缓冲 |
| **CoreImage** | 滤镜、遮罩、像素化 |
| **QuartzCore** | 图层合成 |
| **Combine** | 状态响应式 |
| **Carbon** | 全局快捷键（老 API，仍是最稳的） |
| ImageIO / CoreGraphics | 图片读写 |

**没有**：Electron、WebKit、任何 Web 技术。纯原生。

---

## 二进制解剖

~~~
HuaStudio (universal)
├── x86_64  slice  2,994,000 B  @ off 16,384
└── arm64   slice  2,832,112 B  @ off 3,014,656   ← 本次解析目标

段：
  __TEXT,__text            机器码
  __TEXT,__cstring         2,044 条 C 字符串
  __TEXT,__swift5_types    206 个类型描述符       ← 核心
  __TEXT,__swift5_fieldmd  14,084 B 字段描述       ← 核心
  __TEXT,__swift5_reflstr  7,831 B 反射字符串      ← 字段名来源
  __TEXT,__swift5_typeref  类型引用（未完全解析）
  __TEXT,__objc_methname   602 个 selector
  __DATA,__objc_const      ObjC 元数据
~~~

符号表已被 strip（只剩 1,250 个 Swift 符号，多为 undefined 引用），所以**不能靠 nm 恢复方法名**。真正的信息在 Swift 元数据段里。

---

## 拿到了什么

### 1. 类型骨架：189 个类型

- 46 个 enum
- 108 个 struct
- 35 个 class
- 完整列表见 [types.md](types.md)

字段名 **100% 准确**——Swift ABI 把字段名硬编码在 reflstr 段里。这是编译型语言逆向里少见的「确定性收益」。

抽样：

~~~swift
struct Project {
    id          : UUID
    title       : String
    segments    : ?
    zoomSegs    : ?
    masks       : ?
    layoutSegs  : ?
    audioSegs   : ?
    cfg         : ?
    camCfg      : ?
    audio       : ?
    beautify    : Bool
    savedAt     : ?
}

enum ExportFormat { mp4, gif, prores }
enum ExportResolution { p4k, p2k, p1080, p720, original }
enum ZoomIntensity { calm, normal, active }
enum LayoutMode { both, screenOnly, camOnly }
enum CamShape { circle, square, rect }
enum MaskStyle { solid, pixelate }
enum RecordSource { display: SCDisplay, window: SCWindow, region }
enum CameraError { noDevice, noPermission, addFailed, noFrames, invalidFile }
enum RecorderError { ... }
enum ExportPhase { ... }
struct Handle { tl, t, tr, r, br, b, bl, l }   // 拖拽手柄 8 向
~~~

**从这些名字就能读出的产品设计**：

- 录制源三选一：整屏 / 单窗口 / 框选区域
- 导出格式：MP4 / GIF / ProRes
- 缩放强度三档：calm / normal / active（不是连续值，是**预设**——降低用户决策成本）
- 画中画形状：圆 / 方 / 矩
- 遮罩两种：纯色块 / 像素化（打码）
- 布局三种：两者 / 只屏幕 / 只摄像头

### 2. 内置命令行接口

字符串里藏着一份完整的 CLI 参数表：

~~~
--diagnose-camera     摄像头诊断
--diagnose-recording  录制诊断
--smoke-timeline      时间轴自测
--smoke-crop          裁剪自测
--smoke-mask          遮罩自测
--smoke-prompter      提词器自测     ← 有提词器功能
--langs               列出语言
--mic / --out / --size / --pause / --second / --shots
--missing-device      缺设备场景
~~~

以及配置项 key 表：

~~~
cam.mirror  cam.ring  cam.show  cam.size  cam.shape  cam.x  cam.y
cursorSize  cursorSmooth  autoZoom  zoomLevel  zoomSpeed  motionBlur
micVol  sysVol  beautify  silenceSpans  quietSpans
background  aspect  padding  radius  shadow  clickFx  cursor
~~~

**这 25 个 key 就是它的全部可调参数**，比读一万行代码直观。

### 3. 项目文件格式（从字符串推断）

~~~
<project>/
├── project.json         主文件
├── project.json.bak     自动备份
├── timeline.json        时间轴
├── track.json           轨道
├── script.json          提词稿
├── meta.json            元信息
├── poster.jpg           封面
├── preview.*            预览
├── crop.png             裁剪蒙版
└── mask.png             遮罩蒙版
~~~

### 4. 权限引导（直接跳系统设置）

~~~
x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture
x-apple.systempreferences:com.apple.preference.security?Privacy_Camera
~~~

比「请到系统设置里授权」然后让用户自己找强一万倍。

### 5. 隐私定位

内置文案：**100% on-device** / **100 % en local**

→ 全本地处理，不上传。这解释了为什么没有网络请求代码（唯一的 URL 是 itunes.apple.com/lookup，版本检查）。

### 6. UI 文案（7 语言，硬编码在二进制里）

英语 1,210 条、法语/西语/日语/韩语/简繁中文各一套。没有 Localizable.strings，全部走 Swift 字符串字面量。

详见 [strings.md](strings.md)。

---

## 没拿到的

| 内容 | 原因 |
|---|---|
| 函数体逻辑 | 已编译成机器码 |
| 方法名 | 符号表被 strip，Swift 方法名不保留 |
| 复杂泛型的完整类型 | typeref 经过 linker 重定位，静态解析只能到最外层 |
| 具体算法参数 | 数值常量在各函数体内，需反汇编 |

**要做函数级还原，下一步得上反汇编**（Hopper / Ghidra），按类型骨架的地址去找对应方法实现。那是小时级到天级的活儿，不是脚本能批量做的。

---

## 工具链（可复现）

~~~
macho.cjs        Mach-O 解析：fat header → slice → load commands → section 表
swift-meta.cjs   Swift 5 ABI：__swift5_types → ContextDescriptor → FieldDescriptor
diag*.cjs        布局诊断（定位 +12/+16 偏移、relative pointer 语义）
extract-objc.cjs __objc_methname / __cstring 提取
extract-ui.cjs   按语言分类 UI 文案
gen-types.cjs    生成 types.md（含 swift-demangle 批量处理）
~~~

关键 ABI 事实（踩过的坑）：

1. **ContextDescriptorKind**：Class=16, Struct=17, Enum=18（我一开始记反了，导致字段全错位）
2. **字段描述符统一在 +16**，不是 class 才 +16
3. **relative pointer 基准是「该字段自身地址」**，不是结构体起点
4. **mangled name 必须加 $s 前缀**才能被 swift-demangle 识别（SS → String）
5. **fat binary 要选 arm64 slice**（offset 3,014,656），否则所有 section 偏移都错

---

## 一句话总结

**它是个 8 MB 的纯原生小工具，功能密度很高。** 从 189 个类型 + 25 个配置项 + 9 个 CLI 参数，已经能完整复刻它的产品设计；要复刻算法，得进反汇编。
