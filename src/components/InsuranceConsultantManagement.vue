<template>
  <el-container>
    <div class="text">
      <div class="text01">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input placeholder="请输入内容" v-model="token" class="input-with-select">
              <el-button slot="append" @click="search02()">搜索</el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <br/>
            总共浏览: {{overallView}}&nbsp;收藏: {{favorites}}&nbsp;口碑: {{wordMouth}}&nbsp;解读: {{Interpretation}}<br/>
            点评赞: {{reviewsLike}}&nbsp;问题: {{questionCount}}&nbsp;回答赞: {{answerLikeCount}}&nbsp;<br/>
          </div>
        </el-col>
      </div>
      <div class="text02">
        <!-- stripe:是否为斑马纹 table; -->
        <!-- border:是否带有纵向边框; -->
        <!-- fit:列的宽度是否自撑开; -->
        <!-- highlight-current-row:是否要高亮当前行; -->
        <el-table :data="tableData" border stripe fit
                  ref="multipleTable"

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
                           :min-width="th.minWidth" align="left" style="height: 90%">
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
        <div class="text06">
          <el-button type="primary" v-if="pagOn==0" @click="pageNo()">上一页</el-button>
          <el-button v-show="pagOn==1" @click="pageNo()">上一页</el-button>
          第 {{pageNum}} / {{pageSizeNumber}}页
          <el-button type="primary" v-show="pagUn==0" @click="pageUn()">下一页</el-button>
          <el-button v-show="pagUn==1" @click="pageUn()">下一页</el-button>
        </div>
      </div>
      <el-dialog
              :visible.sync="dialogVisible"
              :showClose="false"
              width="15%"
              style="border-radius:20px;">
        <p style="font-size: 15px; padding: 20px">确认解封&nbsp;{{numberName}}&nbsp;({{userId}})&nbsp;吗？</p>
        <el-row>
          <el-button type="primary" style="width: 50%;border-radius: 0px" @click="success()">确&nbsp;认</el-button>
          <el-button plain style="width: 50%;margin: 0px;border-radius: 0px" @click="cancel()">取&nbsp;消</el-button>
        </el-row>
      </el-dialog>
      <el-dialog
              :visible.sync="dialogVisible1" :showClose="false" width="70%" style="border-radius: 20px">
        <div class="text03">
          <p class="text04">封号处理</p>
          <div>
            <el-input placeholder="请输入用户Id" v-model="UserDialogId">
              <template slot="prepend">用户ID</template>
              <el-button slot="append" @click="search01()">搜索</el-button>
            </el-input>
            <el-input placeholder="用户昵称" v-model="UserDialogName" disabled="true">
              <template slot="prepend">用户昵称</template>
            </el-input>

            <el-input placeholder="请输入原因" v-model="UserDialogReason">
              <template slot="prepend">原因备注</template>
            </el-input>
          </div>
          <div class="text05">
            <el-button type="primary" @click="summit()">确&nbsp;认</el-button>
            <el-button @click="cancel()">取&nbsp;消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
  import axios from "axios";

  export default {
    name: "InsuranceConsultantManagement",
    // 传入的数据
    data(){
      return{
        overallView: "",
        favorites: "",
        wordMouth: "",
        Interpretation: "",
        reviewsLike: "",
        questionCount: "",
        answerLikeCount: "",
        token: ""
      }
    },
    props: {
      pageNum: 0,
      pageSizeNumber: 0,
      pagOn: 0,
      pagUn: 0,
      UserDialogId: "",
      UserDialogName: "",
      UserDialogReason: "",
      dialogVisible1: false,
      tmp: "",
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
        this.tmp = number.id;
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
        let that = this;
        // 发送请求
        console.log(this.tmp);
        axios.get("http://mock-api.com/wz2vlNzL.mock/unblock?user=" + this.tmp).then(function(res){
          if(res.data.status == 200){
            // 请求成功
            that.$message('请求成功');
          }
          if(res.data.status == 500){
            that.$message('请求失败');
          }
        })
      },
      cancel(){
        this.dialogVisible = false;
        this.dialogVisible1 = false;
      },
      summit(){
        console.log(this.UserDialogId);
        console.log(this.UserDialogName);
        console.log(this.UserDialogReason);
        let dataJson = JSON.parse("{\n" +
            "\t\"UserDialogId\": \"" + this.UserDialogId +"\",\n" +
            "\t\"UserDialogName\": \"" +  this.UserDialogName  +"\",\n" +
            "\t\"UserDialogReason\": \"" +  this.UserDialogReason  +"\"\n" +
            "}")
        console.log(dataJson)
        let that = this;
        axios.post("http://mock-api.com/wz2vlNzL.mock/ublock/user", dataJson).then((res) => {
          console.log(res.data.status);
          if(res.data.status == 200){
            that.$message('请求成功');
          }
          if(res.data.status == 500){
            that.$message('请求失败');
          }
        })
      },
      search01(){
        console.log(this.UserDialogId);
        let DialogId = this.UserDialogId;
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/userName?userId=" + DialogId).then((res) => {
          console.log(res.data.data.userName);
          that.UserDialogName = res.data.data.userName;
        })
      },
      changePagOn(number){
        this.$emit("changePagOn", number);
      },
      changePagUn(number){
        this.$emit("changePagUn", number);
      },
      // 更改changPageNum
      changePageNum(number){
        this.$emit("changePageNum", number);
      },
      // 更改页面数据
      changeDataPage(number){
        this.$emit("changeDataPage", number)
      },
      // 上一页
      pageNo(){
        // 获取当前页
        if(this.pageNum == 1){
          // 不做任何变动
        }
        if(this.pageNum == 2){
          // 上一页变灰
          this.changePagOn(1);
          // 数据刷新
          this.changeDataPage(1);
          // 页数更改
          this.changePageNum(1);
        }
        // 其他数据
        if(this.pageNum > 2){
          let tmp = this.pageNum - 1;
          this.changeDataPage(tmp)
          this.changePageNum(tmp);
        }
        // 如果是倒数第二页，下一页按钮变色
        let tmp1 = this.pageSizeNumber;
        if(this.pageNum == tmp1){
          // 下一页按钮变色
          this.changePagUn(0);
        }
      },
      // 下一页
      pageUn(){
        // 如果当前页是最后一页
        if(this.pageNum == this.pageSizeNumber){
          // 不做改变
        }
        // 如果是当前页是倒数第二页
        console.log(this.pageSizeNumber)
        let tmp = this.pageSizeNumber - 1;
        if(this.pageNum == tmp){
          // 按钮变灰
          this.changePagUn(1);
          // 数据刷新
          this.changeDataPage(this.pageSizeNumber);
          // 数据更改
          this.changePageNum(this.pageSizeNumber);
        }
        // 其余页面
        if(this.pageNum < tmp && this.pageNum >= 1){
          // 数据刷新
          console.log(typeof this.pageNum);
          tmp = Number(this.pageNum) + 1;
          this.changeDataPage(tmp);
          this.changePageNum(tmp);
        }
        // 第二页 按钮变色
        if(this.pageNum == 1){
          this.changePagOn(0)
        }
      },
      search02(){
        console.log(this.token);
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/InsuranceConsultantManagement/search?token=" + this.token).then(function (res) {
          console.log(res.data.data);
          that.$emit("changeTableDataAnswer", res.data.data);
        })
      }
    },
    created() {
      let that = this;
      axios.get("http://mock-api.com/wz2vlNzL.mock/company/count").then(function (res) {
        console.log(res);
        that.overallView = res.data.data.overallView;
        that.favorites = res.data.data.favorites;
        that.wordMouth = res.data.data.wordMouth;
        that.Interpretation = res.data.data.Interpretation;
        that.questionCount = res.data.data.questionCount;
        that.answerLikeCount = res.data.data.answerLikeCount;
        that.reviewsLike = res.data.data.reviewsLike;
      })
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
  .text03{
    margin: 3px;
    padding: 3px;
  }
  .text04{
    font-size: 20px;
    padding-left: 20px;
    text-align: left;
  }
  .el-input.is-disabled .el-input__inner{
    background: #ffffff;
  }
  .el-input-group{
    padding: 20px;
    width: 95%;
  }
  .text05{
    text-align: right;
    padding: 20px;
  }
  .text06{
    padding: 20px;
    width: 98%;
    text-align: right;
  }
  .el-table__header-wrapper{
    height: 100%;
  }
  el-table__body-wrapper is-scrolling-none {
    height: 100%;
  }
</style>
