# Lowes-News-Mobile
[Lowes-News](https://github.com/yyh1102/Lowes-News) 移动端

Powered by React-Native

## 开发笔记

### 环境部署
- Android环境配置：
  - 需要安装SDK platform 23,24,25。
  - 环境变量ANDROID_HOME和JAVA_HOME都要设置正确
- 经初步体验，Android的坑比IOS多太多了。

### RN
- Image
  - require的路径中不能出现变量，否则将提示```unknown named module```。RN只支持获取静态的图片资源。一个解决方案是:
  ```
  let icon=require('...')   //静态图片资源
  <TabBar icon={icon} />
  ```
  - 必须使用https的图片路径，即使```Allow Arbitrary Loads```为YES
也无效。
- 文本必须被```<Text>```包裹。
- 没有```text-align```样式。建议用flexbox布局。
- 对于```<View>```,```<Text>```等不含有onPress属性的标签，可通过被```<TouchableHighligh>```等标签包裹来实现触摸事件。
- 允许Http请求
  - 打开Xcode，找到项目下的info.plist
  - 找到App Transport Security Settings(ATS)
  - 添加```Allow Arbitrary Loads```为```YES```
  - 添加```Allow Arbitrary Loads in Web Content```为```YES```
  - **注：该方法对Image无效。**
- 部分组件(Image,WebView等)，宽度不会自动扩展至100%，须自行添加样式，否则会看不到效果。

### Antd-mobile
- TabBar
  - 在RN下，对icon属性值的说明不准确——不是Image引入，而是直接require即可。

### 引入第三方库
- **目前请务必使用npm安装**。cnpm安装会带入大量带版本号的包，有可能和RN生成的包产生冲突。