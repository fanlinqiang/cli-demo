//导入node api
var glob = require('glob');
var path = require('path');

//导入依赖
const HtmlWebpackPlugin = require('html-webpack-plugin');

//导入文件
const config = require('../config/index');

module.exports = {
    //获取src/views目录结构,配置多入口文件(libs)
    getEntry () {
        var url = './src/views/**/index.js';
        var files = glob.sync(url);
        var entry = {};
        files.forEach(function (path) {
            var arr = path.split('/');
            // 为每个文件配置输出目录
            entry[arr && arr[3]] = path;
        });
        return entry;
    },
    //配置多入口页面（html）
    getHtmlPlugins () {
        var entrys = this.getEntry();
        var htmlPlugins = [];
        for (let key in entrys) {
            htmlPlugins.push(new HtmlWebpackPlugin({
                filename: [key] + '.html',
                template: path.join(entrys[key].replace('.js', '.pug')),
                chunks: [key, 'vendors'],
                inject: true
            }));
        }
        return htmlPlugins;
    },
    assetsPath (_path) {
        const assetsSubDirectory = process.env.NODE_ENV === 'production'
            ? config.build.assetsSubDirectory
            : config.dev.assetsSubDirectory;
        return path.posix.join(assetsSubDirectory, _path);
    }
};
