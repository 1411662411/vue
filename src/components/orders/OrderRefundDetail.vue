<template>
    <div>
        <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
        <div class="w">
            <div class="u2487_div">退款订单信息</div>
            <div class="u2444_div" style="padding:20px 28px;">
                <p class="shuzhibiaoge">
                    <span class="left">退款单号</span>
                    <span class="right">
                        {{ orderDetail.refund_sn }}
                    </span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">申请状态</span>
                    <span class="right">{{ orderDetail.status }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">订单序号</span>
                    <span class="right">{{ orderDetail.order_id }}
                        <!-- <a href="javascript:;" style="left:43px;color: rgb(26, 188, 156);" @click="lookOrderDetail">查看</a> -->
                    </span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">申请时间</span>
                    <span class="right">{{ orderDetail.apply_at }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">用户昵称</span>
                    <span class="right">{{ orderDetail.nick_name }}</span>
                </p>
                <!-- <p class="shuzhibiaoge te">
                    <span class="left">用户类型</span>
                    <span class="right">dddd</span>
                </p> -->
                <p class="shuzhibiaoge te">
                    <span class="left">联系人</span>
                    <span class="right">{{ orderDetail.nick_name }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">联系电话</span>
                    <span class="right">{{ orderDetail.mobile }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">退款原因</span>
                    <span class="right">{{ orderDetail.refund_reason }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">问题描述</span>
                    <span class="right">{{ orderDetail.refund_explain }}</span>
                </p>
 
                <p class="shuzhibiaoge te" v-show = "orderDetail.status == '已拒绝'">
                    <span class="left">凭证照片</span>
                    <span class="right">
                        <img :src="img" @click="loadImg(img)" v-for="(img,index) in orderDetail.imgs" :key="index" title="点击查看大图">
                    </span>
                </p>

                <div v-show = "orderDetail.status == '待处理'">
                    <p class="shuzhibiaoge te">
                        <span class="left">凭证照片</span>
                        <span class="right">
                            <img :src="img" @click="loadImg(img)" v-for="(img,index) in orderDetail.imgs" :key="index" title="点击查看大图">
                        </span>
                    </p>
                    <p class="shuzhibiaoge te">
                        <span class="left">确认退款金额</span>
                        <span class="right">{{ orderDetail.refund_price }}</span>
                    </p>
                    <p class="shuzhibiaoge te">
                        <span class="left">退款方式</span>
                        <span class="right">退回到原支付渠道</span>
                    </p>

                    <div style="line-height:200px;text-align:center;" >
                        <el-button type="success" @click="sureRefund">确认退款</el-button>
                        <el-button type="warning" @click="refuseRefunds">拒绝还款</el-button>
                    </div>
                </div>

                <div v-show = "orderDetail.status == '已拒绝'">
                    <p class="shuzhibiaoge" style="margin-top:20px;">
                        <span class="left">处理时间</span>
                        <span class="right">
                            {{ orderDetail.handle_at }}
                        </span>
                    </p>
                    <p class="shuzhibiaoge te">
                        <span class="left">处理备注</span>
                        <span class="right">{{ orderDetail.handle_node }}</span>
                    </p>
                </div>

                <div v-show = "orderDetail.status == '已完成'">
                    <p class="shuzhibiaoge te">
                        <span class="left">凭证照片</span>
                        <span class="right">
                            <img :src="img" @click="loadImg(img)" v-for="(img,index) in orderDetail.imgs" :key="index" title="点击查看大图">
                        </span>
                    </p>
                    <!-- <p class="shuzhibiaoge" style="margin-top:20px;">
                        <span class="left">订单金额</span>
                        <span class="right">
                            {{ orderDetail.price }}
                        </span>
                    </p> -->
                    <p class="shuzhibiaoge te">
                        <span class="left">申请退款金额</span>
                        <span class="right">{{ orderDetail.refund_price }}</span>
                    </p>
                    <p class="shuzhibiaoge te">
                        <span class="left">退款方式</span>
                        <span class="right">退回到原支付渠道</span>
                    </p>
                    <p class="shuzhibiaoge" style="margin-top:20px;">
                        <span class="left">处理时间</span>
                        <span class="right">
                            {{ orderDetail.handle_at }}
                        </span>
                    </p>
                    <p class="shuzhibiaoge te">
                        <span class="left">退款时间</span>
                        <span class="right">{{ orderDetail.refused_at }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import Base from "../../common/Base.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { refundDetail, refund, refuseRefund } from "../../api/orders/Order.js";
export default {
mixins: [Base],
  data() {
    return {
      PageName: "退款详情",
      BackName: "返回",
      RefreshName: "刷新",
      orderDetail: {
        refund_sn: "",
        status: "",
        order_id: "",
        apply_at: "",
        nick_name: "",
        mobile: "",
        refund_reason: "",
        refund_explain: "",
        refund_price: "",
        handle_at: '',
        handle_node: '',
        cover: '',
        refused_at: '',
        imgs: []
      }
    };
  },
  computed: {
      ...mapGetters(['token'])
  },
  methods: {
      ...mapActions(["checkOrdersIndex"]),
    lookOrderDetail() {
      this.$router.push({ name: "orderdetail", params: { id: 1 } });
    },
    changeTime(val) {
      return new Date(parseInt(val) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
    getData() {
      refundDetail({ params: { token: localStorage.getItem("data"), refund_sn: this.$data.orderDetail.refund_sn } }).then(res => {
        console.log(res);
        if (res.data.status == "2") {
        res.data.status = "待处理";
        } else if (res.data.status == "3") {
        res.data.status = "已拒绝";
        } else if (res.data.status == "4") {
        res.data.status = "已完成";
        }
        this.$data.orderDetail.refund_sn = res.data.refund_sn;
        this.$data.orderDetail.status = res.data.status;
        this.$data.orderDetail.order_id = res.data.order_id;
        this.$data.orderDetail.apply_at = this.changeTime(res.data.apply_at);
        this.$data.orderDetail.nick_name = res.data.order_address.name;
        this.$data.orderDetail.mobile = res.data.order_address.mobile;
        this.$data.orderDetail.refund_reason = res.data.refund_reason;
        this.$data.orderDetail.refund_explain = res.data.refund_explain;
        this.$data.orderDetail.refund_price = res.data.refund_price;
        this.$data.orderDetail.imgs = res.data.img;
      });
    },
    sureRefund() {
        console.log(this.$data.orderDetail.refund_sn,this.$data.orderDetail.refund_price)
        refund({token: localStorage.getItem("data"), refund_sn: this.$data.orderDetail.refund_sn, price: this.$data.orderDetail.refund_price}).then(res => {
            console.log(res)
            if(res.code == 0){
                this.$notify({
                    title: '退款成功',
                    message: '',
                    type: 'success',
                    offset: 60
                });
                var timer = setTimeout(()=>{
                    this.$router.push({name: 'orderrefund',path: '/order/orderrefund'});
                    clearTimeout(timer)
                },1000)
            }else if(res.code == 1){
                this.$notify({
                    title: res.message,
                    message: '',
                    type: 'warning',
                    offset: 60
                });
            }
        })
    },
    refuseRefunds() {
        refuseRefund({token: localStorage.getItem("data"), refund_sn: this.$data.orderDetail.refund_sn}).then(res => {
            console.log(res)
            if(res.code == 0){
                this.$notify({
                    title: '拒绝退款成功',
                    message: '',
                    type: 'success',
                    offset: 60
                });
                var timer = setTimeout(()=>{
                    this.$router.push({name: 'orderrefund',path: '/order/orderrefund'});
                    clearTimeout(timer)
                },1000)
            }else if(res.code == 1){
                this.$notify({
                    title: res.message,
                    message: '',
                    type: 'warning',
                    offset: 60
                });
            }
        })
    }
  },
  created() {
      this.$data.orderDetail.refund_sn = this.$route.params.id;
    this.getData();
  },
  beforeCreate() {
    this.$store.dispatch("checkOrdersIndex", "/order/orderrefund");
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
img {
  width: 75px;
  height: 40px;
  position: relative;
  top:8px;
  margin-right: 15px;
}
</style>

