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
              width="79">
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户头像"
              align="center"
              width="79">
              <template slot-scope="scope">
                <img :src="scope.row.avatar" />
              </template>
            </el-table-column>
            <el-table-column
              prop="nick_name"
              label="用户昵称"
              align="center"
              width="100">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="用户手机号码"
              align="center"
              width="142">
            </el-table-column>
            <el-table-column
              prop="sale_man"
              label="所属业务员"
              align="center"
              width="117">
            </el-table-column>
            <el-table-column
              prop="order_money"
              label="消费总金额(￥)"
              align="center"
              width="152">
            </el-table-column>
            <el-table-column
              prop="order_count"
              label="下单次数"
              align="center"
              width="111">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="注册时间"
              align="center"
              width="173">
            </el-table-column>
            <el-table-column
              width="143"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <a 
                  href="javascript:;" 
                  style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                  @click="manager(scope.$index, tableData,scope.row.id)">
                  管理
                </a>
                <a 
                  href="javascript:;" 
                  style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                  @click="userDetail(scope.$index, tableData,scope.row.id)">
                  查看
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
            :page-size="pageSize"
            :total="total">
          </el-pagination>
        </div>
      </div>

      <!-- 管理 -->
      <el-dialog title="用户管理" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="所属业务员" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="系统业务员" style="width:70%;">
                    <el-option v-for="(saleman, index) in saleMan" :label="saleman.name" :value="saleman.id" :key="saleman.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="success" @click="sure">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>


<script>
import Dingbu from "../header/dingbu.vue";
import Base from "../../common/Base.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  userList,
  searchUser,
  saleChange,
  saleList
} from "../../api/users/User.js";
export default {
  mixins: [Base],
  data() {
    return {
      PageName: "用户列表",
      input4: "",
      dialogFormVisible: false,
      timeStamp: "/Date(1493424000000)/",
      tableData: [],
      ruleForm: {
        region: ""
      },
      total: 1,
      currentPage: 1,
      pageSize: 1,
      form: {
        region: ""
      },
      formLabelWidth: "160px",
      saleMan: [],
      id: "",
      thisToken:'',
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkUsersIndex", "checkToken"]),
    userDetail(i, t, r) {
      this.$router.push({ name: "userdetail", params: { id: r } });
    },
    handleSizeChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    getData(state) {
      var reg = /['上午'|'下午']/g;
      userList({
        params: { token: this.thisToken, page: this.currentPage }
      }).then(res => {
        this.tableData = res.data.user_list.data;
        this.pageSize = res.data.user_list.per_page;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].created_at = this.changeTime(
            this.tableData[i].created_at
          ).replace(reg, " ");
        }
        this.total = res.data.user_list.total;
        console.log(res);
      });
    },
    search() {
      var reg = /['上午'|'下午']/g;
      searchUser({
        params: {
          token: this.thisToken,
          type: "1",
          nick_name: this.input4
        }
      }).then(res => {
        this.tableData = res.data.user_list.data;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].created_at = this.changeTime(
            this.tableData[i].created_at
          ).replace(reg, " ");
        }
        this.total = res.data.user_list.total;
      });
    },
    manager(i, t, r) {
      this.id = r;
      this.dialogFormVisible = true;
      saleList({params:{ token: this.thisToken }}).then(res => {
        this.saleMan = res.data.sale_list;
        console.log(res);
      });
    },
    sure() {
      saleChange({
        token: this.thisToken,
        id: this.id,
        sale_id: this.form.region
      }).then(res => {
        this.getData();
        this.dialogFormVisible = false;
      });
    }
  },
  created() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    this.getData();
  },
  components: {
    Dingbu
  },
  beforeCreate() {
    this.$store.dispatch("checkUsersIndex", "/user/userlist");
  },
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.el-table img {
  width: 50px;
  height: 50px;
}
</style>
