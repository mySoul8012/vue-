<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title">保险产品管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" v-on:click="ming(1)">保险产品查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1" v-on:click="ming(2)">封号管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">问答管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1" v-on:click="ming(31)">问题管理</el-menu-item>
          <el-menu-item index="3-2" v-on:click="ming(32)">回答管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">数据统计</template>
        <el-menu-item-group>
          <el-menu-item index="4-1" v-on:click="ming(41)">保险产品数据</el-menu-item>
          <el-menu-item index="4-2" v-on:click="ming(42)">保险公司数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: 'Menum',
    methods: {
      ming(number){
        console.log(number);
        this.$emit("callFather", number);
      }
    }
  }
</script>
