<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <el-form ref="numberValidateForm" :model="numberValidateForm" label-width="100px">
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="numberValidateForm.desc" prop="desc" :rules="[{ required: true, message: '公告不能为空'},{ min: 6, max:50, message: '密码长度在 6 到 50 个字符'}]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="submitForm('numberValidateForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { changeNotice, getNotice } from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "公告",
      numberValidateForm: {
        desc: ""
      },
      thisToken: "",
    };
  },
  components: {
    Dingbu
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    ...mapActions(["checkSettingsIndex", "checkToken"]),
    submitForm(formName) {
      this.$notify({
        title: '发布成功',
        message: '',
        type: 'success',
        offset: 60
      });
      this.getData();
    },
    getData() {
      var that = this;
      changeNotice({ token: this.thisToken, clean_content: that.numberValidateForm.desc })
        .then(res => {
          console.log(res, "---");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkSettingsIndex", "/setting/notice");
  },
  created() {
    this.$store.dispatch("checkToken", localStorage.getItem("data"));
    this.thisToken = this.$store.state.token;
    getNotice({ params: { token: this.thisToken } })
      .then(res => {
        this.$data.numberValidateForm.desc = res.data.clean_content;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.w .el-form {
  margin-top: 20px;
}
</style>
