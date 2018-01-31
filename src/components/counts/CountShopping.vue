<template>
  <div>
      <Dingbu :nameTitle='PageName' :refresh="RefreshName"></Dingbu>
      <div class="w">
        <!--<div id="u890_div">
          <el-button 
            :class="{'btnColor':btns == 0}"
            style="border-radius:0;margin:10px 0 0 15px;padding: 7px 25px;"
             >
            全部
          </el-button>
        </div>-->
        <!-- 表格 -->
        <!--<div class="main" style="margin-top:15px;">-->
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:15px;">
          <el-table-column
            label="排序"
            align="center"
            width="240"
            >
            <template slot-scope="scope">
            <span :class="{'one':scope.$index == 0,'two':scope.$index == 1,'three':scope.$index == 2}">
                {{scope.$index+1}}
            </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            align="center"
            width="507">
          </el-table-column>
          <el-table-column
            prop="sales"
            label="销量"
            align="center"
            width="351">
          </el-table-column>
        </el-table>
        <!--</div>-->
      </div>
  </div>
</template>


<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { good } from "../../api/counts/Count.js";
export default {
  data() {
    return {
      PageName: "商品统计",
      RefreshName: "刷新",
      tableData: [],
      thisToken: '',
      btns: 0
    };
  },
  computed: {
    ...mapGetters(["countsindex", "token"])
  },
  methods: {
    ...mapActions(["checkCountsIndex", "checkToken"]),
    getData() {
      good({
        params: {
          token: this.thisToken,
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.sale_statistics;
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkCountsIndex", "/count/countshopping");
  },
  created() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.getData();
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
#u890_div {
  width: 1100px;
  height: 50px;
  background-color: rgba(243, 243, 243, 1);
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  margin-top: 20px;
  border-bottom: 0;
}
.main {
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 10px 20px;
  min-height: 630px;
}
.one {
    color:#FF0000;
    font-weight:700;
}
.two {
    color:rgba(26, 188, 156, 1);
    font-weight:700;
}
.three {
    color:#0000FF;
    font-weight:700;
}
</style>
