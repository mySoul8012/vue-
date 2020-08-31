<template>
  <el-container>
    <el-row style="width: 100%" v-show="index==0">
      <div class="text">
        <div class="text01">
          <div class="text07">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="padding:20px">
                <el-input placeholder="用户ID/用户昵称/保险ID/保险名称" v-model="searchToken" class="input-with-select">
                  <el-button slot="append" @click="search02()">搜索</el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="padding: 40px">
                <el-select v-model="value" placeholder="请选择"
                           @change="selectTrigger(value)">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          @click="test">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </div>
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
      </div>
    </el-row>
    <el-row v-show="index==1" style="width: 100%">
      <div style="width: 100%">
        <el-col :span="8"><div class="grid-content bg-purple answerInfo">回答信息</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple answerInfo">回答状态: {{answerState}}</div></el-col>
      </div>
      <div style="width: 100%; padding: 0px" class="text08">
        <el-input placeholder="请输入内容" v-model="userId01" :disabled="true">
          <template slot="prepend">用户序号</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="userName" :disabled="true">
          <template slot="prepend" style="width:30px">用户昵称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="userType" :disabled="true">
          <template slot="prepend">用户类型</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="productId" :disabled="true">
          <template slot="prepend">保险序号</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="productName" :disabled="true">
          <template slot="prepend">保险产品</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="time" :disabled="true">
          <template slot="prepend">回答时间</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="answerLike" :disabled="true">
          <template slot="prepend">点赞数量</template>
        </el-input>
      </div>
      <div style="width: 100%;padding-top:30px;">
        <el-col :span="8"><div class="grid-content bg-purple answerInfo">回答内容</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple answerInfo"></div></el-col>
      </div>
      <div>
        <el-input
                disabled="true"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                style="width:95%"
                v-model="questionContent">
        </el-input>
      </div>
      <div style="text-align: left;width: 98%;padding-left: 30px;padding-top: 20px;">
        <el-image class="text09" v-for="srcItem in answerImage" :key="srcItem.url" :src="srcItem.url"></el-image>
      </div>
      <div style="width: 100%;padding-top:30px;">
        <el-col :span="8"><div class="grid-content bg-purple answerInfo">所属问题</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple answerInfo"></div></el-col>
      </div>
      <div>
        <el-input
                disabled="true"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                style="width:95%"
                v-model="answerContent">
        </el-input>
      </div>
      <div>
        <el-input v-show="state==1" placeholder="请输入内容" v-model="hiddenNotes" :disabled="true">
          <template slot="prepend">隐藏原因备注</template>
        </el-input>
      </div>
      <div style="text-align: right;width:98%;margin-top: 30px">
        <el-button type="primary" v-show="state==0" @click="clickFun1()">隐藏问题</el-button>
        <el-button type="primary" v-show="state==1" @click="clickFun2()">恢复问题</el-button>
        <el-button type="primary" @click="clickFun3()">返回</el-button>
      </div>
    </el-row>
    <el-dialog
            :visible.sync="dialogVisible"
            :showClose="false"
            width="70%"
            style="border-radius:20px;">
      <p class="text044">隐藏问题</p>
      <div>
        <el-input placeholder="请输入原因" v-model="hiddenNotes">
          <template slot="prepend">原因备注</template>
        </el-input>
      </div>
      <div class="text055">
        <el-button type="primary" @click="summit()">确&nbsp;认</el-button>
        <el-button @click="cancel()">取&nbsp;消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AnswerManament",
    data(){
      return{
        questionContent: "",
        answerId: "",
        dialogVisible: false,
        index: 0,
        answerState: "正常",
        answerImage: [],
        state: 0,
        answerCount: "",
        answerContent: "44444444444444444",
        productId: "",
        productName: "",
        time: "",
        answerLike: "6666666",
        userId01: "",
        userName: "",
        userType: "",
        hiddenReason: "",
        hiddenNotes: ""
      }
    },
    // 传入的数据
    props: {
      value:"",
      options: "",
      searchToken: "",
      pageNum: 0,
      pageSizeNumber: 0,
      pagOn: 0,
      pagUn: 0,
      UserDialogId: "",
      UserDialogName: "",
      UserDialogReason: "",
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
        console.log(number.UserProductId + "+++++++++++++++++++++");
        this.index=1;
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/question/info?UserProductId=" + number.UserProductId).then(function (res) {
            console.log(res.data.data);
            that.userId01 = res.data.data.userId01;
            that.userName = res.data.data.userName;
            that.userType = res.data.data.userType;
            that.productId = res.data.data.productId;
            that.productName = res.data.data.productName;
            that.time = res.data.data.time;
            that.answerCount = res.data.data.answerCount;
            that.questionContent = res.data.data.questionContent;
            that.answerCount = res.data.data.answerCount;
            that.answerLike = res.data.data.answerLike;
            that.answerContent = res.data.data.answerContent;
            that.answerState = res.data.data.answerState;
        })
      },
      clickFun1(){
        this.dialogVisible = true;
      },
      closeShadow(){
        this.dialogVisible=false;
      },
      clickFun2(){
        // 恢复问题隐藏
        console.log("----------------------------");
        console.log(this.answerId);
        // 发送请求
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/question/RestoreHidder?answerId=01").then(function (res) {
          console.log(res.data.states);
          if(res.data.states == "200"){
            that.$message("恢复隐藏成功");
            that.state = 0;
          }
          if(res.data.states == 500){
            that.$message("恢复隐藏失败")
          }
        })
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
        // 隐藏原因
        console.log(this.hiddenNotes);
        // 页面状态
        console.log(this.state);
        // 问题id
        console.log(this.userId01);
        let jsonData = "{\"hiddenNotes\": \""+ this.hiddenNotes +"\",\"answerId\": \""+ this.userId01 +"\"}"
        jsonData = JSON.parse(jsonData);
        console.log(jsonData);
        let that = this;
        axios.post("http://mock-api.com/wz2vlNzL.mock/question/hidden", jsonData).then(function (res) {
          console.log(res);
          if(res.data.state == "200"){
            that.$message("提交成功")
            that.cancel();
            that.state = 1;
          }
          if(res.data.state == "500"){
            that.$message("提交失败");
            that.cancel();
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
        console.log(this.value)
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
          tmp = this.pageNum + 1;
          this.changeDataPage(tmp);
          this.changePageNum(tmp);
        }
        // 第二页 按钮变色
        if(this.pageNum == 1){
          this.changePagOn(0)
        }
      },
      changeTableDataAnswer(TableData){
        this.$emit("changeTableDataAnswer", TableData);
      },
      search02(){
        console.log(this.searchToken + "+++++++++++++++++++++++++++++++++");
        let that = this;
        // 发起请求查询
        axios.get("http://mock-api.com/wz2vlNzL.mock/question/anser?token=" + this.searchToken).then(function (res)  {
          console.log(res.data);
          console.log([res.data.data])
          that.changeTableDataAnswer(res.data.data)
        })
      },
      test(){
        console.log("test");
      },
      changePageSizeNumberAnswer(number){
        this.$emit("changePageSizeNumberAnswer", number);
      },
      selectTrigger(val){// 数据更新  页数更改
        // 调用数据更新接口
        let that = this;
        if(val == "ming1"){
          this.$emit("changeValue", "ming1");
          // 不需要做任何更改
          axios.get("http://mock-api.com/wz2vlNzL.mock/question/list?pageNo=1").then(function (res) {
            that.changeTableDataAnswer(res.data.data);
          })
          // 总页数更改
          axios.get("http://mock-api.com/wz2vlNzL.mock/Question/pageSIzeNumberQuestion").then(function (res) {
            that.$emit("changePageSizeNumberAnswer", res.data.data.pageSizeNumberQuestion)
          })
        }
        if(val == "ming2"){
          // 正常
          this.$emit("changeValue", "ming2");
          // 发送ajax
          axios.get("http://mock-api.com/wz2vlNzL.mock/question/list?pageNo=1&state=" + val).then(function (res) {
              that.changeTableDataAnswer(res.data.data);
          })
          axios.get("http://mock-api.com/wz2vlNzL.mock/Question/pageSIzeNumberQuestion&state=ming2").then(function (res) {

            // 总页数更改
              that.$emit("changePageSizeNumberAnswer", res.data.data.pageSizeNumberQuestion)
          })
        }
        if(val == "ming3"){
          // 隐藏
          this.$emit("changeValue", "ming3");
          axios.get("http://mock-api.com/wz2vlNzL.mock/question/list?pageNo=1&state=" + val).then(function (res) {
            that.changeTableDataAnswer(res.data.data);
          })
          axios.get("http://mock-api.com/wz2vlNzL.mock/Question/pageSIzeNumberQuestion&state=ming3").then(function (res) {
            // 总页数更改
            that.$emit("changePageSizeNumberAnswer", res.data.data.pageSizeNumberQuestion)
          })
        }
      },
      clickFun3(){
        this.index = 0;
      }
    },
    created: function () {

    }
  }
</script>

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
  .text07{
    width: 100%;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {

  }
  .bg-purple {

  }
  .bg-purple-light {

  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
  .answerInfo{
    text-align: left;
    font-size: 30px;
    padding: 20px;
  }
  .text08 .el-input-group{
    padding: 0px;
    width: 95%;
  }
  .text09{
    width: 550px;
    height: 550px;
  }
  .text09 img{
    margin: 20px;
  }
  .text044{
    font-size: 20px;
    padding-left: 20px;
    text-align: left;
    padding-top: 30px;
  }
  .text055{
    text-align: right;
    padding: 20px;
  }
</style>
