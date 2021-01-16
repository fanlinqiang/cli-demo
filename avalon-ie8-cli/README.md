## webpack4 + avalon 构建的适配IE8开发的cli
```bash
npm install
npm run dev
```

### 打包工具 `webpack4` 
[中文网](https://www.webpackjs.com/)

### 前端MVVM框架 `avalon 2` 
[官方文档](http://avalonjs.coding.me/)

### css预编译使用sass

### html预编译使用pug

### 工具类选用 `lodash 3.10.1` 
[lodash 3.10.1版本文档](https://lodash.com/docs/3.10.1#template)
>lodash 从4.0.0开始支持的环境有： <br/>
`Chrome 46-47, Firefox 42-43, IE 9-11, Edge 13, Safari 8-9, Node.js 0.10.x, 0.12.x, 4.x, & 5
.x, & PhantomJS 1.9.8` <br/> 
已不再支持IE6~IE8。
<br/>如果想兼容IE6~IE8，可以使用3.x版本。3.x版本支持的环境有： 
<br/>`Chrome 43-44, Firefox 38-39, IE 6-11, MS Edge, Safari 5-8, ChakraNode 0.12.2, io.js 2.5.0, Node.js 0.8.28, 0.10.40, & 0.12.7, PhantomJS 1.9.8, RingoJS 0.11, & Rhino1.7.6`
<br/>lodash 3.x 版本没有直接提供可用的js， 需要手动构建。 
<br/>安装 
<br/>`npm i -g lodash-cli@3.10.1` 
<br/>安装完成后执行 
<br/>`lodash compat` 
<br/>会输出兼容IE6~IE8的版本lodash.custom.js及lodash.custom.min.js
<br/>

### 网络请求选用 `jquery 1.8.3`[官方仓库](https://github.com/jquery/jquery)
>目前jQuery有三个大版本：
<br/>1.x：兼容ie678,使用最为广泛的，官方只做BUG维护，功能不再新增。因此一般项目来说，使用1.x版本就可以了，最终版本：1.12.4 (2016年5月20日)
<br/>2.x：不兼容ie678，很少有人使用，官方只做BUG维护，功能不再新增。如果不考虑兼容低版本的浏览器可以使用2.x，最终版本：2.2.4 (2016年5月20日)
<br/>3.x：不兼容ie678，只支持最新的浏览器。除非特殊要求，一般不会使用3.x版本的，很多老的jQuery插件不支持这个版本。目前该版本是官方主要更新维护的版本。


#### 解决`default` 、 `class`、`catch` ES3中保留字问题
在`webpack.base.conf.js`中引入`es3ify-loader`来处理ES3的兼容问题
```js
module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'es3ify-loader']
            }
        ]
    }
```
其功能主要是在保留字加上引号，使用字符串的形式引用，如：
```js
// 编译前
function(t) { return t.default; }
// 编译后
function(t) { return t["default"]; }
```

### ES5的API兼容报错
在 webpack 的 entry 入口文件top引入 es5-shim 问题解决
```js
require('es5-shim');
require('es5-shim/es5-sham');
```
这个方案编译后在IE8下报错了，错误信息貌似就是由`es5-shim`编译后引起的，暂且搁置

### 不支持Console.log
 在 webpack 的 entry 入口文件top引入 console-polyfill 问题解决
 ```js
require('console-polyfill');
```
 
参考：
[Webpack-IE低版本兼容指南](https://github.com/zuojj/fedlab/issues/5)
