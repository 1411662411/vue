<template>
  <div>
    <!-- 顶部 -->
    <dingbu :nameTitle="PageName" :refresh="RefreshName"></dingbu>
    <div class="w">
      <div class="buttons">
        <!-- <el-button @click="allgoods()">全部商品(<span class="btn-red">1000</span>)</el-button>
        <el-button @click="readygoods()">已上架(<span class="btn-red">800</span>)</el-button>
        <el-button @click="nogoods()">未上架(<span class="btn-red">200</span>)</el-button> -->
        <el-button @click="allgoods()" :class="{'btnColor':btns == 0}">全部商品</el-button>
        <el-button @click="readygoods()" :class="{'btnColor':btns == 1}">已上架</el-button>
        <el-button @click="nogoods()" :class="{'btnColor':btns == 2}">未上架</el-button>
      </div>
      <!-- 搜索框 -->
      <div style="1100px;height:60px;line-height:60px;border:1px solid rgba(228, 228, 228, 1);margin-bottom:20px;">
        <div style="margin-top: 15px;width:385px;margin-top:0px;margin-left:20px;">
          <el-input placeholder="请输入商品名称" v-model="input4">
            <template slot="append"><el-button type="primary" @click="search()">搜索</el-button></template>
          </el-input>
        </div>
        <el-button type="primary" icon="el-icon-plus" style="float:right;margin-top:-50px;margin-right:20px;border-radius:0;" @click="addShopping">添加商品</el-button>
      </div>
      <!-- 下架、删除 -->
      <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);background-color: rgba(243, 243, 243, 1);text-align:left;">
        <el-button size="small" icon="el-icon-download" style="margin-left:20px;" @click="downAllGood">下架</el-button>
        <el-button size="small" icon="el-icon-delete" @click="delAll">删除</el-button>
      </div>
      <!-- 表格 -->
      <el-table ref="multipleTable" border :data="tableData6" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" fixed></el-table-column>
        <el-table-column prop="id" label="商品ID" align="center" width="80"></el-table-column>
        <el-table-column prop="cover" label="商品图片" align="center" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.cover"/>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center" width="218" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="价格" align="center" width="91"></el-table-column>
        <el-table-column prop="agent_price" label="代理商价格" align="center" width="95"></el-table-column>
        <el-table-column prop="stock" label="库存" align="center" width="66"></el-table-column>
        <el-table-column prop="sales" label="销量" align="center" width="51"></el-table-column>
        <el-table-column prop="limit" label="限购数量" align="center" width="65"></el-table-column>
        <el-table-column prop="discount" label="优惠" align="center" width="80">
          <template slot-scope="scope">
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="isDiscount(scope.row.id)" v-show="scope.row.discount == 0">优惠</a>
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="isDiscount(scope.row.id)" v-show="scope.row.discount == 1">非优惠</a>
          </template>
        </el-table-column>
        <el-table-column prop="composer" label="套餐" align="center" width="61"></el-table-column>
        <el-table-column prop="is_hot" label="推荐" align="center" width="81" fixed="right">
          <template slot-scope="scope">
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="hotGood(scope.row.id)">{{scope.row.is_hot}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="69" fixed="right">
          <template slot-scope="scope">
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="downGood(scope.row.id)">{{scope.row.status}}</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="126" fixed="right">
          <template slot-scope="scope">
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="addShoppingList(scope.row.id)">编辑</a>
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="delGoods(scope.row.id)">删除</a>
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="addGoods(scope.row)" v-show="scope.row.is_spike == 0">添加秒杀</a>
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;" @click="cancelGoods(scope.row)" v-show="scope.row.is_spike == 1">移除秒杀</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 多选操作 -->
      <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);margin-top:10px;text-align:left;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float:right;margin-top:8px;margin-right:18px;"
          layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>

    <!-- 添加秒杀 -->
    <el-dialog title="添加秒杀" :visible.sync="dialogFormVisible3">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="秒杀价格" prop="price">
          <el-input v-model="ruleForm.price" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="代理商秒杀价格" prop="agent_price">
          <el-input v-model="ruleForm.agent_price" style="width:350px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button 
          @click="dialogFormVisible3 = false"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          取 消
        </el-button>
        <el-button type="success"
         @click="addSpikes"
         style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
         确 定
         </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {goodList,downGood,hotGood,delGood,addSpikeGood,cancelSpikeGood,discount} from "../../api/shoppings/Shopping.js";
export default {
  data() {
    return {
      input4: "",
      status:'',
      PageName: "商品列表",
      RefreshName: "刷新",
      tableData6: [],
      currentPage4: '',
      total:null,
      multipleSelection:[],
      thisToken:'',
      dialogFormVisible3: false,
      ruleForm: {
        price: "",
        agent_price: ""
      },
      id: null,
      btns:0,
    };
  },
  computed:{
    ...mapGetters(['token']),
  },
  methods: {
    ...mapActions(["checkShoppingsIndex",'checkToken']),
    allgoods(){this.btns=0,this.status='';this.input4='';this.getData();},//全部商品
    readygoods(){this.btns=1,this.status='1';this.input4='';this.getData();},//已上架
    nogoods(){this.btns=2,this.status='2';this.input4='';this.getData();},//未上架
    search(){this.btns=0,this.status='';this.getData();},//搜索
    isDiscount(id){
      discount({token:this.thisToken,id:id}).then(res=>{
        if(res.code==0){
          this.getData();
        }else{
          this.$notify({
              title: '修改失败',
              message: '',
              type: 'error',
              offset: 60
          });
        }
      })
    },
    getData(){
      goodList({params:{token:this.thisToken,good_name:this.input4,status:this.status,page:this.currentPage4}}).then(res=>{
        console.log(res)
        this.currentPage4 = res.data.good_list.current_page;
        this.total = res.data.good_list.total;
        this.tableData6 = res.data.good_list.data;
        for(let i=0;i<this.tableData6.length; i++){
          if(this.tableData6[i].is_hot==1){
            this.tableData6[i].is_hot="热卖";
          }else{
            this.tableData6[i].is_hot="非热卖";
          }
          if(this.tableData6[i].status==1){
            this.tableData6[i].status="上架";
          }else{
            this.tableData6[i].status="下架";
          }
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    addGoods(row) {//添加到秒杀
      this.dialogFormVisible3 =true;
      this.id = row.id;
    },
    addSpikes() {
      addSpikeGood({token: this.thisToken,good_id: this.id, price: this.ruleForm.price, agent_price: this.ruleForm.agent_price}).then(res => {
        this.dialogFormVisible3 = false;
      }).then(res => {
        this.ruleForm.price = '';
        this.ruleForm.agent_price = '';
        this.getData();
      })
    },
    cancelGoods(row) {//移除秒杀
      cancelSpikeGood({token: this.thisToken,good_id: row.id}).then( res => {
        this.getData();
      })
    },
    // 上下线
    downGood(id){
      downGood({token:this.thisToken,good_id:id}).then(res=>{
        this.getData(this.status);
      }).catch(err=>{
        console.log(err);
      })
    },
    // 是否热卖
    hotGood(id){
      hotGood({token:this.thisToken,good_id:id}).then(res=>{
        this.getData(this.status);
      }).catch(err=>{
        console.log(err);
      })
    },
    // 删除商品
    delGoods(id){
      delGood({token:this.thisToken,good_id:id}).then(res=>{
        this.getData();
      }).catch(err=>{
        console.log(err);
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAll(){
      for(let i=0; i<this.multipleSelection.length;i++){
        delGood({token:this.thisToken,good_id:this.multipleSelection[i].id}).then(res=>{
          this.getData(this.status);
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    downAllGood(){
      for(let i=0; i<this.multipleSelection.length;i++){
        if(this.multipleSelection[i].status=="下架"){
          this.$alert("您选择的商品有已经下架的商品，请重新选择！", "提示", {
            confirmButtonText: "确定"
          });
          return;
        }else{
          downGood({token:this.thisToken,good_id:this.multipleSelection[i].id}).then(res=>{
            this.getData(this.status);
          }).catch(err=>{
            console.log(err);
          })
        }
      }
    },
    // getSummaries(param) {},
    addShoppingList(id){
      let shoppingId = id;
      this.$router.push({ name: "shoppingadd", path: "/shopping/shoppingadd",params: { shoppingId }});
    },
    addShopping() {
      let shoppingId = -1;
      this.$router.push({ name: "shoppingadd", path: "/shopping/shoppingadd",params: { shoppingId }});
    },
    handleSizeChange(val) {
      this.currentPage4 = val;
      this.getData();
      // console.log(val);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getData();
      // console.log(val);
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkShoppingsIndex", "/shopping/shoppinglist");
  },
  created:function(){
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.getData();
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.el-table img{
  width:40px;
  height: 40px;
}
</style>
