const isEnvH5 = !!process.env.VUE_APP_FOR_H5
module.exports = {
  publicPath: isEnvH5 ? '/dpp/' : '',
  pluginOptions: isEnvH5 ? {} : {
    cordovaPath: 'src-cordova'
  }
}
