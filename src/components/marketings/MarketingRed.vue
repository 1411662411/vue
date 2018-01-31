<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <div class="main" style="margin-top:-1px;">
          <p style="font-size: 12px;color: #999999;margin-bottom:10px;line-height:36px;">
            <b style="font-size: 16px;font-family: 'Arial Negreta', 'Arial Normal', 'Arial';position:relative;top:1px;color: #666666;">
              活动内容：
            </b>该活动适用于单笔订单
          </p>
        </div>
      </div>
      <!-- 红包 -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="35%" class="demo-ruleForm" >
        <el-form-item label="新用户红包" prop="red" style="margin-top:200px;">
          <input class="input" v-model.number="ruleForm.red" @input="checkRed" style="width:350px;" /><span class="yuan">元</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="success"
         @click="addRed"
         style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
         确 定
         </el-button>
      </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { addRed, getRed } from "../../api/marketings/Marketing.js";
export default {
  data() {
    return {
      PageName: "新客立减红包",
      dialogFormVisible2: false,
      ruleForm: {
        red: "",
      }
    };
  },
  computed: {
    ...mapGetters(["marketingsindex", "token"])
  },
  methods: {
    ...mapActions(["checkMarketingsIndex", "checkToken"]),
    getData() {
      this.$store.dispatch('checkToken',localStorage.getItem('data'));
      getRed({params: {token: this.$store.state.token}}).then(res => {
        this.ruleForm.red = res.data.price;
      })
    },
    checkRed() {    
      var reg = /^[0-9]+(\.[0-9]{0,2})?$/g;
      var reg1 = /[\D]/g;
      if(reg1.test(this.ruleForm.red) && !reg.test(this.ruleForm.red)) {
        this.ruleForm.red = '';
      } else {
        this.ruleForm.red = this.ruleForm.red;
      }
    },
    addRed() {
      this.$store.dispatch('checkToken',localStorage.getItem('data'));
      if(this.ruleForm.red != ''){
        addRed({ token: this.$store.state.token, price: this.ruleForm.red}).then(res => {
          console.log(res)
          this.$notify({
            title: '修改成功',
            message: '这是一条修改成功的提示消息！',
            type: 'success',
            offset: 60
          });
          this.getData();
        })
      } else {
        alert('请输入有效金额！')
      }
    }
  },
  components: {
    Dingbu
  },
  beforeCreate() {
    this.$store.dispatch("checkMarketingsIndex", "/marketing/red");
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
