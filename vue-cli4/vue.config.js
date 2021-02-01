const baseUrl = process.env.NODE_ENV === 'production' ? '/demo-platform/' : '/'
const url = 'https://www.cnblogs.com/fanlinqiang/'
const cookie = process.env.VUE_APP_COOKIE // .env.development.local中定义VUE_APP_COOKIE=xxx
module.exports = {
    // 不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 静态资源路径
    publicPath: baseUrl,
    devServer: {
        disableHostCheck: true, // 用于配置是否关闭用于DNS重绑定的HTTP请求的host检查
        host: '0.0.0.0',
        // port: 9994,
        port: 8080,
        open: true, // 是否默认打开浏览器
        openPage: '', // 默认打开的页面地址
        proxy: {
            // '/api/center': {
            //     target: url,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api/center': '/api/fanlinqiang'
            //     },
            //     onProxyReq: function (proxyReq, req, res) {
            //         cookie && proxyReq.setHeader('cookie', cookie);
            //     }
            // },
            ...[
                '/api',
                '/test'
            ].reduce((res, key) => {
                res[key] = {
                    target: url,
                    changeOrigin: true,
                    onProxyReq: function (proxyReq, req, res) {
                        cookie && proxyReq.setHeader('cookie', cookie)
                    }
                }
                return res
            }, {})
        }
    },
    // CSS 相关
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
