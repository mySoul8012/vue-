// axios——设置请求
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  timeout: 8000,
  data: {},
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})
// 请求前
http.interceptors.request.use(
    config => {
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1Zjg3ZjdmYTkxN2UwMDAwOWQwMDQxNzIiLCJpYXQiOjE2MDI3NTU1NzksImV4cCI6MTYwMzM2MDM3OX0.xK8huDyflVN6ApNrOjmMrLC8iWs63udR8X4Q0QwZqv0"
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    })
// 请求后
http.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // 401 清除token信息并跳转到登录页面
            iView.Notice.warning({
              title: '登录超时'
            })
            store.commit(types.LOG_OUT)
            myApp.$router.replace('/admin/login')
        }
      }
      return Promise.reject(error)
    })

export default http
