<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <!-- 搜索框 -->
        <div style="1100px;height:60px;line-height:60px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;margin-top:20px;">
          <div style="margin-top: 15px;width:385px;margin-top:0px;margin-left:20px;float:left;">
            <el-input placeholder="用户昵称" v-model="input4">
              <template slot="append"><el-button type="primary" @click="search">搜索</el-button></template>
            </el-input>
          </div>
          <!-- <div style="float:right;">
            <el-button style="margin-right:20px;margin-left:5px;">导出数据</el-button>
          </div> -->
          <!-- 表格 -->
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="用户ID"
              align="center"
              width="95">
            </el-table-column>
            <el-table-column
              prop="avatar"
              label="用户头像"
              align="center"
              width="151">
              <template slot-scope="scope">
                <img :src="scope.row.avatar" />
              </template>
            </el-table-column>
            <el-table-column
              prop="nick_name"
              label="用户昵称"
              align="center"
              width="94">
            </el-table-column>
            <el-table-column
              prop="apply_at"
              label="申请时间"
              align="center"
              width="151">
            </el-table-column>
            <el-table-column
              prop="sale_man"
              label="所属业务员账户"
              align="center"
              width="157">
            </el-table-column>
            <el-table-column
              prop="apply"
              label="状态"
              align="center"
              width="261">
              <template slot-scope="scope">
                <span v-show="scope.row.apply == 2">待处理</span>
                <span v-show="scope.row.apply == 3">已拒绝</span>
                <span v-show="scope.row.apply == 4">已同意</span>
              </template>
            </el-table-column>
            <el-table-column
              width="187"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <a 
                  href="javascript:;" 
                  style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                  v-show="scope.row.apply == 4"
                  @click="agentLook(scope.$index, tableData,scope.row)">
                  查看
                </a>
                <a 
                  href="javascript:;" 
                  style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                  v-show="scope.row.apply == 2"
                  @click="agentDo(scope.$index, tableData,scope.row)">
                  处理
                </a>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="float:right;margin-top:8px;margin-right:18px;"
            layout="total, prev, pager, next, jumper"
            :page-size="per_page"
            :total="total">
          </el-pagination>
        </div>
      </div>
  </div>
</template>


<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Base from "../../common/Base.js";
import { agentList, searchUser } from "../../api/users/User.js";
export default {
  mixins: [Base],
  data() {
    return {
      PageName: "代理商列表",
      input4: "",
      total: null,
      currentPage: 1,
      per_page: 1,
      tableData: [],
      ruleForm: {
        name: "0元",
        region: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "请输入整数", trigger: "blur" }
        ],
        region: [{ required: true, message: "请选择活动区域", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkUsersIndex", "checkToken"]),
    handleSizeChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    agentLook(i, t, r) {
      this.$router.push({ name: "agentdetail", params: { id: r.id } });
    },
    agentDo(i, t, r) {
      this.$router.push({ name: "agentdetail", params: { id: r.id } });
    },
    getData(state) {
      var reg = /['上午'|'下午']/g;
      this.$store.dispatch("checkToken", localStorage.getItem("data"));
      agentList({
        params: {
          token: this.$store.state.token,
          apply: state,
          page: this.currentPage
        }
      }).then(res => {
        this.tableData = res.data.user_list.data;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].apply_at = this.changeTime(
            this.tableData[i].apply_at
          ).replace(reg, " ");
        }
        this.total = res.data.user_list.total;
        this.per_page = res.data.user_list.per_page;
        console.log(res);
      });
    },
    search() {
      var reg = /['上午'|'下午']/g;
      searchUser({
        params: {
          token: this.$store.state.token,
          type: "2",
          nick_name: this.input4
        }
      }).then(res => {
        this.tableData = res.data.user_list.data;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].apply_at = this.changeTime(
            this.tableData[i].apply_at
          ).replace(reg, " ");
        }
        this.total = res.data.user_list.total;
      });
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkUsersIndex", "/user/agentlist");
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
.el-table__row img {
  width: 90px;
  height: 50px;
}
</style>
