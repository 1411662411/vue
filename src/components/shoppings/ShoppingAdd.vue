<template>
  <div>
    <Dingbu :nameTitle='PageName' :tabBack="BackName"></Dingbu>
    <div class="w">
      <div class="zuo">
        <img src="../../images/u439.png" class="u439" />
        <div style="height:50px;position:absolute;z-index:2;font:16px/50px '';color:#fff;padding-left:18px;">
          <img src="../../images/whitetag.png" width="18" height="20" style="position:relative;left:-4px;top:5px;" />商品信息
        </div>
      </div>
      <div class="you">
        <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm" style="margin-top:8px;" :rules="rules">
          <el-form-item label="商品名称" style="width:80%;" prop="name">
            <el-input v-model="ruleForm.name" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="一级分类" style="width:80%;" prop="place">
            <select v-model="ruleForm.parentCateId" placeholder="请选择" @change="getCateNameByCateId(cate,ruleForm.parentCateId)" class="myselect">
              <option v-for="item in cate" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
            <!-- <el-cascader :options="cate" :show-all-levels="false" change-on-select :props="props" @change="handleItemChange"></el-cascader> -->
            <el-button type="primary" @click="routerSort">新建分类</el-button>
          </el-form-item>
          <el-form-item label="二级分类" style="width:80%;" v-if="hasSonCates">
            <select v-model="ruleForm.cate_id" placeholder="请选择" class="myselect">
              <option v-for="item in sonCates" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
          </el-form-item>
          <el-form-item label="商品产地" style="width:80%;" prop="cate_id">
            <select v-model="ruleForm.place" placeholder="请选择" class="myselect">
              <option v-for="item in place" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
            <el-button type="primary" @click="routerPlace">新建产地</el-button>
          </el-form-item>
           <el-form-item label="活动套餐" style="width:80%;">
            <select v-model="ruleForm.composer_id" placeholder="请选择" class="myselect">
              <option v-for="item in composer" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
          </el-form-item>
          <el-form-item label="商品价格" style="width:84%;">
            <el-form-item label="普通用户" style="width:20%;float:left;" label-width="90px">
            </el-form-item>
            <el-form-item label="售价￥" style="width:40%;float:left;" label-width="80px" prop="price">
              <el-input v-model="ruleForm.price" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="原价￥" style="width:40%;float:right;" label-width="80px" prop="y_price">
              <el-input v-model="ruleForm.y_price" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" style="width:95%;line-height:40px;margin-top:60px;" label-width="80px" prop="des">
              <el-input v-model="ruleForm.des"></el-input>
            </el-form-item>
            <el-form-item label="代理商" style="width:20%;float:left;margin-top:20px;" label-width="80px">
            </el-form-item>
            <el-form-item label="售价￥" style="width:40%;float:left;margin-top:20px;" label-width="80px" prop="agent_price">
              <el-input v-model="ruleForm.agent_price" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="原价￥" style="width:40%;float:right;margin-top:20px;" label-width="80px"  prop="agent_y_price">
              <el-input v-model="ruleForm.agent_y_price" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" style="width:95%;line-height:40px;margin-top:80px;" label-width="80px" prop="agent_des">
              <el-input v-model="ruleForm.agent_des"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="商品销量" style="width:80%;" prop="sales">
            <el-input v-model="ruleForm.sales"></el-input>
          </el-form-item>
          <el-form-item label="商品库存" style="width:80%;" prop="stock">
            <el-input v-model="ruleForm.stock"></el-input>
          </el-form-item>
          <el-form-item label="代理商限购数量" style="width:80%;" prop="limit">
            <el-input v-model="ruleForm.limit"></el-input>
          </el-form-item>
          <el-form-item label="商品推荐">
            <el-switch v-model="ruleForm.is_hot"></el-switch>
          </el-form-item>
          <!--<el-form-item label="优惠类型">
            <el-radio-group v-model="ruleForm.discount">
              <el-radio label="2">非优惠商品</el-radio>
              <el-radio label="1">优惠商品</el-radio>
            </el-radio-group>
          </el-form-item>-->
          <el-form-item label="商品图片" style="width:80%;" prop="img">
            <el-upload action="https://api.jiuwanjia.com/api/user/upload" list-type="picture-card" :on-success="files" :on-remove="handleRemove"
              :file-list="ruleForm.img">
              <i class="el-icon-plus"></i>
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="ruleForm.img" alt="">
            </el-dialog> -->
          </el-form-item>
          <el-form-item label="商品详情" style="width:80%;" prop="clean_content">
            <div id="editorElem" style="text-align:left;"></div>
          </el-form-item>
          <el-form-item>
            <el-button @click="back">返回列表</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保存商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";

import E from "wangeditor";

import { mapGetters, mapMutations, mapActions } from "vuex";

import { quillEditor } from "vue-quill-editor";
var editor = new E("#editorElem");
import {
  composer,
  goodDetail,
  editGood,
  addGood,
  goodCate,
  getPlace
} from "../../api/shoppings/Shopping.js";
export default {
  data() {
    return {
      hasSonCates: false,
      sonCates: [],
      dialogVisible: false,
      cate: [],
      place: [],
      props: {
        label: "name",
        value: "id",
        children: "son_cates"
      },
      is_hot: "",
      composer: [{ id: "", name: "不选择" }],
      content: "<h2>I am Example</h2>",
      editorOption: {
        // some quill options
      },
      PageName: "商品信息",
      BackName: "返回",
      ruleForm: {
        img: [],
        clean_content: "",
        discount: 1,
        is_hot: 0
      },
      thisToken: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          }
        ],
        place: [
          {
            required: true,
            message: "请选择商品分类",
            trigger: "blur"
          }
        ],
        cate_id: [
          {
            required: true,
            message: "请选择商品产地",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "售价不能为空",
            trigger: "blur"
          }
        ],
        y_price: [
          {
            required: true,
            message: "原价不能为空",
            trigger: "blur"
          }
        ],
        des: [
          {
            required: true,
            message: "商品描述不能为空",
            trigger: "blur"
          }
        ],
        agent_price: [
          {
            required: true,
            message: "售价不能为空",
            trigger: "blur"
          }
        ],
        agent_y_price: [
          {
            required: true,
            message: "原价不能为空",
            trigger: "blur"
          }
        ],
        agent_des: [
          {
            required: true,
            message: "商品描述不能为空",
            trigger: "blur"
          }
        ],
        sales: [
          {
            required: true,
            message: "商品销量不能为空",
            trigger: "blur"
          }
        ],
        stock: [
          {
            required: true,
            message: "商品库存不能为空",
            trigger: "blur"
          }
        ],
        limit: [
          {
            required: true,
            message: "商品代理数量",
            trigger: "blur"
          }
        ],
        clean_content: [
          {
            required: true,
            message: "商品详情不能为空",
            trigger: "blur"
          }
        ],
        img: [
          {
            required: true,
            message: "请选择图片",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkToken"]),
    files(res) {
      let a = {
        id: "",
        is_cover: "1",
        img: "",
        url: ""
      };
      a.img = res.data.url;
      a.url = res.data.url;
      this.ruleForm.img.push(a);
    },
    handleRemove(file, fileList) {
      this.ruleForm.img = fileList;
    },
    handlePreview(file) {
      console.log(file);
    },
    routerSort() {
      this.$router.push({
        name: "shoppingcate",
        path: "/shopping/shoppingcate"
      });
    },
    routerPlace() {
      this.$router.push({
        name: "filter",
        path: "/setting/filter"
      });
    },
    handleItemChange(id) {
      this.choseId = id;
      this.choseselectId = this.choseId[id.length - 1];
    },
    getData(id) {
      if (id != -1) {
        goodDetail({ params: { token: this.thisToken, good_id: id } })
          .then(res => {
            console.log(res)
            this.ruleForm = res.data;
            // 获取分类
            goodCate({ params: { token: this.thisToken } })
              .then(res => {
                this.cate = res.data.cates;
                this.getCateNameByCateId(this.cate, this.ruleForm.cate_id);
              })
              .catch(err => {
                console.log(err);
              });
            //   获取产地
            getPlace({ params: { token: this.thisToken } })
              .then(res => {
                this.place = res.data.place_screen;
              })
              .catch(err => {
                console.log(err);
              });
            //   获取优惠套餐列表
            composer({ params: { token: this.thisToken } })
              .then(res => {
                for (let i = 0; i < res.data.composers.length; i++) {
                  this.composer.push(res.data.composers[i]);
                }
              })
              .catch(err => {
                console.log(err);
              });
            if (this.ruleForm.is_hot == 0) {
              this.ruleForm.is_hot = false;
            } else {
              this.ruleForm.is_hot = true;
            }
            console.log(this.ruleForm.discount,typeof this.ruleForm.discount)
            // if (this.ruleForm.discount == 1) {
            //   this.ruleForm.discount = '优惠商品';
            // } else {
            //   this.ruleForm.discount = '非优惠商品';
            // }
            for (let i = 0; i < this.ruleForm.img.length; i++) {
              this.ruleForm.img[i].url = this.ruleForm.img[i].img;
            }
            editor.txt.html(this.ruleForm.clean_content);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // 获取分类
        goodCate({ params: { token: this.thisToken } })
          .then(res => {
            console.log(res)
            this.cate = res.data.cates;
            this.getCateNameByCateId(this.cate, this.ruleForm.cate_id);
          })
          .catch(err => {
            console.log(err);
          });
        //   获取产地
        getPlace({ params: { token: this.thisToken } })
          .then(res => {
            console.log(res)
            this.place = res.data.place_screen;
          })
          .catch(err => {
            console.log(err);
          });
        //   获取优惠套餐列表
        composer({ params: { token: this.thisToken } })
          .then(res => {
            console.log(res)
            for (let i = 0; i < res.data.composers.length; i++) {
              this.composer.push(res.data.composers[i]);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    submitForm(formName) {
      this.ruleForm.clean_content = editor.txt.html();
      if (this.ruleForm.is_hot == false) {
        this.is_hot = 0;
      } else {
        this.is_hot = 1;
      }
      this.ruleForm.token = this.thisToken;
      if (this.$route.params.shoppingId != -1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            editGood(this.ruleForm)
              .then(res => {
                this.$router.push({
                  name: "shopping",
                  path: "/shopping/shoppinglist"
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
            addGood(this.ruleForm)
              .then(res => {
                console.log(res)
                this.$router.push({
                  name: "shopping",
                  path: "/shopping/shoppinglist"
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
    back() {
      window.history.go(-1);
    },
    getCateNameByCateId: function(cate, cateId) {
      for (var i = 0; i < cate.length; i++) {
        if (cateId == cate[i].id) {
          var temp = {};
          temp = cate[0];
          cate[0] = cate[i];
          cate[i] = temp;
          this.ruleForm.parentCateId = cate[0].id;
          if (cate[0].son_cates.length == 0) {
            this.ruleForm.cate_id = this.ruleForm.parentCateId;
          }
          break;
        } else {
          for (var j = 0; j < cate[i].son_cates.length; j++) {
            if (cateId == cate[i].son_cates[j].id) {
              var temp = {};
              temp = cate[0];
              cate[0] = cate[i];
              cate[i] = temp;
              temp = {};
              temp = cate[0].son_cates[0];
              cate[0].son_cates[0] = cate[0].son_cates[j];
              cate[0].son_cates[j] = temp;
              this.ruleForm.parentCateId = cate[0].son_cates[0].parent_id;
              break;
            }
          }
        }
      }
      if (this.cate[0].son_cates.length == 0) {
        this.hasSonCates = false;
        this.sonCates = [];
      } else {
        this.hasSonCates = true;
        this.sonCates = cate[0].son_cates;
      }
    }
  },
  components: { Dingbu },
  created: function() {
    this.$store.dispatch("checkToken", localStorage.getItem("data"));
    this.thisToken = this.$store.state.token;
    let thisId = this.$route.params.shoppingId;
    this.getData(thisId);
  },
  mounted() {
    //wangeditor图片上传
    editor.customConfig.uploadImgServer =
      "https://api.jiuwanjia.com/api/user/wang-upload"; // 上传图片到服务器
    editor.customConfig.uploadFileName = "file[]";
    editor.customConfig.uploadImgMaxLength = 5;
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  height: 400px;
}
.myselect {
  height: 30px;
  border-radius: 3px;
  border: solid 1px #e5e5e5;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat
    scroll right center transparent;
  padding-right: 14px;
  padding-left: 10px;
}
@import "../../css/common.scss";
#editorElem {
}
</style>
