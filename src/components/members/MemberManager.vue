<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <!-- 导出数据 -->
      <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;margin-top:20px;">
        <div style="float:right;">
          <el-button style="margin-right:20px;margin-left:5px;padding:8px 20px;border-radius:0;" @click="memberAdd">
            添加
          </el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" align="center" width="179">
        </el-table-column>
        <el-table-column prop="manager_name" label="项目经理账号" align="center" width="179">
        </el-table-column>
        <el-table-column prop="real_name" label="项目经理姓名" align="center" width="177">
        </el-table-column>
        <el-table-column label="项目经理下属数量" align="center" width="139">
          <template slot-scope="scope">
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;" @click="memberBranchDetail(scope.$index, tableData,scope.row)">
              {{scope.row.sale_number}}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="添加时间" align="center" width="234">
        </el-table-column>
        <el-table-column width="190" label="操作" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;" @click="memberEdit(scope.$index, tableData,scope.row.id)">
              编辑
            </a>
            <a href="javascript:;" style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;" @click="del(scope.$index, tableData,scope.row.id)">
              删除
            </a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible4">
      <span>确定删除该成员吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false" style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          取 消
        </el-button>
        <el-button type="success" @click="sureDel" style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
  import Dingbu from "../header/dingbu.vue";
  import Base from '../../common/Base.js';
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  import {
    managerList,
    delManager
  } from "../../api/members/Member.js";
  export default {
    mixins: [Base],
    data() {
      return {
        PageName: "成员管理",
        value1: "",
        dialogFormVisible4: false,
        tableData: [],
        id: '',
      };
    },
    computed: {
      ...mapGetters(['token'])
    },
    methods: {
      ...mapActions(['checkToken']),
      memberAdd() {
        this.$router.push({
          name: "memberadd",
          path: "/member/memberadd"
        });
      },
      memberEdit(i, t, r) {
        this.$router.push({
          name: "memberedit",
          params: {
            id: r
          }
        });
      },
      memberBranchDetail(i, t, r) {
        this.$router.push({
          name: "memberbranchdetail",
          params: {
            ids: r.id
          }
        });
      },
      getData() {
        var reg = /['上午'|'下午']/g;
        this.$store.dispatch('checkToken', localStorage.getItem('data'))
        managerList({
          params: {
            token: this.$store.state.token
          }
        }).then(res => {
          var arr = res.data.manager_list;
          for (var i = 0; i < arr.length; i++) {
            arr[i].created_at = this.changeTime(arr[i].created_at).replace(reg, ' ');
          }
          this.$data.tableData = arr;
          console.log(res);
        });
      },
      del(i, t, r) {
        this.dialogFormVisible4 = true;
        this.id = r;
      },
      sureDel() {
        this.$store.dispatch('checkToken', localStorage.getItem('data'))
        delManager({
          token: this.$store.state.token,
          id: this.id
        }).then(res => {
          this.dialogFormVisible4 = false;
          console.log(res);
        }).then(res => {
          this.getData();
        })
      }
    },
    created() {
      this.getData();
    },
    components: {
      Dingbu
    }
  };

</script>

<style lang="scss" scoped>
  @import "../../css/common.scss";

</style>
