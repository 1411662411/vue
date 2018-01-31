<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <!-- 订单切换 -->
        <div class="buttons">
          <el-button @click="getData(0)" :class="{'btnColor':btns == 0}">全部退款(<span :class="{'btnColor':btns == 0,'btn-red': btns != 0}">{{this.$data.states.zero}}</span>)</el-button>
          <el-button @click="getData(2)" :class="{'btnColor':btns == 2}">待处理(<span :class="{'btnColor':btns == 2,'btn-red': btns != 2}">{{this.$data.states.two}}</span>)</el-button>
          <el-button @click="getData(3)" :class="{'btnColor':btns == 3}">已拒绝(<span :class="{'btnColor':btns == 3,'btn-red': btns != 3}">{{this.$data.states.three}}</span>)</el-button>
          <el-button @click="getData(4)" :class="{'btnColor':btns == 4}">已完成(<span :class="{'btnColor':btns == 4,'btn-red': btns != 4}">{{this.$data.states.four}}</span>)</el-button>
        </div>
        <!-- 搜索框 -->
        <!-- <div style="1100px;height:60px;line-height:60px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;">
          <div style="margin-top: 15px;width:385px;margin-top:0px;margin-left:20px;float:left;">
            <el-input placeholder="退款编号/申请时间/用户帐号" v-model="input4">
              <template slot="append"><el-button type="primary">搜索</el-button></template>
            </el-input>
          </div>
          <div style="float:right;">
            <el-date-picker
              v-model="value9"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              default-value="2010-10-01">
            </el-date-picker>
            <el-button style="margin-right:20px;margin-left:5px;">导出订单</el-button>
          </div>
        </div> -->
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="order_id"
            label="序号"
            align="center"
            width="49">
          </el-table-column>
          <el-table-column
            prop="refund_sn"
            label="退款编号"
            align="center"
            width="134">
          </el-table-column>
          <el-table-column
            prop="apply_at"
            align="center"
            label="申请时间"
            width="208">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户帐昵称"
            align="center"
            width="121">
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            align="center"
            label="用户类型"
            width="122"> -->
          </el-table-column>
          <el-table-column
            prop="refund_price"
            label="退款金额"
            align="center"
            width="116">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            label="申请状态"
            width="125">
          </el-table-column>
          <el-table-column
            prop="handle_at"
            label="处理时间"
            align="center"
            width="212">
          </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="133">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;"
                @click="lookRefundDetail(scope.$index, tableData,scope.row)">
                查看详情
              </a>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="float:right;margin-top:8px;margin-right:18px;"
          layout="total, prev, pager, next, jumper"
          :page-size="per_page"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { refundList, refundMap } from "../../api/orders/Order.js";
export default {
  data() {
    return {
      PageName: "退款申请",
      value9: "",
      input4: "",
      tableData: [],
      total: null,
      currentPage4: "",
      per_page: 1,
      states: {
        zero: 0,
        two: 0,
        three: 0,
        four: 0
      },
      status: null,
      btns: 1
    };
  },
  computed: {
    ...mapGetters(["ordersindex", "token"])
  },
  methods: {
    ...mapActions(["checkOrdersIndex"]),
    changeTime(val) {
      return new Date(parseInt(val) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
    lookRefundDetail(i, t, r) {
      console.log(r)
      this.$router.push({
        name: "orderrefunddetail",
        params: { id: r.refund_sn }
      });
    },
    handleSizeChange(val) {
      this.currentPage4 = val;
      this.getData(this.status);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getData(this.status);
    },
    getData(state) {
      this.status = state;
      this.btns = state;
      refundList({
        params: {
          token: localStorage.getItem("data"),
          status: state,
          page: this.currentPage4
        }
      }).then(res => {
        var arr = res.data.refund_list.data;
        for (var i = 0; i < arr.length; i++) {
          arr[i].apply_at = this.changeTime(arr[i].apply_at);
          if(arr[i].handle_at == 0) {
            arr[i].handle_at = '暂无';
          } else {
            arr[i].handle_at = this.changeTime(arr[i].handle_at);
          }
          if (arr[i].status == "2") {
            //状态判断
            arr[i].status = "待处理";
          } else if (arr[i].status == "3") {
            arr[i].status = "已拒绝";
          } else if (arr[i].status == "4") {
            arr[i].status = "已完成";
          }
        }
        this.$data.tableData = arr;
        this.$data.total = res.data.refund_list.total; //分页总数
        this.$data.per_page = res.data.refund_list.per_page; //分页总数
        console.log(res);
      });

      refundMap({ params: { token: localStorage.getItem("data") } })
        .then(res => {
          //统计
          var state = res.data;
          this.$data.states.zero = state[0];
          this.$data.states.two = state[2];
          this.$data.states.three = state[3];
          this.$data.states.four = state[4];
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkOrdersIndex", "/order/orderrefund");
  },
  created() {
    this.getData(0);
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
