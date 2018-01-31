<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <div class="bannerBtns">
        <el-button type="primary" @click='addBanner'>添加图片</el-button>
      </div>
      <el-table :data="tableData" border style="width: 1100px">
        <el-table-column fixed prop="id" label="图片Id" width="150">
        </el-table-column>
        <el-table-column prop="cover" label="图片链接" width="320">
          <template slot-scope="scope">
            <img :src="scope.row.cover"/>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="跳转链接" width="408">
        </el-table-column>
        <el-table-column prop="status" label="是否显示" width="120" >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66"  inactive-color="#9b9b9b" @change="selectSwitch(scope.row.id)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { Message } from 'element-ui';
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {getBanners,toggle,delBanner} from '../../api/settings/Setting.js';
export default {
  data() {
    return {
      PageName: "banner图",
      tableData: [],
      thisToken:'',
    };
  },
  components: {
    Dingbu
  },
  computed: {
    ...mapGetters(["marketingsindex", "token"])
  },
  methods: {
    ...mapActions(['checkSettingsIndex', "checkToken"]),
    addBanner() {
      let bannerId = -1;
      this.$router.push({
        name: "addBanner",
        path: "/setting/addBanner",
        params: { bannerId }
      });
    },
    handleClick(row) {
      let bannerId = row.id;
      this.$router.push({
        name: "addBanner",
        path: "/setting/addBanner",
        params: { bannerId }
      });
    },
    //删除
    deleteRow(index, rows,id) {
      delBanner({token:this.thisToken,id:id}).then(res=>{
        rows.splice(index, 1);
      }).catch(err=>{
        console.log(err);
      })
    },
    // 是否显示
    selectSwitch(res) {
      var that = this;
      toggle({token: this.thisToken, id: res}).then((res) => {
        console.log(res);
      })
    },
    getData() {
      var that = this;
      getBanners({params:{token:this.thisToken}}).then((res) => {
        console.log(res);
        that.$data.tableData = res.data.banners;
        for(let i=0;i<that.tableData.length;i++){
          if(that.tableData[i].status==1){
            that.tableData[i].status = true;
          }else{
            that.tableData[i].status = false;
          }
        }
      }).catch((err) =>{
          console.log(err);
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/banner');
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
.bannerBtns {
  padding: 10px 0;
  @include flex;
  @include flexRight;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
.el-table__row img{
  width: 50px;
  height: 50px;
}
</style>
