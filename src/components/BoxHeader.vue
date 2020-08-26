<template>
  <div class="text1">
    <a href="http://localhost:8080/" class="text1">退出</a>
  </div>
</template>

<script>
  export default {
    name: 'BoxHeader',
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  .text1 {
    text-align: right;
    padding: 10px;
    font-size: 20px;
  }
  .text1 a{
    text-decoration: none;
  }
</style>
