//导入node api
var path = require('path');

//导入依赖
const webpack = require('webpack');
const merge = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//导入文件
const baseWebpackConfig = require('./webpack.base.conf');
const config = require('../config/index');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',//设置模式，否则会警告，也可以在启动命令，即package.json中配置 --mode development
    module: {},
    devServer: {
        inline: true,//实时更新，即代码修改，浏览器页面自动刷新
        hot: true,//热更新，即局部更新，修改代码，浏览器未刷新，局部页面自动替换
        progress: true, //设置webpack-dev-server编译的时候，是否显示进度条
        overlay: true, // 在编译出现错误时，将错误直接显示在页面上
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBrowser,//设置是否自动打开浏览器窗口
        contentBase: 'src',
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        //热更新插件
        new webpack.HotModuleReplacementPlugin(),
        //作用1：指定webpack-dev-server启动服务以后，默认访问的html文件
        //作用2：为html引入外部资源，如js,css等时，动态添加编译后的hash，保证每个文件的唯一性。
        //常见场景：我们常做的单页面入口，只需要new 一个HtmlWebpackPlugin实例，如果是多页面，就new 多个HtmlWebpackPlugin实例。
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.join('./src/views/index/index.pug'),
        //     inject: true
        // }),
        new FriendlyErrorsPlugin({
            clearConsole: true
        }) // 网页端友好的报错信息，需要依赖npm i -D friendly-errors-webpack-plugin node-notifier
    ]
});
