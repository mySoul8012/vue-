<template>
    <div>
        <BoxHeader :msg="msg"></BoxHeader>
        <div>
            <el-container>
                <Menum @callFather="changeData"></Menum>
                <BoxIndex v-show="cur==0"></BoxIndex>
                <ProductSelect v-show="cur==1"></ProductSelect>
                <TitleManagement v-show="cur==2"  @func="getMsgFormSon" id="printTable" :tableData="tableData" :tabheight="tabheight"
                                 :tableHeader="tableHeader"
                                 :loading="loading" :isshow="isshow"></TitleManagement>
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
    export default {
        components: {
            TitleManagement,
            Menum,
            BoxIndex,
            BoxHeader,
            ProductSelect
        },
        data() {
            return {
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
        }
        },
        methods: {
            changeData(cur){
                console.log(444444);
                console.log(cur);
                this.cur = cur;
            }
        },
        created: function(){
            let that = this;
            axios.get("http://mock-api.com/wz2vlNzL.mock/ming").then(function (res) {
                console.log(res.data);
                console.log(that.msg);
                that.tableData = res.data;
            })

        }
    }
</script>
