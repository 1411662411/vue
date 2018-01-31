<template>
  <div class="orderlist">
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <!-- 订单切换 -->
        <div class="buttons">
          <el-button @click="getData('0')" :class="{'btnColor':btns == 0}">全部订单(<span :class="{'btnColor':btns == 0,'btn-red': btns != 0}">{{this.$data.states.zero}}</span>)</el-button>
          <el-button @click="getData('1')" :class="{'btnColor':btns == 1}">待付款(<span :class="{'btnColor':btns == 1,'btn-red': btns != 1}">{{this.$data.states.one}}</span>)</el-button>
          <el-button @click="getData('2')" :class="{'btnColor':btns == 2}">待发货(<span :class="{'btnColor':btns == 2,'btn-red': btns != 2}">{{this.$data.states.two}}</span>)</el-button>
          <el-button @click="getData('3')" :class="{'btnColor':btns == 3}">已发货(<span :class="{'btnColor':btns == 3,'btn-red': btns != 3}">{{this.$data.states.three}}</span>)</el-button>
          <el-button @click="getData('4')" :class="{'btnColor':btns == 4}">已完成(<span :class="{'btnColor':btns == 4,'btn-red': btns != 4}">{{this.$data.states.four}}</span>)</el-button>
          <el-button @click="getData('7')" :class="{'btnColor':btns == 7}">已关闭(<span :class="{'btnColor':btns == 7,'btn-red': btns != 7}">{{this.$data.states.seven}}</span>)</el-button>
        </div>
        <!-- 搜索框 -->
        <!-- <div style="1100px;height:60px;line-height:60px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;">
          <div style="margin-top: 15px;width:385px;margin-top:0px;margin-left:20px;float:left;">
            <el-input placeholder="订单编号/下单时间/支付时间/用户编号" v-model="input4">
              <template slot="append"><el-button type="primary" @click="search">搜索</el-button></template>
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
            prop="id"
            label="序号"
            align="center"
            width="49">
          </el-table-column>
          <el-table-column
            prop="order_sn"
            label="订单编号"
            align="center"
            width="116">
          </el-table-column>
          <el-table-column
            prop="created_at"
            align="center"
            label="创建时间"
            width="156">
          </el-table-column>
          <el-table-column
            prop="pay_at"
            label="支付时间"
            align="center"
            width="144">
          </el-table-column>
          <el-table-column
            prop="user_name"
            align="center"
            label="用户昵称"
            width="105">
          </el-table-column>
          <el-table-column
            prop="total_price"
            label="订单金额"
            align="center"
            width="103">
          </el-table-column>
          <el-table-column
            prop="pay_type"
            align="center"
            label="支付方式"
            width="81">
          </el-table-column>
          <el-table-column
            prop="user_type"
            label="用户类型"
            align="center"
            width="117">
          </el-table-column>
          <el-table-column
            prop="pay_status"
            align="center"
            label="订单状态"
            width="90">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="137">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;"
                @click.prevent="lookOrderDetail(scope.$index, tableData,scope.row)">
                查看订单
              </a>
              <a v-show="scope.row.follow"
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;"
                @click="lookOrderFollow(scope.$index, tableData,scope.row)">
                订单跟踪
              </a>
              <a v-show="scope.row.close"
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;"
                @click="closeOrder(scope.$index, tableData,scope.row)">
                关闭订单
              </a>
              <a v-show="scope.row.send"
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;"
                @click="sureSend(scope.$index, tableData,scope.row)">
                订单发货
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

      <!-- 订单发货 -->
      <el-dialog title="确认发货" :visible.sync="dialogFormVisible">
          <el-form :model="form1">
              <el-form-item label="快递公司" :label-width="formLabelWidth">
                  <el-select v-model="form1.region" placeholder="请选择快递公司" style="width:70%;">
                      <el-option v-for="(expres, index) in express" :label="expres.name" :value="expres.ship_code" :key="expres.name"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="物流单号"  :label-width="formLabelWidth" >
                  <el-input v-model="form1.name1" auto-complete="off" style="width:70%;"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="success" @click="sendExpress">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>

import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  orderList,
  orderMap,
  track,
  ship,
  express,
  delOrder
} from "../../api/orders/Order.js";
export default {
  data() {
    return {
      PageName: "订单列表",
      value9: "",
      dialogFormVisible: false,
      formLabelWidth: "160px",
      express: [],
      form: {
        desc: "请输入关闭原因通知用户"
      },
      form1: {
        name1: "",
        region: ""
      },
      states: {
        zero: 0,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        seven: 0
      },
      input4: "",
      tableData: [],
      total: null,
      currentPage4: "",
      per_page: 1,
      order: {
        id: "",
        user_type: "",
        order_sn: ""
      },
      orderSn: "",
      pay_status: null,
      btns: 1
    };
  },
  computed: {
    ...mapGetters(["ordersindex", "token"])
  },
  methods: {
    ...mapActions(["checkOrdersIndex"]),
    //关闭订单
    closeOrder(i, t, r) {
      delOrder({ token: localStorage.getItem("data"), order_sn: r.order_sn })
        .then(res => {})
        .then(res => {
          this.getData("");
        });
    },
    changeTime(val) {
      var reg = /['上午'|'下午']/g;
      return new Date(parseInt(val) * 1000).toLocaleString();
    },
    lookOrderDetail(i, t, r) {
      this.$data.order.user_type = r.user_type;
      this.$data.order.id = r.id;
      localStorage.removeItem('orderSn')
      localStorage.setItem('orderSn',r.order_sn)
      this.$data.order.order_sn = r.order_sn;
      this.$router.push({
        name: "orderdetail",
        params: { id: this.$data.order.id }
      });
    },
    lookOrderFollow(i, t, r) {
      this.$data.order.user_type = r.user_type;
      this.$data.order.id = r.id;
      localStorage.removeItem('orderSn')
      localStorage.setItem('orderSn',r.order_sn)
      // this.$data.order.order_sn = r.order_sn;
      this.$router.push({
        name: "orderfollow",
        path: '/order/orderfollow'
      });
    },
    handleSizeChange(val) {
      this.currentPage4 = val;
      this.getData(this.pay_status);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getData(this.pay_status);
    },
    getData(pay_status) {
      this.pay_status = pay_status;
      this.btns = pay_status;
      var arr = [];
      orderList({
        params: {
          token: localStorage.getItem("data"),
          pay_status: pay_status,
          page: this.$data.currentPage4
        }
      })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            arr = res.data.order_list.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].user_type == 1) {
                arr[i].user_type = "普通用户";
              } else {
                arr[i].user_type = "代理商";
              }
              if (arr[i].pay_type == "1") {
                //支付种类的判断
                arr[i].pay_type = "微信支付";
              } else if (arr[i].pay_type == "2") {
                arr[i].pay_type = "货到付款";
              } else if (arr[i].pay_type == "3") {
                arr[i].pay_type = "线下支付";
              }
              arr[i].created_at = this.changeTime(arr[i].created_at);
              if(arr[i].pay_at == 0){
                arr[i].pay_at = '未支付';
                arr[i].pay_type = '无';
              }else{
                arr[i].pay_at = this.changeTime(arr[i].pay_at);
              }
              if (arr[i].pay_status == 1) {
                arr[i].pay_status = "待付款";
                arr[i].close = 1;
              } else if (arr[i].pay_status == 2) {
                arr[i].pay_status = "待发货";
                arr[i].send = 1;
              } else if (arr[i].pay_status == 3) {
                arr[i].pay_status = "已发货";
                arr[i].follow = 1;
              } else if (arr[i].pay_status == 4) {
                arr[i].pay_status = "已完成";
                arr[i].follow = 1;
              } else if (arr[i].pay_status == 7) {
                arr[i].pay_status = "已关闭";
              }
            }
            this.$data.tableData = arr;
            this.$data.total = res.data.order_list.total;
            this.$data.per_page = res.data.order_list.per_page;
          }
        })
        .catch(err => {
          console.log(err);
        });
      orderMap({ params: { token: localStorage.getItem("data") } })
        .then(res => {
          if (res.code == 0) {
            var state = res.data;
            this.$data.states.zero = state[0];
            this.$data.states.one = state[1];
            this.$data.states.two = state[2];
            this.$data.states.three = state[3];
            this.$data.states.four = state[4];
            this.$data.states.seven = state[7];
          }
        })
        .catch(err => {
          console.log(err);
        });
      return arr;
    },
    sureSend(i, t, r) {
      //发送快递
      // console.log(r)
      this.$data.orderSn = r.order_sn;
      this.$data.dialogFormVisible = true;
    },
    sendExpress() {
      if (
        this.checkNumber(this.$data.form1.name1) &&
        this.$data.form1.region !== ""
      ) {
        express({
          token: localStorage.getItem("data"),
          order_sn: this.$data.orderSn,
          ship_code: this.$data.form1.region,
          logistic_code: this.$data.form1.name1
        })
          .then(res => {
            console.log(res);
            this.$data.dialogFormVisible = false;
          })
          .then(res => {
            this.getData();
          });
      } else {
        alert("请选择快递公司！");
      }
    },
    getExpress() {
      //获取快递公司
      ship({ params: { token: localStorage.getItem("data") } }).then(res => {
        if (res.code == 0) {
          this.$data.express = res.data.ships;
        }
      });
    },
    checkNumber(val) {
      var reg = /^\d{1,}$/;
      return reg.test(val);
    }
  },
  components: {
    Dingbu
  },
  beforeCreate() {
    this.$store.dispatch("checkOrdersIndex", "/order/orderlist");
  },
  created() {
    this.getData("");
    this.getExpress();
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.orderlist {
  color: $color;
}
</style>
