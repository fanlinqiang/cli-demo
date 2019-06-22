//导入node api


//导入依赖
const webpack = require('webpack')
const path = require('path');
const ora = require('ora');//build进度提示
const rm = require('rimraf');//rm -rf命令的安装包

//导入文件
const webpackConfig = require('./webpack.prod.conf');

/**
 * npm run build 的执行过程：
 * 1: 采用ora显示进度条
 * 2：删除原有的dist目录
 * 3：重新打包
 * */

var spinner = ora('building for production...');
spinner.start();
rm('dist', err => {
    if (err) throw err;
    webpack(webpackConfig, (err, status) => {
        spinner.stop();
        if (err) throw err;
    })
});
