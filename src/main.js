import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做点什么 比如给header添加token
  config.headers.common['token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1Zjg3ZjdmYTkxN2UwMDAwOWQwMDQxNzIiLCJpYXQiOjE2MDI3NTU1NzksImV4cCI6MTYwMzM2MDM3OX0.xK8huDyflVN6ApNrOjmMrLC8iWs63udR8X4Q0QwZqv0"
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
