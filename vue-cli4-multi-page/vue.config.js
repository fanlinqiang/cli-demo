const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const baseUrl = process.env.NODE_ENV === 'production' ? './' : '/'
const url = 'https://www.cnblogs.com/fanlinqiang/'
const cookie = process.env.VUE_APP_COOKIE // .env.development.local中定义VUE_APP_COOKIE=xxx
module.exports = {
    pages: {
        // pc端
        index: {
            // page 的入口
            entry: 'src/pc/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page'
        },
        // 移动端
        phone: {
            entry: 'src/phone/main.js',
            template: 'public/phone.html',
            filename: 'phone.html',
            title: 'Index Page'
        }
    },
    // 不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 静态资源路径
    publicPath: baseUrl,
    configureWebpack (config)  {
        Object.assign(config, {
            externals: {
                lodash: '_'
            }
        });
    },
    devServer: {
        disableHostCheck: true, // 用于配置是否关闭用于DNS重绑定的HTTP请求的host检查
        host: '0.0.0.0',
        // port: 9994,
        port: 8080,
        open: true, // 是否默认打开浏览器
        openPage: '', // 默认打开的页面地址
        historyApiFallback: { // history模式的路由回退配置
            verbose: true,
            rewrites: [
                { from: /.*\/pc\/.*$/, to: '/index.html' },
                { from: /.*\/phone\/.*$/, to: '/phone.html' }
            ]
        },
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
            postcss: { // px => rem
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 50,
                        // exclude: /src\/pc/i, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        exclude (context) {
                            if (/.*\/src\/phone/.test(context)) {
                                return false;
                            }
                            if (/node_modules\/vant/.test(context)) {
                                return false;
                            }
                            return true;
                        },
                        propList: ['*', '!border*'] // 忽略border
                    })
                ]
            },
            sass: {
                sassOptions: {
                    indentedSyntax: true
                },
                prependData ({ context }) {
                    // console.log(Object.keys(arguments[0]), arguments[0].context, arguments[0].resourcePath)
                    if (/.*\/src\/pc/.test(context)) {
                        return `
                            $baseUrl: "${baseUrl}"
                            @import "~@/pc/assets/css/_global-variables.sass"
                        `
                    }
                    return `
                        $baseUrl: "${baseUrl}"
                        @import "~@/phone/assets/css/_global-variables.sass"
                    `
                }
            }

        }
    }
}
