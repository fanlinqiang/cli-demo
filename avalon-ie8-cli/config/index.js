var path = require('path');


module.exports = {
    dev: {
        env: require('./dev.env'),
        host: 'localhost',
        port: 9110,
        autoOpenBrowser: false,
        assetsSubDirectory: 'static',//配置静态资源的访问自路径
        assetsPublicPath: '/',//配置静态资源的访问路径
        // 配置代理
        /*proxyTable: {
            '/mock': {
                target: 'http://localhost:3000/',
                changeOrigin: true
            },
        }*/
    },
    build: {
        env: require('./prod.env'),
        assetsSubDirectory: 'static',//配置静态资源的访问自路径
        assetsPublicPath: './',//配置静态资源的访问路径
    }
};
