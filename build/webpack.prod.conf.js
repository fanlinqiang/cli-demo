//导入node api
var path = require('path');

//导入依赖
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//导入文件
const util = require('./util');
const config = require('../config/index');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: util.assetsPath('js/[name].[hash:5].js'),
        publicPath: config.build.assetsPublicPath
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true, //启用缓存/关闭缓存
                parallel: true, //使用多进程并行运行来提高构建速度
                sourceMap: false, // 使用sourceMap将错误消息位置映射到模块(这会减慢编译速度)
                uglifyOptions: {
                    //warnings: false,
                    //parse: {},
                    compress: {
                        properties: false,
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    },
                    output: {
                        beautify: true,
                        quote_keys: true
                    },
                    ie8: true,
                    /*mangle: true, // Note `mangle.properties` is `false` by default.
                     mangle: {
                     screw_ie8: false
                     },
                     sourceMap: false
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,*/
                }
            }),
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { safe: true, inline: false },
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static/images'),
                to: path.resolve(__dirname, '../dist/static/images')
            },
            {
                from: path.resolve(__dirname, '../src/static/libs/js'),
                to: path.resolve(__dirname, '../dist/static/libs/js')
            },
            {
                from: path.resolve(__dirname, '../src/static/libs/style'),
                to: path.resolve(__dirname, '../dist/static/libs/style')
            },
            {
                from: path.resolve(__dirname, '../src/static/libs/fonts'),
                to: path.resolve(__dirname, '../dist/static/libs/fonts')
            },
            {
                from: path.resolve(__dirname, '../src/static/js'),
                to: path.resolve(__dirname, '../dist/static/js')
            }
        ]),
    ]
});


