# AGENTS.md — 给 AI Agent 的工作守则

你在读一个**逆向分析仓库**，不是源码仓库。
这里没有可编译的代码，只有**对已编译产物的结构还原** + 可复现的分析脚本。

---

## 开工前必读

1. **[HANDOFF.md](HANDOFF.md)** —— 三条结论、五个坑、TODO 清单
2. **[analysis/HuaStudio-RE.md](analysis/HuaStudio-RE.md)** —— 技术栈与方法

读完这两份，你就知道哪些已经做完、哪些不用重做。

---

## 三条硬规则

### 规则 1：不要重新做逆向

类型骨架、参数、算法常数、UI 结构、CLI 用法——**全都已经挖完了**。
先读 [HANDOFF.md](HANDOFF.md) 的「已完成」清单。重复劳动会浪费几个小时。

### 规则 2：区分「确定」和「推断」

本仓库的结论分三档，引用时必须标明：

| 档 | 例子 | 可信度 |
|---|---|---|
| **实测** | 450ms / 1500ms / 1.6 / 0.105 | 从真实数据反推，误差 0.0 |
| **ABI 还原** | 189 个类型的字段名 | Swift 元数据硬编码，100% 准确 |
| **推断** | 某个方法"大概做什么" | 从名字和上下文猜的，可能错 |

说「实测发现」和说「推测可能是」，读者会按不同权重采信。别混。

### 规则 3：字段名可信，函数体不可知

类型骨架里 `Project.id : UUID` 是**真的**（Swift 把字段名写死在 reflstr 段）。
但 `ZoomIntensity { calm, normal, active }` 具体怎么映射到倍率——**不知道**，因为函数体是机器码。

要回答"怎么实现的"，得上反汇编（Hopper / Ghidra），别从名字脑补。

---

## 要动手时

### 想分析新版本

~~~bash
node tools/macho.cjs        # 确认结构没变
node tools/swift-meta.cjs   # 重新解析类型
node tools/gen-types.cjs    # 生成 types.md
~~~

### 想用 HuaStudio 的 CLI 剪片

先跑 `"$HS" cli` 拿完整命令表，注意三个坑（[HANDOFF.md](HANDOFF.md) 有详述）：

1. 入口是 `cli`，不是 `--help`
2. `describe` / `idle` 输出的是**源毫秒**，改写要加 `--source`
3. 产物落在沙盒容器，`--out` 会被忽略

### 想验证 UI 结论

录像在 `media/session-2026-10-24-hua-studio-usage.mp4`（7:08）。
抽帧 + OCR 全在 `tools/`：ffmpeg 抽帧 → `ocr.swift`（Vision 框架，中文识别准确）。

---

## 输出风格

- 引用参数时带数值和出处：**「倍率 1.6（project.json 实测）」** 而不是「倍率约 1.6」
- 引用类型时带原始 mangled 名：**`Project`（struct，12 字段）**
- 不确定就写「未验证」，不要用「通常」「一般」糊过去

---

## 一句话

**结论研究完了，别重复劳动；要深入就上反汇编，别从名字脑补。**
