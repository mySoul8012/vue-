<template>
  <div class="main">
    <h1 style="size:40px;">保险维生素运营管理后台</h1>
      <div class="main01">
        <el-input v-model="username" placeholder="账号" class="text1" ></el-input>
        <el-input v-model="password" placeholder="密码" class="text1" show-password></el-input>
        <el-button type="primary" class="btoon1" @click="submitForm(username, password)">登&nbsp;录</el-button>
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
  .el-input__inner{
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
  export default {
    data() {
      return {
        username: '',
        password: '',
        isA: true
      }
    },
    methods: {
      submitForm(username, password){
        console.log(username, password);
        let jsonData = "{\"username\": \""+ username +"\",\"password\": \""+ password + "\"}"
        console.log(JSON.parse(jsonData));
        axios.post("http://mock-api.com/wz2vlNzL.mock/login", JSON.parse(jsonData)).then(function (res) {
          console.log(res.data.status);
        })
        return false;
      }
    }
  }
</script>

