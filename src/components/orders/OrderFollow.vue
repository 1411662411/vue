<template>
    <div>
        <Dingbu :nameTitle='PageName'></Dingbu>
        <div class="w">
            <div class="u2487_div">订单跟踪</div>
            <div class="u2444_div" v-if="toggle">
                <ul><img src="../../images/u2446.png" width="3" height="447" class="zhou"/>
                    <li v-for="(trace,index) in traces" :key="index">
                        <div class="left">
                            <img :src="src1" width="15" height="15" class="activeImg" v-show="index == 0"/>
                            <img :src="src2" width="10" height="10" class="activeImg img2" v-show="index != 0"/>
                        </div>
                        <div class="right">
                            <p>{{trace.AcceptStation}}</p>
                            <span>{{trace.AcceptTime}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else>
                {{ this.$data.reason }}
            </div>
        </div>
    </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapActions } from "vuex";
import { track } from "../../api/orders/Order.js";
export default {
  data() {
    return {
      PageName: "订单跟踪",
      toggle: false,
      reason: "",
      traces: [],
      src1: require('../../images/u2448.png'),
      src2: require('../../images/u2450.png')
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    getTrack() {
      track({
        params: {
          token: localStorage.getItem("data"),
          order_sn: localStorage.getItem("orderSn")
        }
      }).then(res => {
        var arr = res.data.express.Traces;
        this.$data.reason = res.data.express.Reason;
        if (arr.length == 0) {
          this.$data.toggle = false;
        } else {
          this.$data.toggle = true;
        }
        this.traces = arr;
        console.log(res, arr);
      });
    }
  },
  created() {
    this.getTrack();
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>

