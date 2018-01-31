<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <el-form ref="form" :model="form" label-width="160px">
        <!-- <el-form-item label="当前橱窗位置">
          <el-input v-model="form.id"></el-input>
        </el-form-item> -->
        <el-form-item label="主标题名称" prop="title" :rules="[{ required: true, message: '主标题名称不能为空'}]">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题名称" prop="des" :rules="[{ required: true, message: '副标题名称不能为空'}]">
          <el-input v-model="form.des"></el-input>
        </el-form-item>
        <el-form-item label="橱窗图片" prop="cover" :rules="[{ required: true, message: '图片不能为空'}]">
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
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import {mapGetters, mapMutations, mapActions} from 'vuex';
import { windowDetail, editWindow } from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "橱窗位",
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
      },
      fileList: [],
      thisToken:'',
    };
  },
  computed:{
    ...mapGetters(['token']),
  },
  methods: {
    // ...mapActions(['checkToken']),
    ...mapActions(['checkSettingsIndex','checkToken']),
    getData(id) {
      var that = this;
      windowDetail({ params: { token: this.thisToken, id: id } })
        .then(res => {
          this.form = res.data;
          that.fileList.push({ url: res.data.cover });
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
      console.log(file, fileList);
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //提交
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          editWindow({
            token: this.thisToken,
            id: that.$route.params.winPosId,
            title: that.form.title,
            des: that.form.des,
            cover: that.form.cover,
            url: that.form.url
          })
            .then(res => {
              this.$router.push({
                name: "winpos",
                path: "/setting/winpos"
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
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/winpos');
  },
  created: function() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    let thisId = this.$route.params.winPosId;
    this.getData(thisId);
  },
  components: {
    Dingbu
  }
};
</script>

<style scoped>

</style>