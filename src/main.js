import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import object from "./components/common/toast";
import FastClick from 'fastclick'

//安装toast插件
Vue.use(object)
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue();
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
FastClick.attach(document.body)
