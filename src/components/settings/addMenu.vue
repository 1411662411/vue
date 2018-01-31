<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <el-form ref="form" :model="form" label-width="160px">
        <!-- <el-form-item label="排序">
          <el-input v-model="form.id"></el-input>
          数字越大，排名越靠前；默认按照添加时间排序
        </el-form-item> -->
        <el-form-item label="导航菜单名称" prop="name" :rules="[{ required: true, message: '名称不能为空'}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="导航菜单logo" prop="cover" :rules="[{ required: true, message: '图片不能为空'}]">
          <el-upload action="https://api.jiuwanjia.com/api/user/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
           :file-list=fileList :on-success="files" :limit=1>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="form.cover" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="导航菜单链接" prop="url" :rules="[{ required: true, message: 'banner链接不能为空'}]">
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
import {mapGetters, mapActions} from 'vuex';
import { navDetail, addNav, editNav } from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "导航菜单",
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        cover: "",
        id: null,
        name: "",
        status: null,
        url: ""
      },
      fileList: [],
      formStatus: null,
      thisToken:'',
    };
  },
  computed:{
    ...mapGetters(['token']),
  },
  methods: {
    //
    ...mapActions(['checkSettingsIndex','checkToken']),
    // ...mapActions(['checkToken']),
    getData(id) {
      var that = this;
      navDetail({ params: { token: this.thisToken, id: id } })
        .then(res => {
          this.form = res.data;
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
    //移除照片
    handleRemove(file, fileList) {
      this.form.cover = "";
      this.fileList[0].url = "";
      //console.log(file, fileList);
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    files(res) {
      this.dialogImageUrl = res.data.url;
      this.form.cover = res.data.url;
    },
    //提交
    submitForm(formName) {
      var that = this;
      if (that.form.status) {
        that.formStatus = 1;
      } else {
        that.formStatus = 2;
      }
      if (this.$route.params.menuId != -1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            editNav({
              token: this.thisToken,
              id: that.$route.params.menuId,
              cover: that.form.cover,
              url: that.form.url,
              status: that.formStatus,
              name: that.form.name
            })
              .then(res => {
                this.$router.push({
                  name: "menu",
                  path: "/setting/menu"
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
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            addNav({
              token: this.thisToken,
              img: that.form.cover,
              url: that.form.url,
              status: that.formStatus,
              name: that.form.name
            })
              .then(res => {
                this.$router.push({
                  name: "menu",
                  path: "/setting/menu"
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
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/menu');
  },
  created: function() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    let thisId = this.$route.params.menuId;
    if (thisId != -1) {
      this.getData(thisId);
    }
  },
  components: {
    Dingbu
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
