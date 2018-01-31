<template>
    <div>
        <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
        <div class="w">
            <!-- 导出数据 -->
            <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;margin-top:20px;background-color: rgba(243, 243, 243, 1);">
                <p class="u50561">{{ year }}年{{month}}月</p>
                <!-- <div style="float:right;">
                    <el-button 
                        style="margin-right:20px;margin-left:5px;padding:8px 20px;border-radius:0;"
                        >
                        导出数据
                    </el-button>
                </div> -->
            </div>

            <!-- 表格 -->
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    align="center"
                    width="135">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="业务员账户"
                    align="center"
                    width="258">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="业务员姓名"
                    align="center"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="real_name"
                    label="所属项目经理"
                    align="center"
                    width="218">
                </el-table-column>
                <el-table-column
                    prop="total_price"
                    label="销售总额(元)"
                    align="center"
                    width="267">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { managerDetail } from "../../api/counts/Count.js";
export default {
    data() {
        return {
            PageName: '业绩详情-业务员',
            BackName: '返回',
            RefreshName: '刷新',
            tableData: [],
            month: 1,
            year: "2017",
            id: null
        }
    },
    computed : {
        ...mapGetters(['token'])
    },
    methods: {
        ...mapActions(["checkToken"]),
        getData() {
            this.$store.dispatch('checkToken',localStorage.getItem('data'))
            this.month = localStorage.getItem('month');
            this.year = localStorage.getItem('year');
            this.id = localStorage.getItem('managerId');
            managerDetail({
                params: {
                token: this.$store.state.token,
                year: this.year,
                month: this.month,
                id: this.id
                }
            }).then(res => {
                this.tableData = res.data.sale_statistics;
                for(var i=0;i<this.tableData.length;i++) {
                    this.tableData[i].real_name = localStorage.getItem('managerName');;
                }
            });
        }
    },
    created() {
        this.getData();
    },
    components: {
        Dingbu
    }
}
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
