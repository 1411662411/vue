<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <div id="u890_div">
        
      </div>
      <div class="main" style="margin-top:-1px;">
          <el-form ref="numberValidateForm" :model="numberValidateForm" >
            <el-form-item label-width="34%">
            <el-input style="line-height:54px;width:330px;" v-model="numberValidateForm.name" prop="name"></el-input>
            </el-form-item>
            <el-form-item align="center">
            <el-button type="primary" @click.native="submitForm('numberValidateForm')">保存设置</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { search, shopInfo } from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "搜索框",
      numberValidateForm: {
        name: ""
      },
      thisToken: ""
    };
  },
  components: {
    Dingbu
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkSettingsIndex", "checkToken"]),
    submitForm(formName) {
      this.$store.dispatch("checkToken", localStorage.getItem("data"));
      this.thisToken = this.$store.state.token;
      search({ token: this.thisToken, name: this.numberValidateForm.name })
        .then(res => {
          console.log(res, "---");
          if(res.code == 0){
              this.$notify({
                title: "设置成功",
                message: "",
                type: "success",
                offset: 60
            });
          }else{
              this.$notify({
                title: "设置失败",
                message: "",
                type: "warning",
                offset: 60
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      var that = this;
      shopInfo({ params: { token: this.thisToken } })
        .then(res => {
          console.log(res);
          this.numberValidateForm.name = res.data.search;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkSettingsIndex", "/setting/search");
  },
  created() {
    this.$store.dispatch("checkToken", localStorage.getItem("data"));
    this.thisToken = this.$store.state.token;
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.w {
  margin-top: 20px;
}
#u890_div {
  width: 1100px;
  height: 50px;
  background-color: rgba(243, 243, 243, 1);
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  margin-top: 20px;
}
.main {
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 10px 20px;
  min-height: 630px;
}
.w .el-form {
  margin-top: 20px;
}
.el-input__inner {
  // padding:15px 0 0 5px;
  width: 50%;
  color: rgb(153, 153, 153);
}
</style>
