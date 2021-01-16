# vue-cordova-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 使用vue-cli-plugin-cordova将Cordova集成到Vue Cli应用程序中

> 使用详见[vue-cli-plugin-cordova](https://github.com/m0dch3n/vue-cli-plugin-cordova)

### 版本
```
cordova: 9.0.0 (cordova-lib@9.0.1)
@vue/cli: 4.5.3
vue: 2.6.11
```
### 可能会用到的工具
```
npm i -g ios-deploy --unsafe-perm=true
```

### 相关链接

* [cordova中文网](http://cordova.axuer.com/docs/zh-cn/latest/)

### 修改 `vue.config.js`

#### 添加配置调试配置

```js
module.exports ={
    // 不添加在ios上调试时会启动白屏
    devServer: {
        https: false
    }
}
```

#### 添加h5打包模式

`package.json`中scripts中增加：
```json
{
   scripts: {
      ... ...
      "h5-build": "vue-cli-service build --mode h5"
      ... ...
   }
}
```
项目根目录下增加文件`.env.h5`

```
NODE_ENV=production
VUE_APP_FOR_H5=true
```
`vue.config.js`文件中配置对应的访问路径

```js
const isEnvH5 = !!process.env.VUE_APP_FOR_H5
module.exports = {
  publicPath: isEnvH5 ? '/demo/' : '',
  pluginOptions: isEnvH5 ? {} : {
    cordovaPath: 'src-cordova'
  }
}
```


### cordova常用插件

#### 白名单插件cordova-plugin-whitelist

> 详见：https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist/

#### 获取设备信息插件cordova-plugin-device

> 详见：https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/

#### 状态栏插件cordova-plugin-statusbar

> 详见：https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/index.html

#### 读取应用程序的版本cordova-plugin-app-version
> 详见：https://github.com/sampart/cordova-plugin-app-version

#### 打开应用内浏览器窗口(或者系统默认浏览器)cordova-plugin-inappbrowser
> 详见：https://github.com/apache/cordova-plugin-inappbrowser

#### 控制应用程序的启动屏幕cordova-plugin-splashscreen
> 详见：https://github.com/apache/cordova-plugin-splashscreen

可使用插件[cordova-res](https://github.com/ionic-team/cordova-res)快速生成icon及splash


##### 适配ihonex类型

#### iOS11 新增特性，Webkit 的一个 CSS 函数，用于设定安全区域与边界的距离，有四个预定义的变量：

* safe-area-inset-left：安全区域距离左边边界距离
* safe-area-inset-right：安全区域距离右边边界距离
* safe-area-inset-top：安全区域距离顶部边界距离
* safe-area-inset-bottom：安全区域距离底部边界距离

> 注意：当 viewport-fit=contain 时 env() 是不起作用的，必须要配合 viewport-fit=cover 使用。对于不支持env() 的浏览器，浏览器将会忽略它。

#### 适配步骤

1. 设置网页在可视窗口的布局方式
```html
<!-- 新增 viweport-fit 属性，使得页面内容完全覆盖整个窗口,只有设置了 viewport-fit=cover，才能使用 env()-->
<meta name="viewport" content="width=device-width, viewport-fit=cover">
```
2. 页面主体内容限定在安全区域内

根据实际页面场景选择，如果不设置这个值.例：可能存在小黑条遮挡页面最底部内容的情况
```css
body {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
```
或使用 `@supports` 隔离兼容样式

```css
@ supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
    div {
        margin-bottom: constant(safe-area-inset-bottom);
        margin-bottom: env(safe-area-inset-bottom);
    }
}
```

#### 使用更快的WKWebView替代UIWebView cordova-plugin-wkwebview-engine

> WKWebView 在性能方面比 UIWebview显著的快，且苹果从2020年4月开始不允许基于UIWebView的App提交，后续全部需要使用WKWebView详见： https://github.com/apache/cordova-plugin-wkwebview-engine#readme
> WkWebview启动的index.html不能访问http/https请求，需要结合cordova-plugin-wkwebview-file-xhr，此插件是oracle开发，拦截所有wkwebview请求，利用原生的方式请求http/https（默认只拦截https，如果需要拦截http，需要config.xml中配置 <preference name="InterceptRemoteRequests" value="all" />）。
还有，模拟器下的wkwebview是可以显示file://路径的本地图片文件的，但是真机下只能显示 Tmp 目录下的图片文件，所以如果你有下载、显示本地图片的，需要更换文件目录为 Tmp目录。
> 注：Tmp 目录是 file:///var/mobile/Containers/Data/Applications/<GUID of app>/tmp/用 cordova.file.tempDirectory 常量可以得到这个目录

#### 点击物理回退按键时的响应cordova-plugin-backbutton

> 详见：https://github.com/mohamed-salah/phonegap-backbutton-plugin
> 实例：https://blog.csdn.net/jiangxuexuanshuang/article/details/88684699

### android 生成keystore和签名相关
```
// 生成 keystore,需谨记密钥口令，后续打包都需要用到
keytool -genkey -v -keystore demo.keystore -alias demo.keystore -keyalg RSA -keysize 2048 -validity 36500

// 签名
参见 build_android_release.sh
```
#### 执行打包
```
cd src-cordova
cordova platform rm android
cordova platform add android
./build_android_release.sh
```

apk加固：[https://jiagu.360.cn/#/app/android](https://jiagu.360.cn/#/app/android)

> 可选推荐服务中仅选择支持X86平台即可

加固后的apk需重新对齐签名，将加固后的apk放至src-cordova文件夹下，执行`resign_encrypted_apk.sh`

### 对一些插件的修改

1. `src-cordova/plugins/cordova-plugin-wkwebview-engine/src/ios/CDVWKWebViewEngine.m`

```
configuration.mediaPlaybackAllowsAirPlay = [settings cordovaBoolSettingForKey:@"MediaPlaybackAllowsAirPlay" defaultValue:YES];
// line:79  fix http limit,
[configuration.preferences setValue:@YES forKey:@"allowFileAccessFromFileURLs"];
    if (@available(iOS 10.0, *)) {
         [configuration setValue:@YES forKey:@"allowUniversalAccessFromFileURLs"];
    }
return configuration;
```


### 一些错误的记录

#### `command not found: zipalign` on build android apk

1. 查看当前zipalign目录

```
find ~/Library/Android/sdk/build-tools -name "zipalign"
```
2. 在`.bashrc`中添加命令路径，例：

```
# add zipalign
export PATH="$PATH:$HOME/Library/Android/sdk/build-tools/28.0.3"
```

3. 即时生效

```
source .bashrc
```
