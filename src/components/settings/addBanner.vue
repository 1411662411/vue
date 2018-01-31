<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="banner图片" prop="cover" :rules="[{ required: true, message: 'banner图片不能为空'}]">
          <el-upload action="https://api.jiuwanjia.com/api/user/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
           :file-list=fileList :on-success="files" :limit=1>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="form.cover" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="banner图片跳转链接" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#9b9b9b"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import {mapGetters,mapActions} from 'vuex';
import {
  bannerDetail,
  addBanner,
  editBanner
} from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "banner图",
      dialogImageUrl: "",
      thisToken:'',
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
  created: function() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    let thisId = this.$route.params.bannerId;
    if (thisId != -1) {
      this.getData(thisId);
    }
  },
  methods: {
    // 获取初始数据
    ...mapActions(['checkToken']),
    getData(id) {
      var that = this;
      bannerDetail({ params: { token:this.thisToken, id: id } })
        .then(res => {
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
      if (this.$route.params.bannerId != -1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            editBanner({
              token: this.thisToken,
              id:this.$route.params.bannerId,
              cover: this.form.cover,
              url: that.form.url,
              status: that.formStatus
            })
              .then(res => {
                this.$router.push({
                  name: "banner",
                  path: "/setting/banner"
                });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }else{
        this.$refs[formName].validate(valid => {
          if (valid) {
            addBanner({
              token: this.thisToken,
              cover: this.form.cover,
              url: that.form.url,
              status: that.formStatus
            })
              .then(res => {
                this.$router.push({
                  name: "banner",
                  path: "/setting/banner"
                });
                console.log(res, "---");
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.el-switch {
  line-height: 36px;
  height: 46px;
}
.w {
  margin-top: 20px;
}
</style>
