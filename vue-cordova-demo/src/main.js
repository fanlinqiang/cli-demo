import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

function initApp () {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
}

if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_FOR_H5) { // in web
  initApp()
} else {
  window.document.addEventListener('deviceready', () => { // in cordova
    initApp()
  })
}
