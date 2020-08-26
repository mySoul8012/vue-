<template>
  <div>
    <el-button type="primary" v-if="pagOn==0" @click="pageNo()">上一页</el-button>
    <el-button v-show="pagOn==1" @click="pageNo()">上一页</el-button>
    第 {{pageNum}} / {{pageSizeNumber}}页
    <el-button type="primary" v-show="pagUn==0" @click="pageUn()">下一页</el-button>
    <el-button v-show="pagUn==1" @click="pageUn()">下一页</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      pagOn: 0,
      pageNum: 1,
      pageSizeNumber: 3,
      pagUn: 0,
    },
    methods: {

    }
  }
</script>
