<template>
    <div>
        <BoxHeader :msg="msg"></BoxHeader>
        <div>
            <el-container>
                <Menum @callFather="changeData"></Menum>
                <BoxIndex v-show="cur==0"></BoxIndex>
                <ProductSelect v-show="cur==1" @func="getMsgFormSon" id="printTable6" :tableData="tableDataProductSelect" :tabheight="tabheight"
                               :tableHeader="tableHeaderProductSelect"
                               :loading="loading" :isshow="isshow"
                               :pagUn="pagUnProductSelect"
                               :pageSizeNumber="pageSizeNumberProductSelect"
                               :pagOn="pagOnProductSelect" @changePagOn="changePagOnProductSelect"
                               @changePagUn="changePagUnProductSelect"
                               @changeData="changeDataProductSelect"
                               :pageNum="pageNumProductSelect" @changePageNum="changePageNumProductSelect" @changeDataPage="changeDataPageProductSelect"
                ></ProductSelect>
                <TitleManagement v-show="cur==2"  @func="getMsgFormSon" id="printTable" :tableData="tableData" :tabheight="tabheight"
                                 :tableHeader="tableHeader"
                                 :loading="loading" :isshow="isshow"
                                 :pagUn="pagUn"
                                 :pageSizeNumber="pageSizeNumber"
                                 :pagOn="pagOn" @changePagOn="changePagOn"
                                 @changePagUn="changePagUn"
                                 :pageNum="pageNum" @changePageNum="changePageNum" @changeDataPage="changeDataPage"
                ></TitleManagement>
                <AnswerManament v-show="cur==31"
                                @func="getMsgFormSon" id="printTable1" :tableData="tableDataAnswer" :tabheight="tabheight"
                                :tableHeader="tableHeaderAnswer"
                                :loading="loading" :isshow="isshow"
                                :pagUn="pagUnAnswer"
                                :pageSizeNumber="pageSizeNumberAnswer"
                                :pagOn="pagOnAnswer" @changePagOn="changePagOnAnswer"
                                @changePagUn="changePagUnAnswer"
                                :pageNum="pagNumAnswer" @changePageNum="changePageNumAnswer" @changeDataPage="changeDataPageAnswer"
                                @changeTableDataAnswer="changeTableDataAnswer" :options="options" @changePageSizeNumberAnswer="changePageSizeNumberAnswer"
                                :value="value" @changeValue="changeValue"
                ></AnswerManament>
                <QuestionManament v-show="cur==32"
                                @func="getMsgFormSon" id="printTable2" :tableData="tableDataQuestion" :tabheight="tabheight"
                                :tableHeader="tableHeaderQuestion"
                                :loading="loading" :isshow="isshow"
                                :pagUn="pagUnQuestion"
                                :pageSizeNumber="pageSizeNumberQuestion"
                                :pagOn="pagOnQuestion" @changePagOn="changePagOnQuestion"
                                @changePagUn="changePagUnQuestion"
                                :pageNum="pagNumQuestion" @changePageNum="changePageNumQuestion" @changeDataPage="changeDataPageQuestion"
                                @changeTableDataAnswer="changeTableDataQuestion" :options="optionsQuestion" @changePageSizeNumberAnswer="changePageSizeNumberQuestion"
                                :value="valueQuestion" @changeValue="changeValueQuestion"
                ></QuestionManament>
                <ProductData v-show="cur==41"
                             @func="getMsgFormSon" id="printTable3" :tableData="tableDataProduct" :tabheight="tabheight"
                             :tableHeader="tableHeaderProduct"
                             :loading="loading" :isshow="isshow"
                             :pagUn="pagUnProduct"
                             :pageSizeNumber="pageSizeNumberProduct"
                             :pagOn="pagOnProduct" @changePagOn="changePagOnProduct"
                             @changePagUn="changePagUnProduct"
                             :pageNum="pagNumProduct" @changePageNum="changePageNumProduct" @changeDataPage="changeDataPageProduct"
                             @changeTableDataAnswer="changeTableDataProduct" :options="optionsQuestion" @changePageSizeNumberAnswer="changePageSizeNumberQuestion"
                             :value="valueQuestion" @changeValue="changeValueQuestion"></ProductData>
                <CompanyData v-show="cur==42"
                             @func="getMsgFormSon" id="printTable4" :tableData="tableDataCompany" :tabheight="tabheight"
                             :tableHeader="tableHeaderCompany"
                             :loading="loading" :isshow="isshow"
                             :pagUn="pagUnCompany"
                             :pageSizeNumber="pageSizeNumberCompany"
                             :pagOn="pagOnCompany" @changePagOn="changePagOnCompany"
                             @changePagUn="changePagUnCompany"
                             :pageNum="pagNumCompany" @changePageNum="changePageNumCompany" @changeDataPage="changeDataPageProduct"
                             @changeTableDataAnswer="changeTableDataCompany" :options="optionsCompany" @changePageSizeNumberAnswer="changePageSizeNumberCompany"
                             :value="valueCompany" @changeValue="changeValueQuestion"></CompanyData>
                <InsuranceConsultantManagement
                    v-show="cur==22"   @func="getMsgFormSon" id="printTable5" :tableData="tableDataInsuranceConsultantManagement" :tabheight="tabheight"
                    :tableHeader="tableHeaderInsuranceConsultantManagement"
                    :loading="loading" :isshow="isshow"
                    :pagUn="pagUnInsuranceConsultantManagement"
                    :pageSizeNumber="pageSizeNumberInsuranceConsultantManagement"
                    :pagOn="pagOnInsuranceConsultantManagement" @changePagOn="changePagOnInsuranceConsultantManagement"
                    @changePagUn="changePagUnInsuranceConsultantManagement"
                    :pageNum="pagNumInsuranceConsultantManagement" @changePageNum="changePageNumInsuranceConsultantManagement" @changeDataPage="changeDataPageInsuranceConsultantApplication"
                    @changeTableDataAnswer="changeTableDataInsuranceConsultantManagement" :options="optionsInsuranceConsultantManagement" @changePageSizeNumberAnswer="changePageSizeNumberCompany"
                    :value="valueInsuranceConsultantManagement" @changeValue="changeValueQuestion"
                ></InsuranceConsultantManagement>
                <InsuranceConsultantApplication v-show="cur==23"
                                                @func="getMsgFormSon" id="printTable8" :tableData="tableDataInsuranceConsultantApplication" :tabheight="tabheight"
                                                :tableHeader="tableHeaderInsuranceConsultantApplication"
                                                :loading="loading" :isshow="isshow"
                                                :pagUn="pagUnInsuranceConsultantApplication"
                                                :pageSizeNumber="pageSizeNumberInsuranceConsultantApplication"
                                                :pagOn="pagOnInsuranceConsultantApplication" @changePagOn="changePagOnInsuranceConsultantApplication"
                                                @changePagUn="changePagUnInsuranceConsultantApplication"
                                                :pageNum="pagNumInsuranceConsultantApplication" @changePageNum="changePageNumInsuranceConsultantApplication" @changeDataPage="changeDataPageInsuranceConsultantApplication"
                                                @changeTableDataAnswer="changeTableDataInsuranceConsultantApplication" :options="optionsInsuranceConsultantManagement" @changePageSizeNumberAnswer="changePageSizeNumberApplication"
                                                :value="valueInsuranceConsultantManagement" @changeValue="changeValueQuestion"
                >
                </InsuranceConsultantApplication>
                <CompanySelect v-show="cur==51" @func="getMsgFormSon" id="printTable10" :tableData="tableDataCompanySelect" :tabheight="tabheight"
                               :tableHeader="tableHeaderCompanySelect"
                               :loading="loading" :isshow="isshow"
                               :pagUn="pagUnCompanySelect"
                               :pageSizeNumber="pageSizeNumberCompanySelect"
                               :pagOn="pagOnCompanySelect" @changePagOn="changePagOnCompanySelect"
                               @changePagUn="changePagUnCompanySelect"
                               @changeData="changeDataCompanySelect"
                               :pageNum="pageNumCompanySelect" @changePageNum="changePageNumCompanySelect" @changeDataPage="changeDataPageCompanySelect"
                ></CompanySelect>
                <Brokers v-show="cur==61">

                </Brokers>
            </el-container>
        </div>
    </div>
</template>
<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
    }
    .el-aside {
        color: #333;
    }
</style>
<script>
    import Menum from "../components/Menum";
    import BoxIndex from "../components/BoxIndex";
    import BoxHeader from "../components/BoxHeader";
    import ProductSelect from "../components/ProductSelect";
    import TitleManagement from "../components/TitleManagement";
    import axios from 'axios'
    import AnswerManament from "../components/AnswerManament";
    import QuestionManament from "../components/QuestionManament";
    import ProductData from "../components/ProductData";
    import CompanyData from "../components/CompanyData";
    import InsuranceConsultantManagement from "../components/InsuranceConsultantManagement"
    import InsuranceConsultantApplication from "../components/InsuranceConsultantApplication";
    import CompanySelect from "../components/CompanySelect";
    import Brokers from "../components/Brokers";
    export default {
        components: {
            Brokers,
            InsuranceConsultantApplication,
            InsuranceConsultantManagement,
            CompanyData,
            ProductData,
            AnswerManament,
            TitleManagement,
            Menum,
            BoxIndex,
            BoxHeader,
            ProductSelect,
            QuestionManament,
            CompanySelect
        },
        data() {

            return {
                pageSizeNumberCompanySelect: "",
                pageNumCompanySelect: "1",
                pagUnCompanySelect: "0",
                pagOnCompanySelect: "1",
                tableHeaderCompanySelect: [      // 表头
                    {prop: 'comapnyId', label: '公司ID'},
                    {prop: 'name', label: '公司简称'},
                    {prop: 'name', label: '公司全称'},
                    {prop: 'phone', label: '一级分类'},
                    {
                        prop: 'oper', label: '操作', fixed: 'right', minWidth: '160px', width: '160px',
                        oper: [
                            {name: '查看', style: 'primary', clickFun: (this.handleClick, "1")}
                            ]
                    }
                ],
                tableDataCompanySelect: "",
                pagNumInsuranceConsultantApplication: "1",
                pagUnInsuranceConsultantApplication: "0",
                pagOnInsuranceConsultantApplication: "1",
                pageSizeNumberInsuranceConsultantApplication: "",
                tableHeaderInsuranceConsultantApplication: [      // 表头
                    {prop: 'name', label: '姓名'},
                    {prop: 'idCard', label: '身份证号'},
                    {prop: 'time', label: '申请时间'},
                    {prop: 'phone', label: '手机号'},
                    {prop: 'company', label: '所属公司'},
                    {
                        prop: 'oper', label: '操作', fixed: 'right', minWidth: '160px', width: '160px',
                        oper: [
                            {name: '通过', style: 'primary', clickFun: this.handleClick},
                            {name: '拒绝', style: 'primary', clickFun: this.handleClick},
                        ]
                    }
                ],
                tableDataInsuranceConsultantApplication: "",
                pagNumInsuranceConsultantManagement: "1",
                pagUnInsuranceConsultantManagement: "0",
                pagOnInsuranceConsultantManagement: "1",
                tableDataInsuranceConsultantManagement: "",
                pageSizeNumberInsuranceConsultantManagement: "1",
                tableHeaderInsuranceConsultantManagement: [      // 表头
                    {prop: 'userId', label: '用户ID'},
                    {prop: 'userName', label: '姓名'},
                    {prop: 'IdCard', label: '身份证号'},
                    {prop: 'time', label: '认证时间'},
                    {prop: 'phoneNumber', label: '手机号'},
                    {prop: 'company', label: '所属公司'},
                    {prop: 'type', label: '类型'}
                ],
                pageSizeNumberProductSelect: "",
                pagUnProductSelect: "0",
                pagOnProductSelect: "1",
                pageNumProductSelect: "1",
                tableHeaderProductSelect: [      // 表头
                    {prop: 'insuranceID', label: '保险ID'},
                    {prop: 'insuranceProduct', label: '保险产品'},
                    {prop: 'insuranceCompany', label: '保险公司'},
                    {prop: 'firstClassifiCation', label: '一级分类'},
                    // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
                    {
                        prop: 'oper', label: '操作', fixed: 'right', minWidth: '160px', width: '160px',
                        oper: [
                            {name: '查看', style: 'primary', clickFun: this.handleClick},
                        ]
                    }
                ],
                tableDataProductSelect: "",
                valueCompany: "",
                optionsCompany: "",
                pagNumCompany: "1",
                pagOnCompany: "1",
                pagUnCompany: "0",
                pageSizeNumberCompany: "",
                tableDataCompany: "",
                tableHeaderCompany: [      // 表头
                    {prop: 'Company', label: '保险公司'},
                    {prop: 'browse', label: '浏览'},
                    {prop: 'favorites', label: '收藏'},
                    {prop: 'mouth', label: '口碑'},
                    {prop: 'interpretation', label: '解读'},
                    {prop: 'reviewLike', label: '点评获赞'}
                ],
                pagNumProduct: "1",
                pageSizeNumberProduct: "1",
                pagUnProduct: 0,
                pagOnProduct: 1,
                tableDataQuestion: "",
                tableHeaderQuestion: [      // 表头
                    {prop: 'UserQuestionId', label: '用户ID'},
                    {prop: 'UserQuestionName', label: '用户昵称'},
                    {prop: 'UserQuestionProductId', label: '保险ID'},
                    {prop: 'UserQuestionProductName', label: '保险产品'},
                    {prop: 'UserQuestionProductTime', label: '回答时间'},
                    {prop: 'UserQuestionProductAnswer', label: '问题'},
                    {prop: "UserQuestionStates", label: "状态"},
                    // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
                    {
                        prop: 'oper', label: '操作', fixed: 'right', minWidth: '160px', width: '160px',
                        oper: [
                            {name: '查看', style: 'primary', clickFun: this.handleClick}
                        ]
                    }
                ],
                tableHeaderProduct: [
                    {prop: 'insuranceID', label: '保险ID'},
                    {prop: 'insuranceProduct', label: '保险产品'},
                    {prop: 'insuranceCompany', label: '保险公司'},
                    {prop: 'browse', label: '浏览'},
                    {prop: 'favorites', label: '收藏'},
                    {prop: 'wordMouth', label: '口碑'},
                    {prop: "interpretaion", label: "解读"},
                    {prop: "reviewsLike", label: "点评赞"},
                    {prop: "question", label: "问题"},
                    {prop: "answer", label: "回答"},
                    {prop: "answerLike", label: "问答赞"}
                ],
                pagUnQuestion: 0,
                pageSizeNumberQuestion: 1,
                pagNumQuestion: 1,
                pagOnQuestion: 1,
                value: "",
                options: "",
                pagNumAnswer: 1,
                pageSizeNumberAnswer: 0,
                pagOnAnswer: 0,
                pagUnAnswer: 0,
                pageNum: 1,
                pageSizeNumber: 0,
                pagOn: 0,
                pagUn: 0,
                optionsQuestion: "",
                valueQuestion: "",
                msg: 'https://www.iming.info/',
                cur: 0,
                loading: false,
                isshow: true,
                tabheight: '100%', // 表格高度，这里是做了自适应高度，正常是需要写固定值的
                tableHeader: [      // 表头
                    {prop: 'UserId', label: '用户ID'},
                    {prop: 'UserName', label: '用户昵称'},
                    {prop: 'Time', label: '封号时间'},
                    {prop: 'Notes', label: '原因备注'},
                    // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
                    {
                        prop: 'oper', label: '操作', fixed: 'right', minWidth: '160px', width: '160px',
                        oper: [
                            {name: '解封', style: 'primary', clickFun: this.handleClick}
                        ]
                    }
                ],
                tableData: [
                ],
                tableHeaderAnswer: [      // 表头
                    {prop: 'userId', label: '用户ID'},
                    {prop: 'userName', label: '用户昵称'},
                    {prop: 'productId', label: '保险ID'},
                    {prop: 'productName', label: '保险名称'},
                    {prop: 'productTime', label: '问题时间'},
                    {prop: 'answer', label: '问题'},
                    {prop: 'status', label: '状态'},
                    // 此处为操作栏，不需要可以删除，clickFun绑定此操作按钮的事件
                    {
                        prop: 'oper', label: '操作', fixed: 'right', minWidth: '160px', width: '160px',
                        oper: [
                            {name: '查看', style: 'primary', clickFun: this.handleClick},
                            {name: '编辑', style: 'primary', clickFun: this.handleClick}
                        ]
                    }
                ],
                tableDataAnswer: [
                ],
                tableDataProduct: [
                ]
        }
        },
        methods: {
            changeDataPageInsuranceConsultantApplication(number){
              this.tableDataInsuranceConsultantApplication = "";
              let that = this;
              axios.get("http://mock-api.com/wz2vlNzL.mock/InsuranceConsultantApplication?number=" + "" + "0" + String(number)).then(function (res) {
                  that.tableDataInsuranceConsultantApplication = res.data.data;
              })
            },
            changePageNumCompanySelect(number){
                this.pageNumCompanySelect = number;
            },
            changePagUnCompanySelect(number){
              this.pagUnCompanySelect = number;
            },
            changePagOnCompanySelect(number){
                this.pagOnCompanySelect = number;
            },
            changeDataCompanySelect(number){
                this.tableDataCompanySelect = number;
            },
            changePageNumInsuranceConsultantApplication(number){
              this.pagNumInsuranceConsultantApplication = number;
            },
            changePagOnInsuranceConsultantApplication(number){
                this.pagOnInsuranceConsultantApplication = number;
            },
            changePagUnInsuranceConsultantApplication(number){
                this.pagUnInsuranceConsultantApplication = number;
            },
            changeTableDataInsuranceConsultantManagement(number){
              this.tableDataInsuranceConsultantManagement = number;
            },
            changeDataPageInsuranceConsultantManagement(number){
              console.log(this.tableDataInsuranceConsultantManagement);
              let that = this;
              axios.get("http://mock-api.com/wz2vlNzL.mock/insuranceConsultantManagement?pageNum=" + number).then(function (res) {
                  that.tableDataInsuranceConsultantManagement = res.data.data;
              })
            },
            changePageNumInsuranceConsultantManagement(number){
              this.pagNumInsuranceConsultantManagement = number;
            },
            changePagUnInsuranceConsultantManagement(number){
                this.pagUnInsuranceConsultantManagement = number;
            },
            changePagOnInsuranceConsultantManagement(number){
                this.pagOnInsuranceConsultantManagement = number;
            },
            changeDataProductSelect(number){
                this.tableDataProductSelect = number;
            },
            changeDataPageProductSelect(number){
                this.tableDataProductSelect = number;
                let that = this;
                axios.get("http://mock-api.com/wz2vlNzL.mock/productSelect?pageNum=" + number).then(function (res) {
                    that.tableDataProductSelect = res.data.data;
                })
            },
            changeDataPageCompanySelect(number){
                this.tableDataCompanySelect = number;
                let that = this;
                axios.get("http://mock-api.com/wz2vlNzL.mock/companySelect?number=" +  "0"  + String(number)).then(function (res) {
                    that.tableDataCompanySelect = res.data.data;
                })
            },
            changePageNumProductSelect(number){
                this.pageNumProductSelect = number;
            },
            changePagOnProductSelect(number){
                this.pagOnProductSelect = number;
            },
            changePagUnProductSelect(number){
                this.pagUnProductSelect = number;
            },
            changePageNumCompany(number){
                this.pagNumCompany = number;
            },
            changePagUnCompany(number){
              this.pagUnCompany = number;
            },
            changePagOnCompany(number){
                this.pagOnCompany = number;
            },
            changePageSizeNumberCompany(number){
                this.pageSizeNumberCompany = number;
            },
            changeTableDataCompany(number){
                this.tableDataCompany = number;
            },
            changeDataPageProduct(number){
                let that = this;
                axios.get("http://mock-api.com/wz2vlNzL.mock/product?number=" + number).then(function (res) {
                    that.tableDataProduct = res.data.data;
                })
            },
            changePagUnProduct(number){
                this.pagUnProduct = number;
            },
            changePageNumProduct(number){
                this.pagNumProduct = number;
            },
            changePagOnProduct(number){
                this.pagOnProduct = number;
            },
            changeData(cur){
                console.log(444444);
                console.log(cur);
                this.cur = cur;
            },
            changePagOn(pagOn){
                this.pagOn = pagOn;
            },
            changePagUn(pagUn){
                this.pagUn = pagUn;
            },
            changePageNum(pageNum){
                this.pageNum = pageNum;
            },
            changeDataPage(number){
                // 更改table里的数据
                let that = this;
                axios.get("http://mock-api.com/wz2vlNzL.mock/title?pageNum=" + number +"&pageSize=10").then(function (res) {
                    console.log(res.data);
                    console.log(that.msg);
                    that.tableData = res.data;
                })
            },
            changePagOnQuestion(pagOn){
                this.pagOnQuestion = pagOn;
                console.log("------------------+++++++++++++++++++++++++++++++++++++++++")
                console.log(pagOn);
            },
            changePagUnQuestion(pagUn){
                this.pagUnQuestion = pagUn;
            },
            changePageNumQuestion(pageNum){
                this.pagNumQuestion = pageNum;
            },
            changePagOnAnswer(pagOn){
                this.pagOnAnswer = pagOn;
            },
            changePagUnAnswer(pagUn){
                this.pagUnAnswer = pagUn;
            },
            changePageNumAnswer(pageNum){
                this.pagNumAnswer = pageNum;
            },
            changeDataPageAnswer(number){
                // 更改table里的数据
                let that = this;
                console.log("---------------------------------------------------")
                if(this.value == "" || this.value == "ming0"){
                    axios.get("http://mock-api.com/wz2vlNzL.mock/answerManagement?number=" + number +"&size=10").then(function (res) {
                        console.log(res.data);
                        console.log(that.msg);
                        that.tableDataAnswer = res.data;
                    })
                }else if(this.value == "ming1"){
                    axios.get("http://mock-api.com/wz2vlNzL.mock/answerManagement?number=" + number +"&size=10&options=ming1").then(function (res) {
                        console.log(res.data);
                        console.log(that.msg);
                        that.tableDataAnswer = res.data;
                    })
                }
            },
            changeDataPageQuestion(number){
                let that = this;
                console.log(this.valueQuestion)
                if(this.valueQuestion == "ming1" || this.valueQuestion == "") {
                    axios.get("http://mock-api.com/wz2vlNzL.mock/question/list?pageNo=" + number).then(function (res) {
                        console.log(res.data.data);
                        that.tableDataQuestion = res.data.data;
                    })
                }
                if(this.valueQuestion == "ming2"){
                    axios.get("http://mock-api.com/wz2vlNzL.mock/question/list?pageNo="+  number +"&state=ming2").then(function (res) {
                        that.tableDataQuestion = res.data.data;
                    })
                }
                if(this.valueQuestion == "ming3"){
                    axios.get("http://mock-api.com/wz2vlNzL.mock/question/list?pageNo="+  number +"&state=ming3").then(function (res) {
                        that.tableDataQuestion = res.data.data;
                    })
                }
            },
            changeTableDataQuestion(tableDataQuestion){
              this.tableDataQuestion = tableDataQuestion;
            },
            changeTableDataAnswer(tableDataAnswer){
                this.tableDataAnswer = tableDataAnswer;
            },
            changePageSizeNumberAnswer(number){
                this.pageSizeNumberAnswer = number;
            },
            changeValue(value){
                this.value = value;
            },
            changeValueQuestion(value){
                console.log(value + "++++++++++++++++++++++++++++++++++++++")
                this.valueQuestion = value;
                console.log(this.valueQuestion);
            },
            changePageSizeNumberQuestion(number){
                this.pageSizeNumberQuestion = number;
            },
            changeTableDataProduct(table){
                this.tableDataProduct = table;
            }
        },
        created: function(){
            let that = this;
            axios.get("http://mock-api.com/wz2vlNzL.mock/title?pageNum=" +  1 +"&pageSize=10").then(function (res) {
                console.log(res.data);
                console.log(that.msg);
                that.tableData = res.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/pageNumber").then(function (res) {
                console.log(that.pageSizeNumber = res.data.data.pageSizeNumber)
                console.log(res.data.data.pageSizeNumber);
                console.log(that.pageSizeNumber)
                // 如果为首页，按钮不可用
                if(that.pageNum == 1){
                    that.pagOn = 1;
                }
                // 如果为页尾，按钮不可用
                if(that.pageSizeNumber == that.pageNum){
                    that.pagUn = 1;
                }
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/answerManagement?number=1&size=10").then(function (res) {
                that.tableDataAnswer = res.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/company/page?number=1").then(function (res) {
                that.tableDataCompany = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/answer/pageNumber").then(function (res) {
                that.pageSizeNumberAnswer = res.data.data.pageSizeNumber;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/product/numberPag").then(function (res) {
                that.pageSizeNumberCompany = res.data.data.pageSizeNumber;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/answer/status").then(function (res) {
                that.options = res.data.data.options;
                console.log(res)
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/question/list?pageNo=" + "1").then(function (res) {
                that.tableDataQuestion = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/Question/pageSIzeNumberQuestion").then(function (res) {
                that.pageSizeNumberQuestion = res.data.data.pageSizeNumberQuestion;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/question/states").then(function (res) {
                that.optionsQuestion = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/product?number=1").then(function (res) {
                that.tableDataProduct = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/product/numberPag").then(function (res) {
                that.pageSizeNumberProduct = res.data.data.pageSizeNumber;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/productSelect?pageNum=1").then(function (res) {
                that.tableDataProductSelect = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/productSelect/numberPag").then(function (res) {
                that.pageSizeNumberProductSelect = res.data.data.pageSizeNumber;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/insuranceConsultantManagement?pageNum=1").then(function (res) {
                that.tableDataInsuranceConsultantManagement = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/InsuranceConsultantManagement/pagNumSize").then(function (res) {
                that.pageSizeNumberInsuranceConsultantManagement = res.data.data.pageSizeNumber;
            })
            axios.get(process.env.VUE_APP_SERVER_URL + "/applicationBrokers?page=1&limit=1").then(function (res) {
                that.tableDataInsuranceConsultantApplication = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/InsuranceConsultantApplication/pagNumSize").then(function (res) {
                that.pageSizeNumberInsuranceConsultantApplication = res.data.data.pageSizeNumber;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/companySelect?number=01").then(function (res) {
                that.tableDataCompanySelect = res.data.data;
            })
            axios.get("http://mock-api.com/wz2vlNzL.mock/InsuranceSelectCompany/pagNumSize").then(function (res) {
                that.pageSizeNumberCompanySelect = res.data.data.pageSizeNumber;
            })
        }
    }
</script>
