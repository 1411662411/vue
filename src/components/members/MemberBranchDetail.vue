<template>
    <div>
        <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
        <div class="w">
            <!-- 表格 -->
            <el-table
                :data="tableData"
                border
                style="width: 100%;margin-top:20px;">
                <el-table-column
                    prop="id"
                    label="序号"
                    align="center"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="业务员账号"
                    align="center"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="业务员姓名"
                    align="center"
                    width="219">
                </el-table-column>
                <el-table-column
                    prop="manager_name"
                    label="所属项目经理"
                    align="center"
                    width="219">
                </el-table-column>
                <el-table-column
                    prop="created_at"
                    label="添加时间"
                    align="center"
                    width="220">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { managerDetail } from "../../api/members/Member.js";
import Base from "../../common/Base.js";
export default {
  mixins: [Base],
  data() {
    return {
      PageName: "成员下属详情",
      BackName: "返回",
      RefreshName: "刷新",
      input4: "",
      tableData: []
    };
  },
  computed : {
      ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['checkToken']),
    getData() {
      var reg = /['上午'|'下午']/g;
      this.$store.dispatch('checkToken',localStorage.getItem('data'))
      managerDetail({
        params: { token: this.$store.state.token, id: this.$route.params.ids }
      }).then(res => {
        var arr = res.data.sale_list;
        for (var i = 0; i < arr.length; i++) {
          arr[i].created_at = this.changeTime(arr[i].created_at).replace(
            reg,
            " "
          );
        }
        this.tableData = arr;
        console.log(res);
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
.u5097_div {
  height: 50px;
  background: inherit;
  background-color: inherit;
  background-color: rgba(253, 253, 254, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(228, 228, 228, 1);
  margin-top: 15px;
}
</style>
