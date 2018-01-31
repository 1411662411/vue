<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <div class="bannerBtns">
          <el-button type="primary" @click='addNav'>添加</el-button>
        </div>
        <el-table :data="tableData" border style="width: 1100px">
          <el-table-column fixed prop="id" label="导航ID" width="90">
          </el-table-column>
          <el-table-column prop="cover" label="菜单logo" width="100">
            <template slot-scope="scope">
              <img :src="scope.row.cover"/>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="导航菜单名称" width="120">
          </el-table-column>
           <el-table-column prop="url" label="链接" width="608">
          </el-table-column>
          <el-table-column prop="status" label="是否显示" width="80">
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
import {mapGetters, mapMutations, mapActions} from 'vuex';
import { menus,blockNav,delNav } from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "导航菜单",
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
  methods: {
    ...mapActions(['checkSettingsIndex','checkToken']),
    addNav() {
      let menuId = -1;
      this.$router.push({
        name: "addMenu",
        path: "/setting/addMenu",
        params: { menuId }
      });
    },
    handleClick(row) {
      let menuId = row.id;
      this.$router.push({
        name: "addMenu",
        path: "/setting/addMenu",
        params: { menuId }
      });
    },
    //删除
    deleteRow(index, rows,id) {
      delNav({token:this.thisToken,id:id}).then(res=>{
        rows.splice(index, 1);
      }).catch(err=>{
        console.log(err);
      })
    },
    // 是否显示
    selectSwitch(res) {
      var that = this;
      blockNav({token: this.thisToken, id: res}).then((res) => {
        console.log(res);
      })
    },
    getData() {
      var that = this;
      menus({ params: { token: this.thisToken } })
        .then(res => {
          this.$data.tableData = res.data.navigations;
          for (let i = 0; i < that.tableData.length; i++) {
            if (that.tableData[i].status == 1) {
              that.tableData[i].status = true;
            } else {
              that.tableData[i].status = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/menu');
  },
  created: function() {
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
.el-table img {
  width: 60px;
  height: 60px;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
</style>
