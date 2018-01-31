<template>
  <div>
    <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
    <div class="w">
      <div class="main" style="margin-top:15px;">
        <el-form ref="form" :model="form" label-width="160px">
            <el-form-item label="弹框图片" prop="cover" :rules="[{ required: true, message: 'banner图片不能为空'}]">
            <el-upload action="https://api.jiuwanjia.com/api/user/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
            :file-list=fileList :on-success="files" :limit=1>
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="form.cover" alt="">
            </el-dialog>
            </el-form-item>
            <el-form-item label="弹框图片跳转链接" prop="url">
            <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="显示状态">
            <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#9b9b9b"></el-switch>
            </el-form-item>

            <el-form-item>
            <el-button type="success" @click="submitForm('form')">确定</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { push, editPush } from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "首页弹框",
      BackName: "返回",
      RefreshName: "刷新",
      thisToken: "",
      dialogVisible: false,
      form: {},
      formStatus: null,
      fileList: []
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
    getData() {
      var that = this;
      push({ params: { token:this.thisToken } })
        .then(res => {
            console.log(res)
          that.form = res.data;
          that.fileList.push({ url: res.data.cover });
          if (that.form.status == 1) {
            that.form.status = true;
          } else {
            that.form.status = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    files(res) {
      this.dialogImageUrl = res.data.url;
      this.form.cover = res.data.url;
    },
    //移除照片
    handleRemove(file, fileList) {
      this.form.cover = "";
      this.fileList[0].url = "";
      // console.log(file, fileList);
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //提交
    submitForm(formName) {
      var that = this;
      if (that.form.status) {
        that.formStatus = 1;
      } else {
        that.formStatus = 2;
      }
    this.$refs[formName].validate(valid => {
        if (valid) {
        editPush({
            token: this.thisToken,
            cover: this.form.cover,
            url: that.form.url,
            status: that.formStatus
        })
            .then(res => {
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
        } else {
        console.log("error submit!!");
        return false;
        }
    });
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkSettingsIndex", "/setting/dialog");
  },
  created() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
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
