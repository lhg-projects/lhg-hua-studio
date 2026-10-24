# HuaStudio 字符串与配置清单

> 来源：Mach-O 二进制全量 strings（43,895 条）+ __cstring 段（2,044 条）+ __objc_methname（602 条）

---

## 一、CLI 参数（内置命令行接口）

~~~
--diagnose-camera       摄像头诊断
--diagnose-recording    录制诊断
--langs                 列出支持语言
--mic <id>              指定麦克风
--out <path>            输出路径
--size <WxH>            输出尺寸
--pause <ms>            暂停
--second <n>            秒数
--shots <path>          截图
--missing-device        缺设备场景模拟
--smoke-                自测总开关
--smoke-crop            裁剪自测
--smoke-mask            遮罩自测
--smoke-prompter        提词器自测
--smoke-timeline        时间轴自测
~~~

smoke 系列说明作者写了 UI 自动化冒烟测试——一个 8 MB 的工具做到这个程度，工程纪律很好。

---

## 二、配置项（25 个，全部可调）

### 摄像头
~~~
cam.mirror     镜像开关
cam.ring       环形边框
cam.show       是否显示
cam.size       尺寸
cam.shape      形状（circle/square/rect）
cam.x  cam.y   位置
~~~

### 光标
~~~
cursor          光标样式
cursorSize      大小
cursorSmooth    平滑度
clickFx         点击特效
motionBlur      运动模糊
~~~

### 缩放（核心）
~~~
autoZoom        自动缩放开关
zoomLevel       缩放倍率
zoomSpeed       缩放速度
~~~

### 音频
~~~
micVol          麦克风音量
sysVol          系统音量
silenceSpans    静音段（自动跳过）
quietSpans      轻声段
~~~

### 画面
~~~
background      背景
aspect          画幅（16:9 / 9:16 / 1:1 / 4:5 / source）
padding         内边距
radius          圆角
shadow          阴影
beautify        美化总开关
~~~

---

## 三、项目文件结构

~~~
<project>/
├── project.json          主项目文件
├── project.json.bak      自动备份
├── timeline.json         时间轴
├── track.json            轨道
├── script.json           提词稿
├── meta.json             元信息
├── poster.jpg            封面
├── preview.*             预览
├── crop.png              裁剪蒙版
└── mask.png              遮罩蒙版
~~~

配套 key：project.H / project.L（高/低质量两档？）、studio.hua.capture / studio.hua.export.audio / studio.hua.export.render（导出三段式：音频 → 渲染 → 合成）。

---

## 四、权限引导深链

~~~
x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture
x-apple.systempreferences:com.apple.preference.security?Privacy_Camera
~~~

---

## 五、选项文案（直接暴露产品决策）

~~~
画幅：  16:9 / 9:16 / 1:1 / 4:5 / source
帧率：  30 / 60 / source
分辨率：4k / 2k / 1080p / 720p / original
体积提示：About half the size, but may not play on older devices
GIF 档：12fps / 15fps
~~~

注意「source」这个选项——保持原始分辨率/帧率，不做二次编码。对质量敏感用户的正确默认。

---

## 六、UI 文案样本

### 缩放与光标
~~~
Acercar en cada clic          （西语：每次点击放大）
Ajouter un zoom               （法语：添加缩放）
Add a mask
You can manually pick part of the video that will be zoomed in
~~~

### 录制
~~~
Drag over the film strip
Aucune image de l'écran
~~~

### 授权
~~~
Activa HuaStudio en Ajustes del Sistema, luego cierra y vuelve a abrir
~~~

### 隐私
~~~
100% on-device
100 % en local
~~~

### 导出
~~~
About half the size, but may not play on older devices
Also set canvas ratio
~~~

---

## 七、系统 API 使用痕迹（ObjC selectors）

~~~
captureOutput:didOutputSampleBuffer:fromConnection:      AVCaptureVideoDataOutput 回调
captureOutput:didDropSampleBuffer:fromConnection:        丢帧处理（有做）
startCaptureWithCompletionHandler:
setActiveVideoMinFrameDuration: / setActiveVideoMaxFrameDuration:
setAlwaysDiscardsLateVideoFrames:                        背压策略
videoSupportedFrameRateRanges                            帧率能力探测
isContinuityCamera                                       支持 iPhone 连续互通相机
setExcludesCurrentProcessAudio:                          录制时排除自己的提示音
addGlobalMonitorForEventsMatchingMask:handler:           全局事件监听（点击/按键）
crosshairCursor / resizeLeftRightCursor                  自定义光标
beginActivityWithOptions:reason:                         防休眠
initWithAudioTracks:audioSettings:                       AVAssetWriter 音频轨
render:toCVPixelBuffer:bounds:colorSpace:                CoreImage 离屏渲染
~~~

**这组 selector 就是完整技术方案**：AVCaptureSession 采集 → CVPixelBuffer → CoreImage 渲染 → AVAssetWriter 编码。全程不走 ffmpeg，纯 AVFoundation。

---

## 八、语言支持

en / es / fr / ja / ko / zh-Hans / zh-Hant（7 套）

InfoPlist.strings 只有权限说明（每种 540 B），其余 UI 文案全部硬编码在 Swift 里。

---

## 九、网络请求

**只有 1 个**：

~~~
https://itunes.apple.com/lookup
~~~

App Store 版本检查。无遥测、无上传、无账号体系。真正意义上的本地工具。
