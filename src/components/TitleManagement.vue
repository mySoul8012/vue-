<template>
  <el-container>
    <div class="text">
      <div class="text01">
        <el-row>
          <el-button type="primary" style="text-align: center">封号处理</el-button>
        </el-row>
      </div>
      <div class="text02">
        <!-- stripe:是否为斑马纹 table; -->
        <!-- border:是否带有纵向边框; -->
        <!-- fit:列的宽度是否自撑开; -->
        <!-- highlight-current-row:是否要高亮当前行; -->
        <el-table :data="tableData" border stripe fit
                  ref="multipleTable"
                  highlight-current-row
                  :height="tabheight"
                  @row-dblclick="rowDblclick"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-background="rgba(0, 0, 0, 0.3)"
        >
          <!-- 是否需要全选， isshow控制-->
          <!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值),
          oper: 是否有操作列, oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 -->
          <el-table-column v-for="(th, key) in tableHeader"
                           :key="key"
                           :prop="th.prop"
                           :label="th.label"
                           :fixed="th.fixed"
                           :width="th.width"
                           :min-width="th.minWidth" align="left">
            <!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，这里操作一栏的名字定死（oper表示是操作这一列，否则就不是） -->
            <template slot-scope="scope">
              <div v-if="th.oper">
                <el-button v-for="(o, key) in th.oper"
                           :key="key" @click="clickFun(scope.row)"
                           :type="o.style"
                           :icon="o.icon"
                           size="small">{{o.name}}
                </el-button>
              </div>
              <!--formatData：自定义过滤器-->
              <div v-else>
                <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>
                <span v-else>
                         <!--这一块做el-tag标签样式判断。不需要可以去除判断 ** start **-->
                        <el-tag v-if="th.isok == 1 && scope.row[th.prop]==true" >{{ scope.row[th.prop] | formatters(th.formatData) }}</el-tag>
                        <el-tag v-else-if="th.isok == 1 && scope.row[th.prop]==false" type="success">{{ scope.row[th.prop] | formatters(th.formatData) }}</el-tag>
                  <!-- ** end**-->
                        <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
                    </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
              :visible.sync="dialogVisible"
              :showClose="false"
              width="15%"
              style="border-radius:20px">
        <p style="font-size: 15px; padding: 20px">确认解封&nbsp;{{numberName}}&nbsp;({{userId}})&nbsp;吗？</p>
        <el-row>
          <el-button type="primary" style="width: 50%;border-radius: 0px" @click="success()">确认</el-button>
          <el-button plain style="width: 50%;margin: 0px;border-radius: 0px" @click="cancel()">取消</el-button>
        </el-row>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
  export default {
    name: 'TitleManagement',
    // 传入的数据
    props: {
      userId: "",
      numberName: "",
      dialogVisible:false,
      tableData: { // 表格数据
        type: Array,
        default: function () {
          return []
        }
      },
      rowDblclick: { // 单行点击事件
        type: Function,
        default: (row, event, column) => {
          console.log('default: ' + row + '---' + event + '---' + column)
        }
      },
      tableHeader: { // 表格头部
        type: Array,
        default: function () {
          return []
        }
      },
      tabheight: {
        type: String,
        default: '100%'
      },
      loading: { // 加载等待
        type: Boolean,
        default: false
      },
      isshow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 获取选择行数信息
      getmydata() {
        let data = this.$refs.multipleTable.selection
        let IDS = []
        for (let i = 0; i < data.length; i++) {
          IDS.push(data[i].ID)
        }
        this.$emit('func', IDS)
      },
      clickFun(number){
        this.userId = number.UserId;
        this.numberName = number.UserName;
        console.log(number);
        this.dialogVisible = true;
      },
      closeShadow(){
        this.dialogVisible=false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
      },
      success(){
        this.dialogVisible = false;
        // 发送请求

      },
      cancel(){
        this.dialogVisible = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .text{
    width: 100%;
  }
  .text01{
    width: 90%;
    padding: 23px;
    text-align: right;
  }
  .text02{
    width: 90%;
    padding: 23px;
  }
  .el-dialog__header{
    padding: 0px;
  }
  .el-dialog__body{
    padding: 0px;
  }
</style>

