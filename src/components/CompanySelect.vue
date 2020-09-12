<template>
  <el-container>
    <div v-show="cur==0" style="width: 100%;">
      <div class="text">
        <div class="text01">
          <el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-input placeholder="请输入内容" v-model="key" class="input-with-select">
                    <el-button slot="append" @click="search()">搜索</el-button>
                  </el-input>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-button type="primary" style="text-align: center;margin: 20px;" @click="cur=3">+添加保险</el-button>
                </div>
              </el-col>
            </el-row>
          </el-row>
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
                             size="small">查看
                  </el-button>
                  <el-button v-for="(o, key) in th.oper"
                             :key="key" @click="clickFun23333(scope.row)"
                             :type="o.style"
                             :icon="o.icon"
                             size="small">编辑
                  </el-button>
                </div>
                <!--formatData：自定义过滤器-->
                <div v-else>
                  <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>
                  <span v-else>
                           <!--这一块做el-tag标签样式判断。不需要可以去除判断 ** start **-->
                          <el-tag v-if="th.isok == 1 && scope.row[th.prop]==true">{{ scope.row[th.prop] | formatters(th.formatData) }}</el-tag>
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
    </div>
    <div v-show="cur==1" style="width: 100%;text-align: left">
      <div style="font-size: 30px;margin: 20px">产品概况</div>
      <div class="text01">
        <el-input placeholder="请输入内容" v-model="comapnyId33333" disabled="true">
          <template slot="prepend">公司序号</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyAbbreviation" disabled="true">
          <template slot="prepend">保险简称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyFullName" disabled="true">
          <template slot="prepend">保险全称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyType" disabled="true">
          <template slot="prepend">公司类型</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyCount" disabled="true">
          <template slot="prepend">产品数量</template>
        </el-input>
      </div>
      <div style="font-size: 30px;margin: 20px">公司头像</div>
      <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <el-image
                  style="width: 100px; height: 100px"
                  :src="url"
                  :fit="fit"></el-image>
        </div>
      </div>
      <div style="font-size: 30px;margin: 20px">评级信息</div>
      <div class="text01">
        <el-input placeholder="请输入内容" v-model="manageMentCapacity" disabled="true">
          <template slot="prepend">经营能力</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="solvency" disabled="true">
          <template slot="prepend">偿付能力</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="serviceRating" disabled="true">
          <template slot="prepend">服务评级</template>
        </el-input>
      </div>
      <div style="font-size: 30px;margin: 20px;text-align:left;">业务信息</div>
      <div class="text01">
        <el-input placeholder="请输入内容" v-model="siteName" disabled="true">
          <template slot="prepend">网站名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="siteLocalhost" disabled="true">
          <template slot="prepend">网站地址</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="appName" disabled="true">
          <template slot="prepend">App名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="weiChantName" disabled="true">
          <template slot="prepend">微信公众号名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="informantionUrl" disabled="true">
          <template slot="prepend">信息披露网址</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="complaintPhone" disabled="true">
          <template slot="prepend">客服服务以及投诉电话</template>
        </el-input>
      </div>
      <div style="text-align: right">
        <el-button @click="cur=0">返回</el-button>
      </div>
    </div>
    <div v-show="cur==2" style="width: 100%;text-align: left">
      <div style="font-size: 30px;margin: 20px">产品概况</div>
      <div class="text01">
        <el-input placeholder="请输入内容" v-model="comapnyId33333">
          <template slot="prepend">公司序号</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyAbbreviation">
          <template slot="prepend">保险简称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyFullName">
          <template slot="prepend">保险全称</template>
        </el-input>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            公司类型
          </div>
        </el-col>
        <el-col :span="30">
          <el-select v-model="companyType" placeholder="请选择">
            <el-option label="人生险" value="1"></el-option>
            <el-option label="寿险" value="2"></el-option>
            <el-option label="其他险" value="3"></el-option>
          </el-select>
        </el-col>
        <el-input placeholder="请输入内容" v-model="companyCount">
          <template slot="prepend">产品数量</template>
        </el-input>
      </div>
      <div style="font-size: 30px;margin: 20px">公司头像</div>
      <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <el-image
                  style="width: 100px; height: 100px"
                  :src="url"
                  :fit="fit"></el-image>
          <p></p>
          <div style="margin-left:30px;">
          <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :http-request="uploadFile"
                  :on-change="handleChange"
                  :file-list="fileList3">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          </div>
        </div>
      </div>

      <div style="font-size: 30px;margin: 20px">评级信息</div>
      <div class="text01">
        经营能力
        <el-select v-model="manageMentCapacity" placeholder="请选择">
          <el-option label="A" value="1"></el-option>
          <el-option label="B" value="2"></el-option>
          <el-option label="C" value="3"></el-option>
        </el-select>
        偿付能力
        <el-select v-model="solvency" placeholder="请选择">
          <el-option label="A" value="1"></el-option>
          <el-option label="B" value="2"></el-option>
          <el-option label="C" value="3"></el-option>
        </el-select>
        服务评级
        <el-select v-model="serviceRating" placeholder="请选择">
          <el-option label="A" value="1"></el-option>
          <el-option label="B" value="2"></el-option>
          <el-option label="C" value="3"></el-option>
        </el-select>
      </div>
      <div style="font-size: 30px;margin: 20px;text-align:left;">业务信息</div>
      <div class="text01">
        <el-input placeholder="请输入内容" v-model="siteName">
          <template slot="prepend">网站名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="siteLocalhost">
          <template slot="prepend">网站地址</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="appName">
          <template slot="prepend">App名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="weiChantName">
          <template slot="prepend">微信公众号名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="informantionUrl">
          <template slot="prepend">信息披露网址</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="complaintPhone">
          <template slot="prepend">客服服务以及投诉电话</template>
        </el-input>
      </div>
      <div style="text-align: right">
        <el-button @click="summit01()">保存修改</el-button>
        <el-button @click="cur=0">返回</el-button>
      </div>
    </div>
    <div v-show="cur==3" style="width: 100%;text-align: left">
      <div style="font-size: 30px;margin: 20px">产品概况</div>
      <div class="text01">
        <el-input placeholder="请输入内容" v-model="comapnyId33333">
          <template slot="prepend">公司序号</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyAbbreviation">
          <template slot="prepend">保险简称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="companyFullName">
          <template slot="prepend">保险全称</template>
        </el-input>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            公司类型
          </div>
        </el-col>
        <el-col :span="30">
          <el-select v-model="companyType" placeholder="请选择">
            <el-option label="人生险" value="1"></el-option>
            <el-option label="寿险" value="2"></el-option>
            <el-option label="其他险" value="3"></el-option>
          </el-select>
        </el-col>
        <el-input placeholder="请输入内容" v-model="companyCount">
          <template slot="prepend">产品数量</template>
        </el-input>
      </div>
      <div style="font-size: 30px;margin: 20px">公司头像</div>
      <div class="demo-image">
        <div class="block" v-for="fit in fits" :key="fit">
          <el-image
                  style="width: 100px; height: 100px"
                  :src="url"
                  :fit="fit"></el-image>
          <p></p>
          <div style="margin-left:30px;">
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :http-request="uploadFile"
                    :on-change="handleChange"
                    :file-list="fileList3">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
      </div>

      <div style="font-size: 30px;margin: 20px">评级信息</div>
      <div class="text01">
        经营能力
        <el-select v-model="manageMentCapacity" placeholder="请选择">
          <el-option label="A" value="1"></el-option>
          <el-option label="B" value="2"></el-option>
          <el-option label="C" value="3"></el-option>
        </el-select>
        偿付能力
        <el-select v-model="solvency" placeholder="请选择">
          <el-option label="A" value="1"></el-option>
          <el-option label="B" value="2"></el-option>
          <el-option label="C" value="3"></el-option>
        </el-select>
        服务评级
        <el-select v-model="serviceRating" placeholder="请选择">
          <el-option label="A" value="1"></el-option>
          <el-option label="B" value="2"></el-option>
          <el-option label="C" value="3"></el-option>
        </el-select>
      </div>
      <div style="font-size: 30px;margin: 20px;text-align:left;">业务信息</div>
      <div class="text01">
        <el-input placeholder="请输入内容" v-model="siteName">
          <template slot="prepend">网站名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="siteLocalhost">
          <template slot="prepend">网站地址</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="appName">
          <template slot="prepend">App名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="weiChantName">
          <template slot="prepend">微信公众号名称</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="informantionUrl">
          <template slot="prepend">信息披露网址</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="complaintPhone">
          <template slot="prepend">客服服务以及投诉电话</template>
        </el-input>
      </div>
      <div style="text-align: right">
        <el-button @click="summit02()">保存修改</el-button>
        <el-button @click="cur=0">返回</el-button>
      </div>
    </div>
    <el-dialog
            :visible.sync="dialogVisible"
            :showClose="false"
            width="15%"
            style="border-radius:20px;">
      <p style="font-size: 15px; padding: 20px">确认保存吗？</p>
      <el-row>
        <el-button type="primary" style="width: 50%;border-radius: 0px" @click="success()">确&nbsp;认</el-button>
        <el-button plain style="width: 50%;margin: 0px;border-radius: 0px" @click="cancel()">取&nbsp;消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog
            :visible.sync="dialogVisible1"
            :showClose="false"
            width="15%"
            style="border-radius:20px;">
      <p style="font-size: 15px; padding: 20px">确认保存保险内容吗？</p>
      <el-row>
        <el-button type="primary" style="width: 50%;border-radius: 0px" @click="success1()">确&nbsp;认</el-button>
        <el-button plain style="width: 50%;margin: 0px;border-radius: 0px" @click="cancel()">取&nbsp;消</el-button>
      </el-row>
    </el-dialog>
  </el-container>
</template>

<script>
  import axios from "axios";

  export default {
    name: "CompanySelect",
    data() {
      return {
        uploadFile: "",
        fileList3: "",
        complaintPhone: "",
        informantionUrl: "",
        weiChantName: "",
        siteLocalhost: "",
        appName: "",
        siteName: "",
        serviceRating: "",
        solvency: "",
        manageMentCapacity: "",
        companyCount: "",
        companyType: "",
        comapnyId33333: "33333",
        companyAbbreviation: "",
        companyFullName: "",
        companyId: "",
        fits: ['头像'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        "productSelectId": "",
        "productName": "",
        "productId": "",
        "productCompany": "",
        "noOneCategory": "",
        "labelCategory": "",
        "isSale": "",
        "age": "",
        "payDeadLine": "",
        "guaranteeperiod": "",
        "basicPremium": "",
        "observationperiod": "",
        "insuradAge": "",
        "paymentDeadline": "",
        "guaranteePeriod1234234": "",
        "basicPremium1": "",
        "observationperiod1111": "",
        "insuranceRequirements": "",
        "healthNotice": "",
        "guaranteedContent1": [],
        "donTAnyNt": "",
        "cur": "0",
        "key": ""
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
      dialogVisible: false,
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
      summit01(){
        this.dialogVisible = true;
      },
      summit02(){
        this.dialogVisible1 = true;
      },
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      success1() {
        // 获取内容
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/test").then(function (res) {
          if (res.data.states == "200") {
            that.$message("成功")
            that.dialogVisible1 = false;
            that.cur = 0;
          }
          if (res.data.states == "500") {
            that.$message("失败")
            that.dialogVisible1 = false;
          }
        })
      },
      // 删除保存
      func10() {
        // 弹框
        this.dialogVisible = true;
      },
      func11() {
        // 弹框
        this.dialogVisible1 = true;
      },
      clickFun5(index, index1) {
        this.guaranteedContent1[index].guaranteedItem.splice(index1, 1);
      },
      clickFun4(index) {
        this.guaranteedContent1[index].guaranteedItem.push({
          "itemName": "ming"
        })
      },
      clickFun3(number) {
        console.log(number);
        this.guaranteedContent1.splice(number, 1);
      },
      clickFun2() {
        this.guaranteedContent1.push({
          "guaranteedContent": "ming",
          "guaranteedItem": [{
            "itemName": "ming"
          }, {
            "itemName": "ming"
          }, {
            "itemName": "ming"
          }, {
            "itemName": "ming"
          }, {
            "itemName": "ming"
          }],
          "description": "mingmingming"
        })
      },
      add() {
        this.cur = 1;
      },
      search() {
        console.log(this.key);
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/companySelectSearch?toke=ming").then(function (res) {
          that.$emit("changeData", res.data.data);
        })
      },
      // 获取选择行数信息
      getmydata() {
        let data = this.$refs.multipleTable.selection
        let IDS = []
        for (let i = 0; i < data.length; i++) {
          IDS.push(data[i].ID)
        }
        this.$emit('func', IDS)
      },
      clickFun(number) {
        console.log(number)
        this.cur = 1;
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/company/info?id=01").then(function (res) {
          that.comapnyId33333 = res.data.data.comapnyId;
          that.companyType = res.data.data.companyType;
          that.companyAbbreviation = res.data.data.companyAbbreviation;
          that.companyFullName = res.data.data.companyFullName;
          that.companyCount = res.data.data.companyCount;
          that.url = res.data.data.url;
          that.manageMentCapacity = res.data.data.manageMentCapacity;
          that.solvency = res.data.data.solvency;
          that.serviceRating = res.data.data.serviceRating;
          that.siteName = res.data.data.siteName;
          that.siteLocalhost = res.data.data.siteLocalhost;
          that.appName = res.data.data.appName;
          that.siteLocalhost = res.data.data.siteLocalhost;
          that.appName = res.data.data.appName;
          that.weiChantName = res.data.data.weiChantName;
          that.informantionUrl = res.data.data.informantionUrl;
          that.complaintPhone = res.data.data.complaintPhone;
        })

      },
      clickFun23333(number) {
        console.log(number)
        this.cur = 2;
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/company/info?id=01").then(function (res) {
          that.comapnyId33333 = res.data.data.comapnyId;
          that.companyType = res.data.data.companyType;
          that.companyAbbreviation = res.data.data.companyAbbreviation;
          that.companyFullName = res.data.data.companyFullName;
          that.companyCount = res.data.data.companyCount;
          that.url = res.data.data.url;
          that.manageMentCapacity = res.data.data.manageMentCapacity;
          that.solvency = res.data.data.solvency;
          that.serviceRating = res.data.data.serviceRating;
          that.siteName = res.data.data.siteName;
          that.siteLocalhost = res.data.data.siteLocalhost;
          that.appName = res.data.data.appName;
          that.siteLocalhost = res.data.data.siteLocalhost;
          that.appName = res.data.data.appName;
          that.weiChantName = res.data.data.weiChantName;
          that.informantionUrl = res.data.data.informantionUrl;
          that.complaintPhone = res.data.data.complaintPhone;
        })
      },
      clickFun1(number) {
        let id = number.productSelectId;
        this.productSelectId = id;
        console.log(id);
        this.cur = 2;
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/productSelect/Info?productSelectId=" + id).then(function (res) {
          that.productName = res.data.data.productName;
          that.productId = res.data.data.productId;
          that.productCompany = res.data.data.productCompany;
          that.noOneCategory = res.data.data.noOneCategory;
          that.labelCategory = res.data.data.labelCategory;
          that.isSale = res.data.data.isSale;
          that.age = res.data.data.age;
          that.payDeadLine = res.data.data.payDeadLine;
          that.guaranteeperiod = res.data.data.guaranteeperiod;
          that.basicPremium = res.data.data.basicPremium;
          that.observationperiod = res.data.data.observationperiod;
          that.insuradAge = res.data.data.insuradAge;
          that.paymentDeadline = res.data.data.paymentDeadline;
          that.guaranteePeriod1234234 = res.data.data.guaranteePeriod1;
          that.basicPremium1 = res.data.data.basicPremium1;
          that.observationperiod1111 = res.data.data.observationperiod1;
          that.insuranceRequirements = res.data.data.insuranceRequirements;
          that.healthNotice = res.data.data.healthNotice;
          that.guaranteedContent1 = res.data.data.guaranteedContent1;
          that.donTAnyNt = res.data.data.donTAnyNt;
        })
      },
      closeShadow() {
        this.dialogVisible = false;
      },
      success() {
        this.dialogVisible = false;
        // 判断
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/test").then(function (res) {
          if (res.data.states == "200") {
            that.$message("删除成功");
            that.cur = "0";
          }
          if (res.data.states == "500") {
            that.$message("删除失败");
            that.cur = "0";
          }
        })
        axios.get("http://mock-api.com/wz2vlNzL.mock/companySelect?number=01").then(function (res) {
          that.tableDataCompanySelect = res.data.data;
          that.$emit("changeData", res.data.data);
        })
      },
      cancel() {
        this.dialogVisible = false;
        this.dialogVisible1 = false;
      },
      summit() {
        console.log(this.UserDialogId);
        console.log(this.UserDialogName);
        console.log(this.UserDialogReason);
        let dataJson = JSON.parse("{\n" +
            "\t\"UserDialogId\": \"" + this.UserDialogId + "\",\n" +
            "\t\"UserDialogName\": \"" + this.UserDialogName + "\",\n" +
            "\t\"UserDialogReason\": \"" + this.UserDialogReason + "\"\n" +
            "}")
        console.log(dataJson)
        let that = this;
        axios.post("http://mock-api.com/wz2vlNzL.mock/ublock/user", dataJson).then((res) => {
          console.log(res.data.status);
          if (res.data.status == 200) {
            that.$message('请求成功');
          }
          if (res.data.status == 500) {
            that.$message('请求失败');
          }
        })
      },
      search01() {
        console.log(this.UserDialogId);
        let DialogId = this.UserDialogId;
        let that = this;
        axios.get("http://mock-api.com/wz2vlNzL.mock/userName?userId=" + DialogId).then((res) => {
          console.log(res.data.data.userName);
          that.UserDialogName = res.data.data.userName;
        })
      },
      changePagOn(number) {
        this.$emit("changePagOn", number);
      },
      changePagUn(number) {
        this.$emit("changePagUn", number);
      },
      // 更改changPageNum
      changePageNum(number) {
        this.$emit("changePageNum", number);
      },
      // 更改页面数据
      changeDataPage(number) {
        this.$emit("changeDataPage", number)
      },
      // 上一页
      pageNo() {
        // 获取当前页
        if (this.pageNum == 1) {
          // 不做任何变动
        }
        if (this.pageNum == 2) {
          // 上一页变灰
          this.changePagOn(1);
          // 数据刷新
          this.changeDataPage(1);
          // 页数更改
          this.changePageNum(1);
        }
        // 其他数据
        if (this.pageNum > 2) {
          let tmp = this.pageNum - 1;
          this.changeDataPage(tmp)
          this.changePageNum(tmp);
        }
        // 如果是倒数第二页，下一页按钮变色
        let tmp1 = this.pageSizeNumber;
        if (this.pageNum == tmp1) {
          // 下一页按钮变色
          this.changePagUn(0);
        }
      },
      // 下一页
      pageUn() {
        // 如果当前页是最后一页
        if (this.pageNum == this.pageSizeNumber) {
          // 不做改变
        }
        // 如果是当前页是倒数第二页
        console.log(this.pageSizeNumber)
        let tmp = this.pageSizeNumber - 1;
        if (this.pageNum == tmp) {
          // 按钮变灰
          this.changePagUn(1);
          // 数据刷新
          this.changeDataPage(this.pageSizeNumber);
          // 数据更改
          this.changePageNum(this.pageSizeNumber);
        }
        // 其余页面
        if (this.pageNum < tmp && this.pageNum >= 1) {
          // 数据刷新
          tmp = Number(this.pageNum) + 1;
          this.changeDataPage(tmp);
          this.changePageNum(tmp);
        }
        // 第二页 按钮变色
        if (this.pageNum == 1) {
          this.changePagOn(0)
        }
      }
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

  a {
    color: #42b983;
  }

  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
  }

  .text01 .el-input-group {
    padding: 0px;
    width: 100%;
  }

  .el-image {
    margin: 30px;
  }
  .text01 .el-input-group__prepend{
    width: 150px;
  }
</style>

