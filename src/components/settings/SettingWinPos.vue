<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <el-table :data="tableData" border style="width: 1100px">
        <el-table-column fixed prop="id" label="橱窗ID" width="80">
        </el-table-column>
        <el-table-column prop="cover" label="橱窗图片" width="170">
          <template slot-scope="scope">
            <img :src="scope.row.cover"/>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="主标题名称" width="120">
        </el-table-column>
        <el-table-column prop="des" label="副标题名称" width="120">
        </el-table-column>
        <el-table-column prop="url" label="链接" width="508">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bot">
        <img src="../../images/winPos.png"/>
        <div>橱窗位效果预览图</div>
      </div>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import {mapGetters, mapMutations, mapActions} from 'vuex';
import { window } from "../../api/settings/Setting.js";
export default {
  data() {
    return {
      PageName: "橱窗位",
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
    handleClick(row) {
      let winPosId = row.id;
      this.$router.push({
        name: "addWinpos",
        path: "/setting/addWinPos",
        params: { winPosId }
      });
    },
    getData() {
      window({ params: { token: this.thisToken } })
        .then(res => {
          this.$data.tableData = res.data.windows;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/winpos');
  },
  created() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.getData();
  }
};
</script>

<style lang="scss" cscoped>
@import "../../css/common.scss";
.w {
  margin-top: 20px;
}
.el-switch {
  height: 23px;
  line-height: 23px;
}
.bot {
  @include flex;
  @include flexMult;
  @include flexVertical;
  > img {
    width: 600px;
    height: 292px;
    margin: 0 auto;
  }
  > div {
    font-size: 14px;
    text-align: center;
    margin-top: 30px;
  }
}
.el-table img {
  width: 60px;
  height: 60px;
}
</style>
