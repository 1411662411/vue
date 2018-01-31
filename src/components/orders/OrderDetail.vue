<template>
    <div>
        <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
        <div class="w">
            <!-- 步骤条 -->
            <el-steps :active="active" align-center style="margin:30px 0;">
                <el-step title="提交订单" :description="tableData[0].created_at"></el-step>
                <el-step title="支付订单" :description="tableData[0].pay_at"></el-step>
                <el-step title="商家发货" :description="tableData[0].send_at"></el-step>
                <el-step title="确认收货" :description="tableData[0].confirm_at"></el-step>
            </el-steps>
            <!-- 订单状态 -->
            <div style="1100px;height:80px;line-height:80px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;background-color: rgba(243, 243, 243, 1);text-align:left;">
                <img src="../../images/mark.png" width="18" height="18" style="position:relative;left:35px;top:3px;"/>
                <span style="color:#F04844;font-size: 16px;font-weight: 400;padding-left:34px;">当前订单状态：<span>{{ states }}</span></span>
                <div v-show="active == 1" style="float:right;">
                    <el-button  
                        @click="close"
                        style="float:right;margin:26px 20px 9px 0;padding:6px 20px;border-radius:0;font-size:12px;">
                        关闭订单
                    </el-button>
                    <el-button  
                        @click="editReceiver"
                        style="float:right;margin:26px 20px 9px 0;padding:6px 5px;border-radius:0;font-size:12px;">
                        修改收货人信息
                    </el-button>
                </div>
                <div v-show="active == 2" style="float:right;">
                    <el-button  
                        @click="close"
                        style="float:right;margin:26px 20px 9px 0;padding:6px 20px;border-radius:0;font-size:12px;">
                        关闭订单
                    </el-button>
                    <el-button  
                        @click="editReceiver"
                        style="float:right;margin:26px 20px 9px 0;padding:6px 5px;border-radius:0;font-size:12px;">
                        修改收货人信息
                    </el-button>
                    <el-button  
                        @click="sureSend"
                        style="float:right;margin:26px 20px 9px 0;padding:6px 20px;border-radius:0;font-size:12px;">
                        确认发货
                    </el-button>
                </div>
                <div v-show="active == 3" style="float:right;">
                    <el-button  
                        @click="orderFollow"
                        style="float:right;margin:26px 20px 9px 0;padding:6px 20px;border-radius:0;font-size:12px;">
                        订单跟踪
                    </el-button>
                </div>
                <div v-show="active == 4" style="float:right;">
                    <el-button  
                        @click="orderFollow"
                        style="float:right;margin:26px 20px 9px 0;padding:6px 20px;border-radius:0;font-size:12px;">
                        订单跟踪
                    </el-button>
                </div>
            </div>

            <div style="border:1px solid rgba(228, 228, 228, 1);margin-top:-1px;padding:30px 35px;">
                <!-- 基本信息 -->
                <div class="u1629"><img src="../../images/tag.png" width="11" height="18" />  基本信息</div>
                <!-- 表格 -->
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="nick_name"
                        label="用户帐昵称"
                        align="center"
                        width="208">
                    </el-table-column>
                    <el-table-column
                        prop="order_sn"
                        label="订单编号"
                        align="center"
                        width="204">
                    </el-table-column>
                    <el-table-column
                        prop="created_at"
                        align="center"
                        label="创建时间"
                        width="208">
                    </el-table-column>
                    <el-table-column
                        prop="pay_at"
                        align="center"
                        label="支付时间"
                        width="208">
                    </el-table-column>
                    <el-table-column
                        prop="logistic_code"
                        label="物流单号"
                        align="center"
                        width="208">
                    </el-table-column>
                    <el-table-column
                        prop="send_at"
                        align="center"
                        label="发货时间"
                        width="208">
                    </el-table-column>
                    <el-table-column
                        prop="pay_type"
                        label="支付方式"
                        align="center"
                        width="208">
                    </el-table-column>
                </el-table>

                <!-- 收货人信息 -->
                <div class="u1629 margintop"><img src="../../images/tag.png" width="11" height="18" />  收货人信息</div>
                <!-- 表格 -->
                <el-table
                    :data="tableData2"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="收货人"
                        align="center"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号码"
                        align="center"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        label="收货地址"
                        width="576">
                    </el-table-column>
                </el-table>

                <!-- 商品信息 -->
                <div class="u1629 margintop"><img src="../../images/tag.png" width="11" height="18" />  商品信息</div>
                <!-- 表格 -->
                <el-table
                    :data="tableData3"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="cover"
                        label="商品图片"
                        align="center"
                        width="195">
                        <template slot-scope="scope">
                            <img :src="scope.row.cover"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="good_name"
                        label="商品名称"
                        align="center"
                        width="234">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        align="center"
                        label="价格"
                        width="169">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="数量"
                        align="center"
                        width="144">
                    </el-table-column>
                    <el-table-column
                        prop="stock"
                        align="center"
                        label="库存"
                        width="144">
                    </el-table-column>
                    <el-table-column
                        prop="t_price"
                        align="center"
                        label="小计"
                        width="140">
                    </el-table-column>
                </el-table>
                <!-- 合计 -->
                <div class="heji">
                    合计：
                    <span class="red">￥<span>{{ sum }}</span></span>
                </div>

                <!-- 费用信息 -->
                <div class="u1629 margintop"><img src="../../images/tag.png" width="11" height="18" />  费用信息</div>
                <!-- 表格 -->
                <el-table
                    :data="tableData4"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="good_price"
                        label="商品合计"
                        align="center"
                        width="146">
                    </el-table-column>
                    <el-table-column
                        prop="freight"
                        label="运费"
                        align="center"
                        width="221">
                    </el-table-column>
                    <el-table-column
                        prop="red"
                        align="center"
                        label="新用户红包"
                        width="214">
                    </el-table-column>
                    <el-table-column
                        prop="cut_price"
                        label="满减优惠"
                        align="center"
                        width="252">
                    </el-table-column>
                    <el-table-column
                        prop="total_price"
                        label="应付款金额"
                        align="center"
                        width="192">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 确认发货 -->
        <el-dialog title="确认发货" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="快递公司" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择快递公司" style="width:70%;">
                        <el-option v-for="(expres, index) in express" :label="expres.name" :value="expres.ship_code" :key="expres.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物流单号"  :label-width="formLabelWidth" >
                    <el-input v-model="form.name1" auto-complete="off" style="width:70%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="success" @click="sendExpress">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改收货人信息 -->
        <el-dialog title="修改收货人信息" :visible.sync="dialogFormVisible1">
            <el-form :model="form1">
                <el-form-item label="收货人姓名"  :label-width="formLabelWidth" >
                    <el-input v-model="form1.name1" auto-complete="off" style="width:70%;"></el-input>
                </el-form-item>
                <el-form-item label="手机号码"  :label-width="formLabelWidth" >
                    <el-input v-model="form1.tel" auto-complete="off" style="width:70%;"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form1.desc" style="width:70%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="success" @click="sendReceiver">确 定</el-button>
            </div>
        </el-dialog>

        
    </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapActions } from "vuex";
import {
  orderDetail,
  express,
  ship,
  editAddress,
  delOrder
} from "../../api/orders/Order.js";
export default {
  data() {
    return {
      PageName: "订单详情",
      BackName: "返回",
      RefreshName: "刷新",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      formLabelWidth: "160px",
      form: {
        region: "",
        name1: ""
      },
      form1: {
        name1: "",
        tel: "",
        desc: ""
      },
      express: [],
      active: 0,
      states: "",
      update_at: "",
      tableData: [{ nick_name: "" }],
      tableData2: [{ name: "" }],
      tableData3: [],
      sum: 0,
      tableData4: [{ red: "" }]
    };
  },
  computed: {
    ...mapGetters(["order_sn", "bstop", "token"])
  },
  methods: {
    ...mapActions(["checkOrder_sn", "checkBstop"]),
    //关闭订单
    close() {
        if(localStorage.getItem("orderSn")!=''){
            delOrder({
            token: localStorage.getItem("data"),
            order_sn: localStorage.getItem("orderSn")
        })
        .then(res => {
            console.log(res)
            this.getList();
        })
        }
    },
    changeTime(val) {
      return new Date(parseInt(val) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
    doubleTime(time) {
      if (time < 10) {
        time = "0" + time;
      } else {
        time = time;
      }
      return time;
    },
    getList() {
        // console.log()
      orderDetail({
        params: {
          token: localStorage.getItem("data"),
          order_sn: localStorage.getItem("orderSn")
        }
      }).then(res => {
        // console.log(res);
        if(res.data) {
            if (res.data.pay_status == 1) {
            //先做订单状态判断
            this.$data.active = 1;
            this.$data.states = "待付款";
            } else if (res.data.pay_status == 2) {
            this.$data.active = 2;
            this.$data.states = "待发货";
            } else if (res.data.pay_status == 3) {
            this.$data.active = 3;
            this.$data.states = "已发货";
            } else if (res.data.pay_status == 4) {
            this.$data.active = 4;
            this.$data.states = "已完成";
            } else {
            this.$data.active = 7;
            this.$data.states = "已关闭";
            }

            //基本信息提取
            var arr = res.data;
            console.log(arr)
            var reg = /['上午'|'下午']/g;
            this.$data.update_at = this.changeTime(arr.updated_at);
            this.$data.tableData[0].nick_name = arr.nick_name;
            this.$data.tableData[0].order_sn = localStorage.getItem("orderSn");
            if (arr.created_at != 0) {
                this.$data.tableData[0].created_at = this.changeTime(
            arr.created_at
            );
            }
            if (arr.pay_at != 0) {
                this.$data.tableData[0].pay_at = this.changeTime(arr.pay_at);
            }else{
                this.$data.tableData[0].pay_at = '暂无信息';
            }
             if (arr.confirm_at != 0) {
                this.$data.tableData[0].confirm_at = this.changeTime(arr.confirm_at);
            }
             if (arr.send_at != 0) {
                this.$data.tableData[0].send_at = this.changeTime(arr.send_at);
            }else{
                this.$data.tableData[0].send_at = '暂无信息';
            }
            this.$data.tableData[0].logistic_code = arr.logistic_code;
            this.$data.form.name1 = arr.logistic_code;
            if (arr.pay_type == "1") {
            //支付种类的判断
            arr.pay_type = "微信支付";
            } else if (arr.pay_type == "2") {
            arr.pay_type = "货到付款";
            } else if (arr.pay_type == "3") {
            arr.pay_type = "线下支付";
            }
            if(arr.pay_at == 0){
            arr.pay_at = '未支付';
            arr.pay_type = '无';
            }else{
            arr.pay_at = this.changeTime(arr.pay_at);
            }
            this.$data.tableData[0].pay_type = arr.pay_type;
            this.$data.tableData[0].user_type = this.$route.params.id.user_type;

            //收货人信息
            this.$data.tableData2[0].name = arr.order_address.name;
            this.$data.tableData2[0].mobile = arr.order_address.mobile;
            this.$data.tableData2[0].address = arr.order_address.address;

            //商品信息
            var shoppings = arr.order_detail;
            var num = "";
            for (var i = 0; i < shoppings.length; i++) {
            num = Number(shoppings[i].number) * Number(shoppings[i].price);
            shoppings[i].t_price = num ;
            this.$data.sum = 0;
            this.$data.sum += num;
            console.log(this.$data.sum)
            }
            this.$data.tableData3 = shoppings;

            //费用信息
            this.$data.tableData4[0].red = arr.red;
            this.$data.tableData4[0].freight = arr.freight;
            this.$data.tableData4[0].cut_price = arr.cut_price;
            this.$data.tableData4[0].good_price = arr.good_price;
            this.$data.tableData4[0].total_price = arr.total_price;
        }
      });
    },
    sureSend() {
      //发送快递
      this.$data.dialogFormVisible = true;
    },
    sendExpress() {
      if (
        this.$data.form.name1 &&
        this.$data.form.region != ""
      ) {
          console.log(this.$data.form.region,this.$data.form.name1)
        express({
          token: localStorage.getItem("data"),
          order_sn: localStorage.getItem("orderSn"),
          ship_code: this.$data.form.region,
          logistic_code: this.$data.form.name1
        }).then(res => {
            if(res.code == 0){
                this.$data.dialogFormVisible = false;
                location.reload([true])
                this.getList();
            }else{
                this.$notify({
                    title: '发货失败',
                    message: '',
                    type: 'error',
                    offset: 60
                });
            }
          console.log(res);
        })
      } else {
        alert("请选择快递公司！");
      }
    },
    getExpress() {
      //获取快递公司
      ship({ params: { token: localStorage.getItem("data") } }).then(res => {
        var arr = res.data.ships;
        this.$data.express = arr;
      });
    },
    editReceiver() {
      //修改收货人信息
      this.$data.dialogFormVisible1 = true;
      this.$data.form1.tel = this.$data.tableData2[0].mobile;
      this.$data.form1.name1 = this.$data.tableData2[0].name;
      this.$data.form1.desc = this.$data.tableData2[0].address;
    },
    sendReceiver() {
      //确定修改
      if (
        this.$data.form1.tel !== "" &&
        this.$data.form1.name1 !== "" &&
        this.$data.form1.desc !== ""
      ) {
        if (this.IsMobile(this.$data.form1.tel)) {
          editAddress({
            token: localStorage.getItem("data"),
            order_sn: this.$data.tableData[0].order_sn,
            mobile: this.$data.form1.tel,
            name: this.$data.form1.name1,
            address: this.$data.form1.desc
          })
            .then(res => {
              console.log(res);
            })
            .then(res => {
              this.getList();
              this.$data.dialogFormVisible1 = false;
            });
        } else {
          alert("请输入正确的手机号！");
        }
      } else {
        alert("不能输入为空！");
      }
    },
    IsMobile(phone) {
      //测试是否为手机号
      var rules = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|14[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
      return rules.test(phone);
    },
    //订单跟踪
    orderFollow() {
      console.log(this.$route.params.id.order_sn);
      this.$router.push({
        name: "orderfollow",
        params: { idf: this.$route.params.id.order_sn }
      });
    }
  },
  created() {
    this.$store.dispatch("checkOrder_sn", this.$route.params.id.order_sn);
    this.getList();
    this.getExpress();
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.red {
  color: $redColor;
}
.el-table__row img {
  width: 90px;
  height: 50px;
}
</style>
