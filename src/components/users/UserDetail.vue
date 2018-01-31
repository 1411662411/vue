<template>
  <div>
      <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
      <div class="w">
        <!-- 用户详情表格 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:20px;">
            <el-table-column
                prop="id"
                label="用户ID"
                align="center"
                width="100">
            </el-table-column>
            <el-table-column
                prop="nick_name"
                label="用户昵称"
                align="center"
                width="122">
            </el-table-column>
            <el-table-column
                label="用户类别"
                align="center"
                width="144">
                <template slot-scope="scope">
                  <span v-show="scope.row.type == 1">
                    普通用户
                  </span>
                  <span v-show="scope.row.type == 2">
                    代理商
                  </span>
                  <a 
                      href="javascript:;" 
                      style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                      @click="sm(scope.$index, tableData,scope.row)">
                      管理
                  </a>
                </template>
            </el-table-column>
            <el-table-column
                prop="order_money"
                label="消费总金额(￥)"
                align="center"
                width="122">
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="注册时间"
                align="center"
                width="122">
            </el-table-column>
            <el-table-column
                prop="name"
                label="用户头像"
                align="center"
                width="122">
                <template slot-scope="scope">
                  <img :src="scope.row.avatar" @click="loadImg(scope.row.avatar)"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="phone"
                label="用户手机号"
                align="center"
                width="122">
            </el-table-column>
            <el-table-column
                prop="sale_man"
                label="所属业务员"
                align="center"
                width="122">
                <template slot-scope="scope">
                  {{ scope.row.sale_man }}
                  <a 
                      href="javascript:;" 
                      style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                      @click="manager(scope.$index, tableData,scope.row.id)">
                      管理
                  </a>
                </template>
            </el-table-column>
            <el-table-column
                prop="order_count"
                label="下单次数"
                align="center"
                width="122">
            </el-table-column>
        </el-table>

        <!-- 导出数据 -->
        <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;margin-top:20px;background-color: rgba(243, 243, 243, 1);">
            <img src="../../images/tag.png" style="width:11px;height:18px;position:relative;top:5px;left:-50px;z-index:2;"/>
            <p class="u50561" style="position:relative;left:15px;">统计信息</p>
            <div style="float:right;">
                <el-button 
                    style="margin-right:20px;margin-left:5px;padding:8px 20px;border-radius:0;"
                    >
                    导出数据
                </el-button>
            </div>
        </div>

        <!-- 统计信息表格 -->
        <el-table
            :data="tableData2"
            border
            style="width: 100%;">
            <el-table-column
                prop="id"
                label="序号"
                align="center"
                width="56">
            </el-table-column>
            <el-table-column
                prop="order_sn"
                label="订单编号/退款单号"
                align="center"
                width="206">
            </el-table-column>
            <el-table-column
                prop="created_at"
                label="订单创建时间"
                align="center"
                width="232">
            </el-table-column>
            <el-table-column
                prop="pay_at"
                label="支付/退款时间"
                align="center"
                width="259">
            </el-table-column>
            <el-table-column
                prop="pay_type"
                label="支付方式"
                align="center"
                width="160">
            </el-table-column>
            <el-table-column
                prop="total_price"
                label="订单金额(￥)"
                align="center"
                width="185">
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
      <!-- 用户管理 -->
      <el-dialog title="用户管理" :visible.sync="dialogFormVisible3">
        <el-form :model="ruleForm"  ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="请选择用户分类" prop="region">
            <el-select v-model="ruleForm.region" placeholder="普通用户" style="width:350px;">
              <el-option label="普通用户" value="shanghai"></el-option>
              <el-option label="代理商" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible3 = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="managerOrSale"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 用户管理-选择从属业务员 -->
      <el-dialog title="用户管理" :visible.sync="dialogFormVisible4">
        <el-form :model="ruleForm2"  ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="请选择从属业务员" prop="region">
            <el-select v-model="ruleForm2.region" placeholder="普通用户" style="width:350px;">
              <el-option v-for="(saleman, index) in saleMan" :label="saleman.name" :value="saleman.id" :key="saleman.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible4 = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="sure"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import Base from "../../common/Base.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  userDetail,
  upGradeUser,
  saleChange,
  saleList
} from "../../api/users/User.js";
export default {
  mixins: [Base],
  data() {
    return {
      PageName: "用户详情",
      BackName: "返回",
      RefreshName: "刷新",
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      tableData: [],
      tableData2: [],
      ruleForm: {
        region: ""
      },
      ruleForm2: {
        region: ""
      },
      total: 1,
      currentPage: 1,
      per_page: 1,
      id: "",
      saleMan: []
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkToken"]),
    countSaleDetail() {},
    handleSizeChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    getData() {
      this.$store.dispatch('checkToken',localStorage.getItem('data'))
      var reg = /['上午'|'下午']/g;
      userDetail({
        params: {
          token: this.$store.state.token,
          id: this.$route.params.id,
          page: this.currentPage
        }
      }).then(res => {
        // this.tableData[0].id = res.data.id;
        // this.tableData[0].nick_name = res.data.nick_name;
        // this.tableData[0].type = res.data.type;
        // this.tableData[0].order_money = res.data.order_money;
        // this.tableData[0].created_at = this.changeTime(
        //   res.data.created_at
        // ).replace(reg, " ");
        // this.tableData[0].avatar = res.data.avatar;
        // this.tableData[0].phone = res.data.phone;
        // this.tableData[0].sale_man = res.data.sale_man;
        // this.tableData[0].order_count = res.data.order_count;
        this.tableData = [];
        this.tableData.push(res.data);
        this.tableData[0].created_at = this.changeTime(res.data.created_at);
        //统计详情
        var arr = res.data.statis.data;
        for (var i = 0; i < arr.length; i++) {
          arr[i].created_at = this.changeTime(arr[i].created_at);
          arr[i].pay_at = this.changeTime(arr[i].pay_at);
          if (arr[i].pay_type == 1) {
            arr[i].pay_type = "微信支付";
          } else if (arr[i].pay_type == "2") {
            arr[i].pay_type = "货到付款";
          } else if (arr[i].pay_type == "3") {
            arr[i].pay_type = "线下支付";
          }
        }
        this.tableData2 = arr;
        this.total = res.data.statis.total;
        this.per_page = res.data.statis.per_page;
        console.log(res);
      });
    },
    sm(i, t, r) {
      if (r) {
        this.id = r.id;
        this.dialogFormVisible3 = true;
      }
    },
    managerOrSale() {
      console.log(this.id);
      upGradeUser({ token: this.$store.state.token, id: this.id }).then(res => {
        console.log(res);
        this.$router.push({ name: "agentlist", path: "/user/agentlist" });
        // this.getData();
      });
    },
    manager(i, t, r) {
      this.id = r;
      this.dialogFormVisible4 = true;
      saleList({ token: this.$store.state.token }).then(res => {
        this.saleMan = res.data.sale_list;
        console.log(res);
      });
    },
    sure() {
      saleChange({
        token: this.$store.state.token,
        id: this.id,
        sale_id: this.ruleForm2.region
      }).then(res => {
        this.getData();
        this.$notify({
          title: '修改成功',
          message: '这是一条修改成功的提示消息！',
          type: 'success',
          offset: 60
        });
        this.dialogFormVisible4 = false;
      });
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
img {
  width: 80px;
  height: 40px;
}
</style>
