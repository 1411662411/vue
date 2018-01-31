<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <!-- 导出数据 -->
        <div style="1100px;height:60px;line-height:60px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;margin-top:20px;">
          <div style="float:right;">
            <el-date-picker
              v-model="value1"
              type="year"
              placeholder="选择年"
              format="yyyy 年"
              @change='changeYear'
              style="margin-right:20px;"
              value-format="yyyy">
            </el-date-picker>
            <!-- <el-button style="margin-right:20px;margin-left:5px;">导出数据</el-button> -->
          </div>
        </div>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            type="index"
            align="center"
            width="369">
          </el-table-column>
          <el-table-column
            prop="data"
            label="销售总额(元)"
            align="center"
            width="329">
          </el-table-column>
          <el-table-column
            width="400"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click="countManagerDetail(scope.$index, tableData,scope.row)">
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
import { index } from "../../api/counts/Count.js";
export default {
  data() {
    return {
      PageName: "业绩统计",
      value1: "2017",
      month: 1,
      tableData: [],
      thisToken: ''
    };
  },
  computed: {
    ...mapGetters(["countsindex", "token"])
  },
  methods: {
    ...mapActions(["checkCountsIndex", "checkToken"]),
    countManagerDetail(i, t, r) {
      localStorage.setItem('month',(i + 1));
      localStorage.setItem('year',this.value1);
      this.$router.push({
        name: "countmanagerdetail",
        params: { id:i+1 }
      });
    },
    getData(year, month) {
      // this.$store.dispatch('checkToken',localStorage.getItem('data'))
      index({
        params: {
          token: this.thisToken,
          year: year,
          month: month
        }
      }).then(res => {
        // console.log(res)
        this.tableData.push(res);
        this.month++;
        if (month < 12) {
          this.getData(year, this.month);
        }
      });
    },
    changeYear() {
      var that = this;
      that.tableData = [];
      that.month = 1;
      that.getData(this.value1, this.month);
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkCountsIndex", "/count/countachieve");
  },
  created() {
    var year = new Date().getFullYear();
    this.$data.value1 = String(year);
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.changeYear();
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
