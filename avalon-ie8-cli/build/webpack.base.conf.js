//导入node api
var path = require('path');

//导入依赖
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//导入文件
const util = require('./util');
const config = require('../config/index');


function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    /**
     * 定义入口文件，然后webpack就会从这个入口文件开始，对入口文件，以及与入口文件间接或者直接依赖的文件进行打包
     * */
    //注意：此处的路径是相对于服务启动的根路径，即在哪个文件夹下启动，那么根目录就是该文件夹
    entry: Object.assign({
        // 'vendors': ['jquery'],//通常一些第三方库的代码我们可以将他们统一打包编译到vendors.js文件当中，与我们自己的应用程序代码分离开来。
        // 'base': './src/_base.js',
    }, util.getEntry()),
    /**
     * 即打包编译之后的文件，该如何定义，文件名等等都是在output中定义
     * */
    output: {
        path: path.join(__dirname, '../dist'),
        //publicPath: '/static/',//它控制的是打包以后，文件的引用路径，并不是打包以后文件所在的路径
        filename: '[name][hash:5].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    /**
     * 定义各种loader: 处理各种非javascript代码（webpack只理解javascript）
     * */
    module: {
        rules: [
            {
                test: /\.pug$/,
                //use: ['html-loader', 'pug-html-loader']
                // html-withimg-loader 可以识别html中的src引用，使之也通过url-loader处理
                use: ['html-withimg-loader', 'pug-html-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader', 'es3ify-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    //'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // importLoaders选项的作用是用于配置css-loader作用于 @import 的资源之前需要经过其他loader的个数。@import 用于css源码中引用其他模块的关键字，如果你的项目中确定不会涉及模块化可以忽略此配置项；
                            importLoaders: 2
                        }
                    },{
                        loader: 'postcss-loader',
                        options: {} // postcss-loader options
                    },{
                        loader: 'sass-loader',
                        options: {} // less-loader options
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: util.assetsPath('images/[name].[ext]?[hash]'),
                }
            },
        ]
    },
    /**
     * 定义各种插件：然后进行各种任务，如打包优化，压缩等等
     * */
    plugins: [
        //分离css与js
        new MiniCssExtractPlugin({
            filename: util.assetsPath('style/[name][hash:5].css'),
            chunkFilename: "[id].css"
        }),
        //配置一下配置，全局统一暴露接口，其他文件都可以直接引用，不需要再配其他
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     Mustache: 'mustache'
        // }),
    ].concat(util.getHtmlPlugins()),
    /**
     * 定义别名
     * */
    resolve: {
        alias: {
            '@': resolve('src'),
            // mustache: resolve('src/static/libs/mustache.min.js')
        }
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             lib: {
    //                 // test: /\.js$/,
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: "initial",
    //                 name: "vendors",
    //                 enforce: true,
    //             }
    //         }
    //     }
    // },

};
