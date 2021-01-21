# vue-cli4

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



# cli版本及配置

- `@vue/cli 4.5.10`
- preset:([source](https://github.com/fanlinqiang/cli-demo/tree/master/vue-cli4/preset))


## 配置pug

```
npm i pug pug-plain-loader pug-loader pug-filters -D
```

## 配置全局sass变量及css中的静态资源路径

```js
// vue.config.js
const baseUrl = process.env.NODE_ENV === 'production' ? '/demo-platform/' : '/'

module.exports = {
    // 静态资源路径
    publicPath: baseUrl,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                prependData: `
                    $baseUrl: "${baseUrl}"
                    @import "~@/assets/css/_global-variables.sass"
                `
            },
            scss: { // 建议统一种格式
                // @/ 是 src/ 的别名
                prependData: `
                    $baseUrl: "${baseUrl}";
                    @import "~@/assets/css/_global-variables.sass";
                `
            }
        }
    }
}
```
在sass中使用示例：
```sass
// favicon.ico在public下
background: $color-primary url($baseUrl + 'favicon.ico')
```
同理在vue中绑定静态资源路径
```js
// main.js
Vue.prototype.$baseUrl
```

## css相关
在`src/assets/css`中分别设置了:
- `_global-variables.sass`,定义全局sass变量(mixin等)
- `_reset.sass`,用来重置默认样式，这里引入[normalize.css](https://github.com/necolas/normalize.css)
> `npm install --save normalize.css`

- `_common.sass`用来配置常用的一些样式
_ `_index.sass`, 整合样式

> 在sass文件中引入css文件缺省扩展名即可，例：`@import "CSS:~normalize.css/normalize"`或 `@import "~normalize.css/normalize"`
