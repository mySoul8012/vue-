import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);
axios.interceptors.request.use(function (config) {
  config.headers.authorization = "Bearer " + store.state.userInfo;
  config.headers.Origin = "*";
  return config;
});
console.log(store.state.userInfo)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
