<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item>
          <template slot="title">
            <div class="con">
              <div class="left">{{listTitle}}</div>
              <div class="right">
                <div class="addFilter" @click.stop="addFilter(1)">添加筛选项</div>
              </div>
            </div>
          </template>
          <div class="list" v-for="(item,index) in list" :key="item.id">
            <div class="listLeft">{{item.name}}</div>
            <div class="listRight">
              <div class="listreset" @click.stop="resetDet(1,item.id,index)">编辑</div>
              <div class="listdel" @click.stop="delDet(1,item.id)">删除</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item>
          <template slot="title">
            <div class="con">
              <div class="left">{{listTwoTitle}}</div>
              <div class="right">
                <div class="addFilter" @click.stop="addFormFilter(2)">添加筛选项</div>
              </div>
            </div>
          </template>
          <div class="list" v-for="(item,index) in listTwo" :key="item.id">
            <div class="listLeft">{{item.start_price}}-{{item.end_price}}</div>
            <div class="listRight">
              <div class="listreset" @click.stop="resetTwoDet(2,item.id,index)">编辑</div>
              <div class="listdel" @click.stop="delTwoDet(2,item.id)">删除</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <!-- 对话框 -->
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" center width="40%" >
        <el-form :model="newList">
          <el-form-item label="请输入产地名称" :label-width="formLabelWidth">   
            <el-input v-model="newList.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelBtn">取 消</el-button>
          <el-button type="primary" @click="sureBtn">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="价格区间" :visible.sync="dialogVisible">
        <el-form :model="form">
          <el-form-item label="开始价格" :label-width="formLabelWidth">
            <el-input v-model="form.start_price" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="结束价格" :label-width="formLabelWidth">
            <el-input v-model="form.end_price" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formCancelBtn">取 消</el-button>
          <el-button type="primary" @click="formSureBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";

import {mapGetters, mapMutations, mapActions} from 'vuex';

import {
  placeScreen,
  priceScreen,
  addPlace,
  editPlace,
  delPlace,
  addPrice,
  editPrice,
  delPrice
} from "../../api/settings/Setting.js";

export default {
  data() {
    return {
      PageName: "商品筛选",
      activeNames: ["0"],
      dialogFormVisible: false,
      list: [],
      listTitle: "",
      listTwo: [],
      listTwoTitle: "",
      type: null,
      formLabelWidth: "150px",
      newList: {
        id: null,
        name: ""
      },
      dialogVisible: false,
      form: {
        id: null,
        start_price: null,
        end_price: null
      },
      thisToken:'',
    };
  },
  components: {
    Dingbu
  },
  created: function() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.getData();
    this.getDataTwo();
  },
  computed:{
    ...mapGetters(['token']),
  },
  methods: {
    ...mapActions(['checkSettingsIndex','checkToken']),
    getData() {
      var that = this;
      placeScreen({ params: { token: this.thisToken } })
        .then(res => {
          that.listTitle = res.message;
          that.list = res.data.place_screen;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataTwo() {
      var that = this;
      priceScreen({ params: { token:  this.thisToken } })
        .then(res => {
          that.listTwoTitle = res.message;
          that.listTwo = res.data.price_screen;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleChange(res) {},
    // 添加筛选项
    addFilter(index) {
      this.dialogFormVisible = true;
      this.type = index;
    },
    cancelBtn() {
      this.newList.id = null;
      this.newList.name = "";
      this.dialogFormVisible = false;
    },
    // 添加分类
    sureBtn() {
      if (this.newList.name == "") {
        this.$alert("内容不能为空！", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (this.type == 1 && this.newList.id == null) {
        addPlace({ token:  this.thisToken, name: this.newList.name })
          .then(res => {
            this.getData();
            this.newList.name = "";
            this.type = null;
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.type == 1 && this.newList.id != null) {
        editPlace({ token:  this.thisToken, id: this.newList.id, name: this.newList.name })
          .then(res => {
            this.getData();
            this.newList.id = null;
            this.newList.name = "";
            this.type = null;
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.dialogFormVisible = false;
    },
    // 删除二级分类接口
    delDet(index, id) {
      if (index == 1) {
        delPlace({ token: this.thisToken, id: id })
          .then(res => {
            this.getData();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 二级分类编辑
    resetDet(type, id, index) {
      this.dialogFormVisible = true;
      this.newList.id = id;
      this.type = type;
      this.newList.name = this.list[index].name;
    },
    // 添加价格筛选项分类
    addFormFilter(index) {
      this.dialogVisible = true;
      this.type = index;
    },
    // 取消价格
    formCancelBtn() {
      this.form.id = null;
      this.form.start_price = null;
      this.form.end_price = null;
      this.dialogVisible = false;
    },
    formSureBtn() {
      if (this.form.start_price == null) {
        this.$alert("开始价格不能为空！", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (this.form.end_price == null) {
        this.$alert("结束价格不能为空！", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      if (parseInt(this.form.end_price) > parseInt(this.form.start_price)) {} else {
        this.$alert("开始价格必须低于结束价格！", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      //判断起止时间
      if (this.type == 2 && this.form.id == null) {
        addPrice({
          token:  this.thisToken,
          start_price: this.form.start_price,
          end_price: this.form.end_price
        })
          .then(res => {
            this.getDataTwo();
            this.form.start_price = null;
            this.form.end_price = null;
            this.type = null;
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.type == 2 && this.form.id != null) {
        editPrice({
          token: this.thisToken,
          id: this.form.id,
          start_price: this.form.start_price,
          end_price: this.form.end_price
        })
          .then(res => {
            this.getDataTwo();
            this.form.id = null;
            this.form.start_price = null;
            this.form.end_price = null;
            this.type = null;
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.dialogVisible = false;
    },
    delTwoDet(index, id) {
      if (index == 2) {
        delPrice({ token:  this.thisToken, id: id })
          .then(res => {
            this.getDataTwo();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    resetTwoDet(type, id, index) {
      this.dialogVisible = true;
      this.form.id = id;
      this.type = type;
      this.form.start_price = this.listTwo[index].start_price;
      this.form.end_price = this.listTwo[index].end_price;
    }
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/filter');

  },
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.el-collapse {
  border: 1px solid #e5e5e5;
  padding: 0 20px;
}

.con {
  @include flex;
  @include flexLeftRight;
  color: #000;
  .right {
    @include flex;
    color: #409eff;
    .reset {
      margin: 0 10px;
    }
  }
}

.list {
  height: 50px;
  @include flex;
  @include flexLeftRight;
  @include flexMiddle;
  padding: 0 20px;
  background: #eee;
  border-bottom: 1px solid #fff;
  .listRight {
    @include flex;
    color: #409eff;
    .listdel {
      margin-left: 20px;
    }
  }
}
</style>
