<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <div class="bannerBtns">
        <el-button type="primary" @click='addOne'>添加</el-button>
      </div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :name="index" v-for="(item,index) in list" :key="item.id">
          <template slot="title">
            <div class="con">
              <div class="left">{{item.name}}</div>
              <div class="right">
                <div class="addFilter" @click.stop="addFilter(index,item.id)">添加筛选项</div>
                <div class="reset" @click.stop="reset(index,item.id)">编辑</div>
                <div class="del" @click.stop="del(index,item.id)">删除</div>
              </div>
            </div>
          </template>
          <div class="list" v-for="(items,indexs) in item.son_cates" :key="items.id">
            <div class="listLeft">{{items.name}}</div>
            <div class="listRight">
              <div class="listreset" @click.stop="resetDet(index,indexs,items.id)">编辑</div>
              <div class="listdel" @click.stop="delDet(index,indexs,items.id)">删除</div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 对话框 -->
      <el-dialog title="请填写信息" :visible.sync="dialogFormVisible" center width="40%" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="请输入分类名称" :label-width="formLabelWidth">   
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelBtn">取 消</el-button>
          <el-button type="primary" @click="sureBtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {goodCate,addCate,addTwoCate,delCate,editCate} from "../../api/shoppings/Shopping.js";
export default {
  data() {
    return {
      PageName: "商品分类",
      activeNames: ["0"],
      dialogFormVisible: false,
      type: null,
      form: {
        name: "",
        index: null,
        indexs: null,
        id:null,
      },
      formLabelWidth: "150px",
      list: [],
      thisToken:'',
    };
  },
  components: {
    Dingbu
  },
  computed:{
    ...mapGetters(['token']),
  },
  methods: {
    ...mapActions(["checkShoppingsIndex",'checkToken']),
    getData(){
      goodCate({params:{token:this.thisToken}}).then(res=>{
        this.list = res.data.cates
      }).catch(err=>{
        console.log(err);
      })
    },
    handleChange(res) {},
    //
    addOne() {
      this.dialogFormVisible = true;
      this.type = 1;
    },
    // 添加筛选项
    addFilter(index,id) {
      this.dialogFormVisible = true;
      this.type = 2;
      this.form.index = index;
      this.form.id = id;
    },
    //编辑
    reset(index,id) {
      this.dialogFormVisible = true;
      this.form.name = this.list[index].name;
      this.type = 3;
      this.form.index = index;
      this.form.id = id;
    },
    //删除一级分类接口
    del(index,id) {
      if (this.list[index].son_cates.length == 0) {
        // 请求一级删除接口
        delCate({token:this.thisToken,cate_id:id}).then(res=>{
          this.list.splice(index, 1);
        }).catch(err=>{
          console.log(err);
        })
      } else {
        this.open4();
      }
    },
    open4() {
      this.$alert("请删除二级分类才能删除一级分类！", "提示", {
        confirmButtonText: "确定"
      });
      return;
    },
    handleClose(){
      this.form = {name:'',id:null,index:null,indexs: null};
      this.type=null;
      this.dialogFormVisible = false;
    },
    cancelBtn() {
      this.form = {name:'',id:null,index:null,indexs:null};
      this.type=null;
      this.dialogFormVisible = false;
    },
    // 添加分类
    sureBtn() {
      if (this.type == 1) {
        addCate({token:this.thisToken,name:this.form.name,parent_id:0}).then(res=>{
          this.dialogFormVisible = false;
          this.form.name = "";
          this.type = null;
          this.getData();
        }).catch(err=>{
          console.log(err);
        })
      }
      if (this.type == 2) {
        addTwoCate({token:this.thisToken,name:this.form.name,parent_id:this.form.id}).then(res=>{
          this.dialogFormVisible = false;
          this.form = {name:'',id:null,index:null};
          this.type = null;
          this.getData();
        }).catch(err=>{
          console.log(err);
        })
      }
      if (this.type == 3) {
        editCate({token:this.thisToken,name:this.form.name,cate_id:this.form.id}).then(res=>{
          this.dialogFormVisible = false;
          this.form = {name:'',id:null,index:null};
          this.type = null;
          this.getData();
        }).catch(err=>{
          console.log(err);
        })
      }
      if (this.type == 4) {
        editCate({token:this.thisToken,name:this.form.name,cate_id:this.form.id}).then(res=>{
          this.dialogFormVisible = false;
          this.form = {name:'',id:null,index:null,indexs: null};
          this.type = null;
          this.getData();
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    // 删除二级分类接口
    delDet(index, indexs,id) {
      // 请求二级删除接口
      delCate({token:this.thisToken,cate_id:id}).then(res=>{
          if(res.code==1){
            this.$alert(res.message, "提示", {
              confirmButtonText: "确定"
            });
            return;
          }else{
            this.list[index].son_cates.splice(indexs, 1);
          }
        }).catch(err=>{
          console.log(err);
        })
    },
    // 二级分类编辑
    resetDet(index, indexs,id) {
      this.dialogFormVisible = true;
      this.form.name = this.list[index].son_cates[indexs].name;
      this.type = 4;
      this.form.index = index;
      this.form.indexs = indexs;
      this.form.id = id;
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkShoppingsIndex", "/shopping/shoppingcate");
  },
  created:function(){
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.bannerBtns {
  padding: 10px 0;
  @include flex;
  @include flexRight;
}

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
