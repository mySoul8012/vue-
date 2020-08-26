import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    userInfo: ''
  },
  mutations: {
    set_userInfo(state, userInfo){
      state.userInfo = userInfo;
    },
    del_userInfo(state){
      state.userInfo = "";
      sessionStorage.removeItem("userInfo")
    }
  },
  actions: {
  },
  modules: {
  }
})
