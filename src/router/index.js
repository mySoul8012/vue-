import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/Index')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// 页面刷新，重新赋值userInfo
if(sessionStorage.getItem("userInfo")){
  store.commit("set_userInfo", sessionStorage.getItem('userInfo'))
}



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(
    (to, from, next) => {
      if(to.matched.some(res => res.meta.requireAuth)){
        console.log(store.state.userInfo.msg)
        if(store.state.userInfo.msg == "success"){
          next();
        }else{
          // 跳转至登录页面
          next({
            path: '/'
          })
        }
      }else{
        next()
      }
    }
)
export default router
