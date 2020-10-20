<template>
  <div class="main">
    <h1 style="size:40px;">保险维生素运营管理后台</h1>
      <div class="main01">
        <el-input v-model="username" placeholder="账号" class="text1" ></el-input>
        <el-input v-model="email" placeholder="邮箱" class="text1"></el-input>
        <el-input v-model="password" placeholder="密码" class="text1" show-password></el-input>
        <el-button type="primary" class="btoon1" @click="submitForm(username, email, password)">登&nbsp;录</el-button>
        <div v-bind:class="{'accountErrorHidden': isA,'accountErrorShow':!isA}">账号或者密码错误</div>
      </div>
  </div>
</template>

<style>
  .main{
    text-align: center; /*让div内部文字居中*/
    background-color: #fff;
    border-radius: 20px;
    width: 400px;
    height: 350px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .main01{
  }
  .main01 .el-input__inner{
    border-top: none;
    border-left: none;
    border-right: none;
    margin-top: 0px;
  }
  .btoon1{
    margin-top: 20px;
    width: 100%;
  }
  .accountErrorHidden{
    margin-top: 5px;
    display: none;
  }
  .accountErrorShow{
    margin-top: 5px;
  }
</style>

<script>
  import axios from 'axios'
  var qs = require('qs');
  export default {
    data() {
      return {
        username: '',
        password: '',
        email: '',
        isA: true
      }
    },
    methods: {
      submitForm(username,email,  password){
        console.log(username, password);
        let jsonData = "{\n" +
            "    \"username\": \"mingming\",\n" +
            "    \"email\": \"mingming@mingming.email\",\n" +
            "    \"password\": \"123456\"\n" +
            "}"
        console.log(jsonData)
        let that = this;
        console.log(process.env.VUE_APP_SERVER_URL);
        console.log(username)
        console.log(email)
        console.log(password)
        axios.post("/api/login", qs.stringify({ 'username': username, 'email': email, 'password': password }, { indices: false })).then(function (res) {
          console.log(res.data);
          if(res.data.code == 0){
            sessionStorage.setItem("userInfo", res.data.data.token)
            that.$store.commit("set_userInfo", res.data.data.token);
            that.$router.push("./index");
          }else{
            that.$message('请求失败');
          }
        }).catch((error) => {
          if(error.response){
            that.$message(error.response.data.message);
          }
        })
        return false;
      }
    },
    created: function() {
      this.$store.commit("set_userInfo", sessionStorage.getItem("userInfo"));
    }
  }
</script>

