# HuaStudio 类型骨架（Swift 元数据还原）

> 解析自 `__swift5_types` / `__swift5_fieldmd` / `__swift5_reflstr` 段，配合 `swift-demangle`

共 **206** 个类型描述符，其中 **189** 个带字段。

**可信度**：字段名 100% 准确；简单类型（String/Bool/Int/Double/Optional/数组/ObjC 类）已 demangle；复杂泛型的内层类型引用经过 linker 重定位，静态解析显示为 `?`。函数体不可恢复。

---

## enum（46）

### `CodingKeys`

```swift
enum CodingKeys {
    background   : ?
    padding      : ?
    radius       : ?
    shadow       : ?
    clickFx      : ?
    cursor       : ?
    cursorSize   : ?
    cursorSmooth : ?
    autoZoom     : ?
    zoomLevel    : ?
    motionBlur   : ?
    zoomSpeed    : ?
    canvasAspect : ?
    crop         : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    id         : ?
    title      : ?
    segments   : ?
    zoomSegs   : ?
    masks      : ?
    layoutSegs : ?
    audioSegs  : ?
    cfg        : ?
    camCfg     : ?
    audio      : ?
    beautify   : ?
    savedAt    : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    id            : ?
    createdAt     : ?
    width         : ?
    height        : ?
    durationMs    : ?
    hasAudio      : ?
    hasCam        : ?
    camOffsetMs   : ?
    sourceTitle   : ?
    cameraWarning : ?
    audioWarning  : ?
    audioGaps     : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    id       : ?
    start    : ?
    end      : ?
    x        : ?
    y        : ?
    w        : ?
    h        : ?
    style    : ?
    shape    : ?
    strength : ?
    colorHex : ?
}
```

### `Handle`

```swift
enum Handle {
    tl   : ?
    t    : ?
    tr   : ?
    r    : ?
    br   : ?
    b    : ?
    bl   : ?
    l    : ?
}
```

### `AppLanguage`

```swift
enum AppLanguage {
    zhHans : ?
    zhHant : ?
    en     : ?
    fr     : ?
    es     : ?
    ja     : ?
    ko     : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    show   : ?
    x      : ?
    y      : ?
    size   : ?
    shape  : ?
    mirror : ?
    ring   : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    holeCount    : ?
    holeFilledMs : ?
    overflowMs   : ?
    maxQueueMs   : ?
    maxDriftMs   : ?
    endDriftMs   : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    version    : ?
    durationMs : ?
    clicks     : ?
    apps       : ?
    speech     : ?
    silence    : ?
}
```

### `ExportAspect`

```swift
enum ExportAspect {
    wide     : ?
    tall     : ?
    portrait : ?
    photo    : ?
    source   : ?
    square   : ?
}
```

### `CameraError`

```swift
enum CameraError {
    noDevice     : ?
    noPermission : ?
    addFailed    : ?
    noFrames     : ?
    invalidFile  : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    id     : ?
    start  : ?
    end    : ?
    level  : ?
    points : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    id     : ?
    start  : ?
    end    : ?
    micVol : ?
    sysVol : ?
}
```

### `ExportResolution`

```swift
enum ExportResolution {
    p4k      : ?
    p2k      : ?
    p1080    : ?
    p720     : ?
    original : ?
}
```

### `State`

```swift
enum State {
    idle      : ?
    countdown : ?
    recording : ?
    paused    : ?
    saving    : ?
}
```

### `Tab`

```swift
enum Tab {
    frame  : ?
    camera : ?
    zoom   : ?
    cursor : ?
    audio  : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    x    : ?
    y    : ?
    w    : ?
    h    : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    id    : ?
    start : ?
    end   : ?
    mode  : ?
}
```

### `ExportError`

```swift
enum ExportError {
    writerFailed : String
    diagnosed    : String
    noVideoTrack : ?
    cancelled    : ?
}
```

### `ExportPreset`

```swift
enum ExportPreset {
    bilibili    : ?
    xiaohongshu : ?
    wechat      : ?
    gifClip     : ?
}
```

### `RecorderError`

```swift
enum RecorderError {
    writerFailed       : String
    notConfigured      : ?
    noFrames           : ?
    noMicrophoneFrames : ?
}
```

### `CamShape`

```swift
enum CamShape {
    circle : ?
    square : ?
    rect   : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    s     : ?
    e     : ?
    speed : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    t    : ?
    x    : ?
    y    : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    t    : ?
    x    : ?
    y    : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    t        : ?
    name     : ?
    bundleID : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    title      : ?
    paragraphs : ?
    marks      : ?
}
```

### `ExportFormat`

```swift
enum ExportFormat {
    mp4    : ?
    gif    : ?
    prores : ?
}
```

### `ExportFPS`

```swift
enum ExportFPS {
    source : ?
    f60    : ?
    f30    : ?
}
```

### `ExportPhase`

```swift
enum ExportPhase {
    pick    : ?
    working : ?
    done    : ?
}
```

### `ExportQuality`

```swift
enum ExportQuality {
    high     : ?
    standard : ?
    small    : ?
}
```

### `Flow`

```swift
enum Flow {
    editing   : ?
    launcher  : ?
    recording : ?
}
```

### `LayoutMode`

```swift
enum LayoutMode {
    both       : ?
    screenOnly : ?
    camOnly    : ?
}
```

### `RecordMode`

```swift
enum RecordMode {
    screen : ?
    window : ?
    region : ?
}
```

### `RecordSource`

```swift
enum RecordSource {
    display : SCDisplay
    window  : SCWindow
    region  : ?
}
```

### `ZoomDragMode`

```swift
enum ZoomDragMode {
    move        : ?
    resizeStart : ?
    resizeEnd   : ?
}
```

### `ZoomIntensity`

```swift
enum ZoomIntensity {
    calm   : ?
    normal : ?
    active : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    title      : ?
    paragraphs : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    micVol : ?
    sysVol : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    paragraph : ?
    ms        : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    cursor : ?
    clicks : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    s    : ?
    e    : ?
}
```

### `CodingKeys`

```swift
enum CodingKeys {
    mic  : ?
    sys  : ?
}
```

### `Item`

```swift
enum Item {
    sample  : ?
    silence : ?
}
```

### `MaskShape`

```swift
enum MaskShape {
    rect    : ?
    ellipse : ?
}
```

### `MaskStyle`

```swift
enum MaskStyle {
    solid    : ?
    pixelate : ?
}
```

## struct（108）

### `TimelineView`

```swift
struct TimelineView {
    _editor          : ?
    rulerH           : ?
    filmH            : ?
    waveH            : ?
    zoomH            : ?
    maskH            : ?
    blankH           : ?
    gapTop           : ?
    _scrubbing       : ?
    _scrubResume     : ?
    _selAnchor       : ?
    _hoveredZoomID   : ?
    _zoomDrag        : ?
    _cursorIsResize  : ?
    _lastZoomClickAt : ?
    _lastZoomClickX  : ?
    _maskDrag        : ?
    _hoveredMaskID   : ?
    _lastMaskClickAt : ?
    _lastMaskClickX  : ?
    _zoom            : ?
    _lastPinchScale  : ?
}
```

### `LauncherView`

```swift
struct LauncherView {
    _appState         : ?
    _recorder         : ?
    _recordings       : ?
    _mode             : ?
    _heroImage        : ?
    _showWindowPicker : ?
    _showLibrary      : ?
    _heroHover        : ?
    _heroTried        : ?
    _bracketInset     : ?
    _ctaGlow          : ?
    _updates          : ?
    _devices          : ?
    _heroImageKey     : ?
}
```

### `ProjectConfig`

```swift
struct ProjectConfig {
    background   : String
    padding      : Double
    radius       : Double
    shadow       : Double
    clickFx      : Bool
    cursor       : Bool
    cursorSize   : Double
    cursorSmooth : Double
    autoZoom     : Bool
    zoomLevel    : Double
    motionBlur   : Double
    zoomSpeed    : Double
    canvasAspect : String
    crop         : ?
}
```

### `CropSheet`

```swift
struct CropSheet {
    _editor         : ?
    _dismiss        : ?
    _crop           : ?
    _lockedRatio    : ?
    _ratioKey       : ?
    _alsoSetCanvas  : ?
    _regenerateZoom : ?
    _frame          : ?
    _previewMs      : ?
    _loading        : ?
    _frameRequest   : ?
    _frameGenerator : ?
    _dragOrigin     : ?
}
```

### `Project`

```swift
struct Project {
    id         : ?
    title      : String
    segments   : ?
    zoomSegs   : ?
    masks      : ?
    layoutSegs : ?
    audioSegs  : ?
    cfg        : ?
    camCfg     : ?
    audio      : ?
    beautify   : Bool
    savedAt    : ?
}
```

### `RecordingMeta`

```swift
struct RecordingMeta {
    id            : ?
    createdAt     : ?
    width         : Int
    height        : Int
    durationMs    : Double
    hasAudio      : Bool
    hasCam        : Bool
    camOffsetMs   : Double
    sourceTitle   : String
    cameraWarning : String?
    audioWarning  : String?
    audioGaps     : ?
}
```

### `MaskRegion`

```swift
struct MaskRegion {
    id       : ?
    start    : Double?
    end      : Double?
    x        : Double
    y        : Double
    w        : Double
    h        : Double
    style    : ?
    shape    : ?
    strength : Double
    colorHex : ?
}
```

### `ExportInput`

```swift
struct ExportInput {
    videoPB      : ?
    sourceTimeMs : Double
    cfg          : ?
    zoomSegs     : ?
    track        : ?
    camFrame     : ?
    camCfg       : ?
    layout       : ?
    masks        : ?
    maskTimeMs   : Double?
}
```

### `Input`

```swift
struct Input {
    videoFrame   : ?
    sourceTimeMs : Double
    cfg          : ?
    zoomSegs     : ?
    track        : ?
    camFrame     : ?
    camCfg       : ?
    layout       : ?
    masks        : ?
    hiQuality    : Bool
}
```

### `PlateKey`

```swift
struct PlateKey {
    w       : Int
    h       : Int
    bg      : String
    padding : Double
    radius  : Double
    shadow  : Double
    vw      : Int
    vh      : Int
    bgra    : Bool
}
```

### `CamConfig`

```swift
struct CamConfig {
    show   : Bool
    x      : Double
    y      : Double
    size   : Double
    shape  : ?
    mirror : Bool
    ring   : Bool
}
```

### `ExportOptions`

```swift
struct ExportOptions {
    aspect     : ?
    resolution : ?
    format     : ?
    fps        : ?
    quality    : ?
    useHEVC    : Bool
    clipRange  : ClosedRange<Double>?
}
```

### `InspectorView`

```swift
struct InspectorView {
    demoWallpaperExpanded : Bool
    _editor               : ?
    _tab                  : ?
    _customWallpapers     : ?
    _showCropSheet        : ?
    _wallpaperExpanded    : ?
    _zoomIntensity        : ?
}
```

### `SourceCard`

```swift
struct SourceCard {
    source      : ?
    label       : String
    isSelected  : Bool
    onSelect    : ()
    _recorder   : ?
    _image      : ?
    _thumbTried : ?
}
```

### `AudioGapStats`

```swift
struct AudioGapStats {
    holeCount    : Int
    holeFilledMs : Double
    overflowMs   : Double
    maxQueueMs   : Double
    maxDriftMs   : Double
    endDriftMs   : Double
}
```

### `ExportSheet`

```swift
struct ExportSheet {
    _editor       : ?
    _dismiss      : ?
    _options      : ?
    _preset       : ?
    _showAdvanced : ?
    _copiedDiag   : ?
}
```

### `LibraryCard`

```swift
struct LibraryCard {
    recording   : ?
    onOpen      : ()
    onDelete    : (())?
    highlighted : Bool
    _hovering   : ?
    _title      : ?
}
```

### `ModeCard`

```swift
struct ModeCard {
    icon      : String
    title     : String
    hint      : String
    selected  : Bool
    action    : ()
    _hovering : ?
}
```

### `RecordedTimeline`

```swift
struct RecordedTimeline {
    version    : Int
    durationMs : Double
    clicks     : ?
    apps       : ?
    speech     : ?
    silence    : ?
}
```

### `AudioSegment`

```swift
struct AudioSegment {
    id     : ?
    start  : Double
    end    : Double
    micVol : Double?
    sysVol : Double?
}
```

### `EditorView`

```swift
struct EditorView {
    recording         : ?
    _appState         : ?
    _editor           : ?
    _showAgentPrompt  : ?
    _showResetConfirm : ?
}
```

### `HUDLabel`

```swift
struct HUDLabel {
    text   : String
    size   : ?
    weight : ?
    mono   : Bool
    color  : NSColor
}
```

### `InspectorSliderRow`

```swift
struct InspectorSliderRow {
    label     : String
    _value    : ?
    range     : ClosedRange<Double>
    valueText : String
    why       : String?
}
```

### `Wallpaper`

```swift
struct Wallpaper {
    id          : String
    name        : String
    file        : String?
    fallbackHex : ?
    light       : Bool
}
```

### `ZoomFocusOverlay`

```swift
struct ZoomFocusOverlay {
    _editor        : ?
    seg            : ?
    canvasRect     : ?
    _scrollMonitor : ?
    _hovering      : ?
}
```

### `ZoomSegment`

```swift
struct ZoomSegment {
    id     : ?
    start  : Double
    end    : Double
    level  : Double?
    points : ?
}
```

### `CamTimelineKey`

```swift
struct CamTimelineKey {
    segs        : ?
    level       : Double
    speed       : Double
    cursorCount : Int
}
```

### `CMTime`

```swift
struct CMTime {
    value     : ?
    timescale : ?
    flags     : ?
    epoch     : ?
}
```

### `CropRect`

```swift
struct CropRect {
    x    : Double
    y    : Double
    w    : Double
    h    : Double
}
```

### `HSBreathingDot`

```swift
struct HSBreathingDot {
    color  : ?
    size   : ?
    active : Bool
    _dim   : ?
}
```

### `LauncherToggleRow`

```swift
struct LauncherToggleRow {
    icon     : String
    title    : String
    subtitle : String?
    _isOn    : ?
}
```

### `LayoutSegment`

```swift
struct LayoutSegment {
    id    : ?
    start : Double
    end   : Double
    mode  : ?
}
```

### `LibrarySheet`

```swift
struct LibrarySheet {
    _recordings : ?
    onOpen      : ?
    onDelete    : ?
    _dismiss    : ?
}
```

### `OnboardingView`

```swift
struct OnboardingView {
    onDone     : ()
    _blur      : ?
    _intensity : ?
    _demo      : ?
}
```

### `PlateEntry`

```swift
struct PlateEntry {
    plate      : ?
    ci         : CIImage
    corners    : ?
    cornerSide : ?
}
```

### `PrompterLabel`

```swift
struct PrompterLabel {
    text   : String
    size   : ?
    color  : NSColor
    weight : ?
}
```

### `ResizeGrip`

```swift
struct ResizeGrip {
    resize      : ?
    highlighted : Bool
    _last       : ?
    _hovering   : ?
}
```

### `RootView`

```swift
struct RootView {
    _appState         : ?
    _recorder         : ?
    _l10n             : ?
    _didOnboardMotion : ?
}
```

### `Scene`

```swift
struct Scene {
    id      : String
    summary : String
    size    : ?
    build   : ?
}
```

### `AppSwitch`

```swift
struct AppSwitch {
    t        : Double
    name     : String
    bundleID : String
}
```

### `CamShadowKey`

```swift
struct CamShadowKey {
    w     : Int
    h     : Int
    shape : ?
}
```

### `CapturePlan`

```swift
struct CapturePlan {
    filter     : SCContentFilter
    sourceRect : ?
    trackFrame : ?
}
```

### `CursorTimelineKey`

```swift
struct CursorTimelineKey {
    cursorCount : Int
    clickCount  : Int
    smooth      : Double
}
```

### `EditSegment`

```swift
struct EditSegment {
    s     : Double
    e     : Double
    speed : Double
}
```

### `HuaStudioApp`

```swift
struct HuaStudioApp {
    _appDelegate : ?
    _appState    : ?
    _recorder    : ?
}
```

### `InspectorToggleRow`

```swift
struct InspectorToggleRow {
    label : String
    _isOn : ?
    why   : String?
}
```

### `LayoutWeights`

```swift
struct LayoutWeights {
    screen : Double
    cam    : Double
    hero   : Double
}
```

### `MaskOverlay`

```swift
struct MaskOverlay {
    _editor    : ?
    canvasRect : ?
    demoMasks  : ?
}
```

### `MotionSample`

```swift
struct MotionSample {
    a    : Double
    b    : Double
    c    : Double
}
```

### `PlayheadIndicator`

```swift
struct PlayheadIndicator {
    _clock : ?
    total  : Double
    width  : ?
}
```

### `Range3`

```swift
struct Range3 {
    start : Double
    end   : Double
    vol   : Double
}
```

### `RecordedScript`

```swift
struct RecordedScript {
    title      : String
    paragraphs : [String]
    marks      : ?
}
```

### `Recording`

```swift
struct Recording {
    id     : ?
    folder : ?
    meta   : ?
}
```

### `TeleprompterView`

```swift
struct TeleprompterView {
    _state        : ?
    resize        : ?
    _dropTargeted : ?
}
```

### `TimelineKey`

```swift
struct TimelineKey {
    intensity : ?
    level     : Double
    speed     : Double
}
```

### `TrackPoint`

```swift
struct TrackPoint {
    t    : Double
    x    : Double
    y    : Double
}
```

### `ViewfinderCorners`

```swift
struct ViewfinderCorners {
    inset  : ?
    length : ?
    color  : ?
}
```

### `ZoomPoint`

```swift
struct ZoomPoint {
    t    : Double
    x    : Double
    y    : Double
}
```

### `AgentPromptPopover`

```swift
struct AgentPromptPopover {
    recording : ?
    onCopied  : ()
}
```

### `AudioConfig`

```swift
struct AudioConfig {
    micVol : Double
    sysVol : Double
}
```

### `AudioEnvelope`

```swift
struct AudioEnvelope {
    bucketMs : Double
    values   : [Float]
}
```

### `AudioGapReport`

```swift
struct AudioGapReport {
    mic  : ?
    sys  : ?
}
```

### `CameraFloatView`

```swift
struct CameraFloatView {
    layer : AVCaptureVideoPreviewLayer
    shape : ?
}
```

### `CGPoint`

```swift
struct CGPoint {
    x    : ?
    y    : ?
}
```

### `CGRect`

```swift
struct CGRect {
    origin : ?
    size   : ?
}
```

### `CGSize`

```swift
struct CGSize {
    width  : ?
    height : ?
}
```

### `HSIcon`

```swift
struct HSIcon {
    name : String
    size : ?
}
```

### `HSPanel`

```swift
struct HSPanel {
    radius : ?
    fill   : ?
}
```

### `HSPrimaryButtonStyle`

```swift
struct HSPrimaryButtonStyle {
    enabled   : Bool
    _hovering : ?
}
```

### `PrompterText`

```swift
struct PrompterText {
    _state   : ?
    editable : Bool
}
```

### `ScriptMark`

```swift
struct ScriptMark {
    paragraph : Int
    ms        : Double
}
```

### `Span`

```swift
struct Span {
    s    : Double
    e    : Double
}
```

### `TeleprompterScript`

```swift
struct TeleprompterScript {
    title      : String
    paragraphs : [String]
}
```

### `TrackData`

```swift
struct TrackData {
    cursor : ?
    clicks : ?
}
```

### `TransportActionStyle`

```swift
struct TransportActionStyle {
    tint      : ?
    _hovering : ?
}
```

### `TransportTimecode`

```swift
struct TransportTimecode {
    _clock  : ?
    totalMs : Double
}
```

### `AppMark`

```swift
struct AppMark {
    size : ?
}
```

### `AVVideoCodecType`

```swift
struct AVVideoCodecType {
    _rawValue : NSString
}
```

### `CameraPreviewView`

```swift
struct CameraPreviewView {
    session : AVCaptureSession
}
```

### `CIContextOption`

```swift
struct CIContextOption {
    _rawValue : NSString
}
```

### `CLIError`

```swift
struct CLIError {
    description : String
}
```

### `CMTimeFlags`

```swift
struct CMTimeFlags {
    rawValue : ?
}
```

### `DeviceType`

```swift
struct DeviceType {
    _rawValue : NSString
}
```

### `DocumentReadingOptionKey`

```swift
struct DocumentReadingOptionKey {
    _rawValue : NSString
}
```

### `EditingCommands`

```swift
struct EditingCommands {
    _appState : ?
}
```

### `HSGhostButtonStyle`

```swift
struct HSGhostButtonStyle {
    _hovering : ?
}
```

### `HUDView`

```swift
struct HUDView {
    _recorder : ?
}
```

### `Key`

```swift
struct Key {
    _rawValue : NSString
}
```

### `MainWindowCommands`

```swift
struct MainWindowCommands {
    _openWindow : ?
}
```

### `MotionTimeline`

```swift
struct MotionTimeline {
    samples : ?
}
```

### `Name`

```swift
struct Name {
    _rawValue : NSString
}
```

### `NSDeviceDescriptionKey`

```swift
struct NSDeviceDescriptionKey {
    _rawValue : NSString
}
```

### `Preset`

```swift
struct Preset {
    _rawValue : NSString
}
```

### `PreviewLayerHostView`

```swift
struct PreviewLayerHostView {
    previewLayer : AVCaptureVideoPreviewLayer
}
```

### `PrompterSection`

```swift
struct PrompterSection {
    _state : ?
}
```

### `PropertyKey`

```swift
struct PropertyKey {
    _rawValue : NSString
}
```

### `RailButtonStyle`

```swift
struct RailButtonStyle {
    _hovering : ?
}
```

### `ReadingOptionKey`

```swift
struct ReadingOptionKey {
    _rawValue : NSString
}
```

### `RecordingStatusView`

```swift
struct RecordingStatusView {
    _recorder : ?
}
```

### `SCStreamFrameInfo`

```swift
struct SCStreamFrameInfo {
    _rawValue : NSString
}
```

### `SettingsView`

```swift
struct SettingsView {
    _l10n : ?
}
```

### `StageLayerHost`

```swift
struct StageLayerHost {
    model : ?
}
```

### `StageLoadingOverlay`

```swift
struct StageLoadingOverlay {
    _stage : ?
}
```

### `StageView`

```swift
struct StageView {
    _editor : ?
}
```

### `TransportPlayButton`

```swift
struct TransportPlayButton {
    _playback : ?
}
```

### `URLResourceKey`

```swift
struct URLResourceKey {
    _rawValue : NSString
}
```

### `Weight`

```swift
struct Weight {
    rawValue : ?
}
```

### `WhyText`

```swift
struct WhyText {
    text : String
}
```

## class（35）

### `RecorderController`

```swift
class RecorderController {
    _state                         : ?
    awakeActivity                  : ?
    _countdownRemaining            : ?
    _camOn                         : ?
    _camShape                      : ?
    _micOn                         : ?
    _camDeviceID                   : ?
    _micDeviceID                   : ?
    _sysAudioOn                    : ?
    _includeMenuBar                : ?
    _errorMessage                  : ?
    _screenPermissionMissing       : ?
    _screenPermissionNeedsRelaunch : ?
    _elapsedText                   : ?
    _micLevel                      : ?
    _micSilent                     : ?
    _micTrackFailed                : ?
    micHadInterruption             : Bool
    micHealthEpoch                 : Double
    _camTrackFailed                : ?
    _displays                      : ?
    _windows                       : ?
    _source                        : ?
    hasPickedSourceOnce            : Bool
    appState                       : ?
    screenRecorder                 : ?
    cursorTracker                  : ?
    cameraRecorder                 : ?
    micCapture                     : ?
    hud                            : ?
    camFloat                       : ?
    prompter                       : ?
    prompterState                  : ?
    cameraPreview                  : ?
    countdownTimer                 : NSTimer?
    beginTask                      : ?
    cameraHadInterruption          : Bool
    folder                         : ?
    micStarted                     : Bool
    elapsedTimer                   : NSTimer?
    startHost                      : Double
    pauseBegan                     : Double
    pausedTotal                    : Double
    thumbCache                     : ?
    appSwitches                    : ?
    appSwitchObserver              : ?
    bag                            : ?
    prompterHotKeys                : ?
}
```

### `EditorState`

```swift
class EditorState {
    recording                  : ?
    track                      : ?
    _project                   : ?
    revision                   : Int
    stage                      : ?
    clock                      : ?
    _selectedZoomID            : ?
    _selectedMaskID            : ?
    _statusMessage             : ?
    statusWorkItem             : ?
    renderer                   : ?
    $__lazy_storage_$_playback : ?
    saveWorkItem               : ?
    undo                       : ?
    _audioEnvelope             : ?
    lastSyncedData             : ?
    isApplyingExternal         : Bool
    folderWatcher              : ?
    reloadWorkItem             : ?
    zoomDragSnapshotted        : Bool
    zoomDragOrigins            : ?
    maskTimeDragOrigin         : ?
    maskDragOrigin             : ?
    cameraDragActive           : Bool
    _exportProgress            : ?
    _exportError               : ?
    _exportDiagnostics         : ?
    _showExportSheet           : ?
    _exportPhase               : ?
    exporter                   : ?
    lastExportURL              : ?
    _selection                 : ?
    _thumbnails                : ?
    thumbnailTask              : ?
}
```

### `ScreenRecorder`

```swift
class ScreenRecorder {
    outputURL            : ?
    pixelSize            : ?
    screenStartHost      : Double?
    durationMs           : Double
    stream               : SCStream?
    writer               : AVAssetWriter?
    videoInput           : AVAssetWriterInput?
    micInput             : AVAssetWriterInput?
    sysInput             : AVAssetWriterInput?
    videoRetimer         : ?
    micRetimer           : ?
    sysRetimer           : ?
    micFiller            : ?
    sysFiller            : ?
    micAudioStats        : ?
    sysAudioStats        : ?
    captureQueue         : OS_dispatch_queue
    sessionStarted       : Bool
    writtenVideoFrames   : Int
    captureFailure       : ?
    lastMicWrittenHost   : Double
    isPaused             : Bool
    pauseBeganHost       : Double
    pausedTotal          : Double
    lastVideoPTS         : Double
    firstVideoHost       : Double?
    micEnabled           : Bool
    systemAudioEnabled   : Bool
    micFirstPTS          : Double?
    sysFirstPTS          : Double?
    firstVideoPTSSeconds : Double?
}
```

### `PlaybackController`

```swift
class PlaybackController {
    _isPlaying        : ?
    _masterDurationMs : ?
    editor            : ?
    player            : AVPlayer?
    screenOutput      : AVPlayerItemVideoOutput?
    camPlayer         : AVPlayer?
    camOutput         : AVPlayerItemVideoOutput?
    playIdx           : Int
    seeking           : Bool
    timer             : NSTimer?
    displayLink       : CADisplayLink?
    renderSize        : ?
    lastScreenImage   : ?
    lastScreenPB      : ?
    lastCamImage      : ?
    lastCamPB         : ?
    camSeekInFlight   : Bool
    lastCamSyncHost   : Double
    lastRenderKey     : (playhead: Double, revision: Int, playing: Bool)?
    previewScale      : ?
    renderCostEMA     : Double
    scaleEvalTick     : Int
    perfWindowStart   : Double
}
```

### `CameraRecorder`

```swift
class CameraRecorder {
    session         : AVCaptureSession?
    isRunning       : Bool
    firstPTSSeconds : Double?
    previewLayer    : AVCaptureVideoPreviewLayer?
    onFailure       : ((_:))?
    onRecovery      : (())?
    failureReported : Bool
    frameWatchdog   : ?
    lastWrittenHost : Double
    stalled         : Bool
    writtenFrames   : Int
    writeQueue      : OS_dispatch_queue
    writer          : AVAssetWriter?
    writerInput     : AVAssetWriterInput?
    dataOutput      : AVCaptureVideoDataOutput?
    retimer         : ?
    isPaused        : Bool
    pauseBeganHost  : Double
    pausedTotal     : Double
}
```

### `DriveState`

```swift
class DriveState {
    lock                  : NSLock
    firstError            : ?
    videoDone             : Bool
    audioDone             : Bool
    frameIndex            : Int
    lastScreen            : ?
    bufferedScreen        : ?
    screenEOF             : Bool
    lastCamImage          : ?
    lastCamPTS            : Double
    bufferedCam           : ?
    wallStart             : Double
    tDecode               : Double
    tRender               : Double
    tAppend               : Double
    bufPool               : Int
    bufManual             : Int
    camReaderFailedLogged : Bool
    audioPTSMs            : Double
}
```

### `TeleprompterState`

```swift
class TeleprompterState {
    _enabled           : ?
    _script            : ?
    _fontSize          : ?
    _interactive       : ?
    _edgeHover         : ?
    _temporarilyHidden : ?
    _recording         : ?
    marks              : ?
    recordingStartHost : Double?
    _scrollTarget      : ?
    _scrollTick        : ?
    _pageIndex         : ?
    _pageCount         : ?
    currentOffset      : Double
    viewportHeight     : Double
    contentHeight      : Double
    lineHeight         : Double
    topParagraph       : Int
}
```

### `CursorTracker`

```swift
class CursorTracker {
    cursor         : ?
    clicks         : ?
    moveMonitor    : Any?
    downMonitor    : Any?
    pollTimer      : NSTimer?
    startHost      : Double
    contentFrame   : ?
    lastSampleHost : Double
    lastButtons    : Int
    minInterval    : Double
    isPaused       : Bool
    pauseBeganHost : Double
    pausedTotal    : Double
}
```

### `SceneRenderer`

```swift
class SceneRenderer {
    ciContext                      : CIContext
    wallpaperCache                 : ?
    $__lazy_storage_$_cursorSprite : ?
    renderCtxCache                 : ?
    plateCache                     : ?
    camShadowCache                 : ?
    camKey                         : ?
    camTimeline                    : ?
    curKey                         : ?
    curTimeline                    : ?
    ciColorSpace                   : ?
}
```

### `AudioGapFiller`

```swift
class AudioGapFiller {
    stats           : ?
    maxQueueSeconds : Double
    queue           : ?
    queuedSeconds   : Double
    backlogSeconds  : Double
    nextPosition    : Double?
    lastAcceptedEnd : Double?
    failed          : Bool
}
```

### `OnboardingDemoRenderer`

```swift
class OnboardingDemoRenderer {
    renderer    : ?
    content     : ?
    ciContext   : CIContext
    segsCache   : ?
    timelineKey : ?
    timeline    : ?
    canvas      : ?
}
```

### `StatusItemController`

```swift
class StatusItemController {
    item         : NSStatusItem?
    recorder     : ?
    appState     : ?
    cancellables : ?
    menu         : NSMenu
    toggleItem   : NSMenuItem
    recentMenu   : NSMenu
}
```

### `CameraPreview`

```swift
class CameraPreview {
    session      : AVCaptureSession
    _ready       : ?
    _failure     : ?
    deviceID     : String?
    wantsRunning : Bool
    sessionQueue : OS_dispatch_queue
}
```

### `Coordinator`

```swift
class Coordinator {
    state      : ?
    lastTick   : Int
    lastFont   : ?
    isEditing  : Bool
    scrollView : weak NSScrollView?
    debounce   : ?
}
```

### `GlobalHotKey`

```swift
class GlobalHotKey {
    onTrigger  : (())?
    handlerRef : ?
    registered : ?
    nextID     : ?
}
```

### `MicCapture`

```swift
class MicCapture {
    session  : AVCaptureSession?
    queue    : OS_dispatch_queue
    onSample : ?
    onLevel  : ((_:))?
}
```

### `RegionSelectView`

```swift
class RegionSelectView {
    displayID : ?
    picker    : ?
    dragStart : ?
    current   : ?
}
```

### `CaptureDeviceList`

```swift
class CaptureDeviceList {
    _cameras  : ?
    _mics     : ?
    observers : ?
}
```

### `RegionPicker`

```swift
class RegionPicker {
    windows  : [NSWindow]
    onDone   : ?
    onCancel : (())?
}
```

### `TeleprompterController`

```swift
class TeleprompterController {
    panel     : NSPanel?
    state     : ?
    edgeTimer : NSTimer?
}
```

### `AppState`

```swift
class AppState {
    _flow           : ?
    _lastRecordedID : ?
}
```

### `L10n`

```swift
class L10n {
    _language : ?
    _override : ?
}
```

### `SampleRetimer`

```swift
class SampleRetimer {
    firstPTS       : ?
    lastOutSeconds : Double
}
```

### `StageLayerModel`

```swift
class StageLayerModel {
    layer       : CALayer
    _hasContent : ?
}
```

### `CameraFloatController`

```swift
class CameraFloatController {
    panel : NSPanel?
}
```

### `HostView`

```swift
class HostView {
    content : CALayer
}
```

### `HUDController`

```swift
class HUDController {
    panel : NSPanel?
}
```

### `PlayheadClock`

```swift
class PlayheadClock {
    _ms  : ?
}
```

### `PreviewNSView`

```swift
class PreviewNSView {
    previewLayer : AVCaptureVideoPreviewLayer
}
```

### `PrompterPanel`

```swift
class PrompterPanel {
    allowsKey : Bool
}
```

### `PrompterTextView`

```swift
class PrompterTextView {
    onFileDrop : ?
}
```

### `RecordingStore`

```swift
class RecordingStore {
    root : ?
}
```

### `RegionPickerWindow`

```swift
class RegionPickerWindow {
    onEscape : (())?
}
```

### `UpdateChecker`

```swift
class UpdateChecker {
    _latest : ?
}
```

### `VideoExporter`

```swift
class VideoExporter {
    cancelled : Bool
}
```

## 无字段描述符（17）

```
AudioTimeline  CFString  CGColorSpace  CGContext  CGImage  CMFormatDescription  CMSampleBuffer  CVBuffer  HSStageBackground  HSToggleStyle  HuaStudioAppDelegate  ResourceBundleClass  ShotStudio        
```
