const baseUrl = process.env.NODE_ENV === 'production' ? '/demo-platform/' : '/'
const url = 'https://www.cnblogs.com/fanlinqiang/'
const cookie = ''
module.exports = {
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
