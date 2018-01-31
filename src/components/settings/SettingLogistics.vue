<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <div id="u890_div">
        <el-button type="primary" icon="el-icon-plus" @click="addLogistics" style="float:right;margin:9px 20px 9px 0;padding:7px 10px;border-radius:0;">
          添加
        </el-button>
      </div>
      <div class="main">
        <el-table :data="tableData" border style="width: 800px;margin:0 auto;">
          <el-table-column fixed prop="id" label="编号ID" width="100">
          </el-table-column>
          <el-table-column prop="name" label="物流公司名称">
          </el-table-column>
          <el-table-column label="计费方式" width="200">
            <template slot-scope="scope">按区域计算</template>
          </el-table-column>
          <el-table-column prop="is_select" label="是否启用" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-color="#13ce66"  inactive-color="#9b9b9b" @change="selectSwitch(scope.row.id,scope.$index)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { logistics,blockLogistics,delLogistics } from "../../api/settings/Setting.js";
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
  data() {
    return {
      PageName: "物流公司",
      tableData: [],
      thisToken:'',
    };
  },
  components: {
    Dingbu
  },
  computed:{
    ...mapGetters(['token']),
  },
  created:function(){
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.getData();
  },
  methods: {
    ...mapActions(['checkToken']),
    getData(){
      var that = this;
      logistics({params:{token:this.thisToken}}).then(res=>{
        that.tableData = res.data.feight;
        for(let i=0;i<that.tableData.length;i++){
          if(that.tableData[i].status==1){
            that.tableData[i].status = true;
          }else{
            that.tableData[i].status = false; 
          }
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    addLogistics(){
      let logId = -1;
      this.$router.push({
        name: "addLogistics",
        path: "/setting/addLogistics",
        params: { logId }
      });
    },
    ...mapActions(['checkSettingsIndex']),
    handleClick(row) {
      let logId = row.id;
      this.$router.push({
        name: "addLogistics",
        path: "/setting/addLogistics",
        params: { logId }
      });
    },
    //删除
    deleteRow(index, rows,id) {
      delLogistics({token:this.thisToken,id:id}).then(res=>{
        rows.splice(index, 1);
      }).catch(err=>{
        console.log(err);
      })
      
    },
    // 是否显示
    selectSwitch(res,index) {
      blockLogistics({token: this.thisToken, id: res}).then(res => {
        this.getData();
      }).catch(err=>{
        console.log(err);
      })
    },
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/logistics');
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
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
.el-switch {
  height: 23px;
  line-height: 23px;
}
</style>
