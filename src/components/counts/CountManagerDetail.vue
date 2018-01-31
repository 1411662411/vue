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
                    prop="manager_name"
                    label="项目经理账户"
                    align="center"
                    width="258">
                </el-table-column>
                <el-table-column
                    prop="real_name"
                    label="项目经理姓名"
                    align="center"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="order_money"
                    label="销售总额(元)"
                    align="center"
                    width="267">
                </el-table-column>
                <el-table-column
                    width="218"
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                    <a 
                        href="javascript:;" 
                        style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                        @click="countSaleDetail(scope.$index, tableData,scope.row)">
                        查看
                    </a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { detail } from "../../api/counts/Count.js";
export default {
  data() {
    return {
      PageName: "业绩详情-项目经理",
      BackName: "返回",
      RefreshName: "刷新",
      month: 1,
      year: "2017",
      tableData: []
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkToken"]),
    countSaleDetail(i, t, r) {
      localStorage.setItem('managerId',r.id)
      localStorage.setItem('managerName',r.real_name)
      this.$router.push({
        name: "countsaledetail",
        params: {
          ids: r.real_name
        }
      });
    },
    getData(year) {
      var that = this;
      that.$store.dispatch('checkToken',localStorage.getItem('data'))
      that.month = localStorage.getItem('month');
      that.year = localStorage.getItem('year');
      detail({
        params: {
          token: that.$store.state.token,
          year: that.year,
          month: that.month
        }
      }).then(res => {
        console.log(res)
        that.tableData = res;
      });
    }
  },
  created() {
    this.getData();
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
