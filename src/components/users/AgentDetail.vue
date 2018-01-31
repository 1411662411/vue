<template>
    <div>
        <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
        <div class="w">
            <!-- 代理商申请信息 -->
            <div class="shenqing">
                <div class="u4257">
                    <img src="../../images/tag.png" style="width:11px;height:18px;position:relative;top:3px;margin-right:5px;"/>代理商申请信息
                </div>
                <p class="shuzhibiaoge">
                    <span class="left">用户ID</span>
                    <span class="right">
                        {{ shenqing.id }}
                        <!-- <a href="javascript:;" @click="lookUserDetail">查看用户详情</a> -->
                    </span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">用户头像</span>
                    <span class="right">
                        <img :src="shenqing.avatar" @click="loadImg(shenqing.avatar)">
                    </span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">用户昵称</span>
                    <span class="right">{{ shenqing.nick_name }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">所属业务员</span>
                    <span class="right">
                        {{ shenqing.sale_man }}
                        <a href="javascript:;" @click="manager">管理</a>
                    </span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">代理商姓名</span>
                    <span class="right">{{ shenqing.real_name }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">代理商电话</span>
                    <span class="right">{{ shenqing.phone }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">代理商地址</span>
                    <span class="right">{{ shenqing.address }}</span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">代理商营业执照</span>
                    <span class="right">
                        <img :src="shenqing.license" @click="loadImg(shenqing.license)">
                    </span>
                </p>
                <p class="shuzhibiaoge te">
                    <span class="left">代理商身份证正反面</span>
                    <span class="right">
                        <img :src="shenqing.positive" @click="loadImg(shenqing.positive)">
                        <img :src="shenqing.negative" @click="loadImg(shenqing.negative)">
                    </span>
                </p>
            </div>
            
            <div v-if="apply!='2'">
            </div>
            
            <div v-else>
                <div style="line-height:200px;text-align:center;" >
                    <el-button type="success" @click="sureApply">同意申请</el-button>
                    <el-button type="warning" @click="refuseApply">拒绝申请</el-button>
                </div>
            </div>
        </div>

        <el-dialog title="用户管理" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="所属业务员" :label-width="formLabelWidth">
                    <el-select v-model="form.region" :placeholder="placeholder" style="width:70%;" value-key="saleMan">
                        <el-option v-for="(saleman,index) in saleMan" :label="saleman.name" :value="saleman.id" :key="saleman.id"></el-option>
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
import { mapGetters,mapActions } from "vuex";
import { userDetail } from "../../api/users/User.js";
import Base from "../../common/Base.js";
import {
  agentDetail,
  agreeAgent,
  refuseAgent,
  saleChange,
  saleList
} from "../../api/users/User.js";
export default {
  mixins: [Base],
  data() {
    return {
      PageName: "代理商申请详情-已同意",
      BackName: "返回",
      RefreshName: "刷新",
      shenqing: {
        id: "",
        avatar: "",
        nick_name: "",
        sale_man: "",
        real_name: "",
        phone: "",
        address: "",
        license: "",
        negative: "",
        positive: ""
      },
      tableData2: [],
      total: null,
      currentPage: 1,
      apply: 1,
      dialogFormVisible: false,
      form: {
        region: ""
      },
      formLabelWidth: "160px",
      saleMan: [],
      placeholder: ''
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkToken", "checkUsersIndex"]),
    lookUserDetail() {
      // this.$router.push({ name: "userdetail", params: { id: this.shenqing.id } });
    },
    getData() {
      this.$store.dispatch('checkToken',localStorage.getItem('data'))
      var reg = /['上午'|'下午']/g;
      agentDetail({
        params: { token: this.$store.state.token, id: this.$route.params.id }
      }).then(res => {
        var obj = res.data;
        for (var i in obj) {
          this.shenqing[i] = obj[i];
        }
        this.apply = res.data.apply;
        if (this.apply == 2) {
          this.PageName = "代理商申请详情-待处理";
        } else if (this.apply == 4) {
          this.PageName = "代理商申请详情-已同意";
        } else if (this.apply == 3) {
          this.PageName = "代理商申请详情-已拒绝";
        }
        console.log(res);
      });
    },
    sureApply() {
      agreeAgent({
        token: this.$store.state.token,
        id: this.$route.params.id
      }).then(res => {
        console.log(res);
        this.$router.push({name:'agentlist', path: '/user/agentlist'})
      });
    },
    refuseApply() {
      refuseAgent({
        token: this.$store.state.token,
        id: this.$route.params.id
      }).then(res => {
        console.log(res);
      });
    },
    manager() {
      this.dialogFormVisible = true;
      saleList({params: { token: this.$store.state.token }}).then(res => {
        this.saleMan = res.data.sale_list;
        this.placeholder = this.shenqing.sale_man;
        // console.log(this.saleMan,this.shenqing.sale_man)
      });
    },
    sure() {
      if(this.form.region!=''){
        saleChange({
          token: this.$store.state.token,
          id: this.shenqing.id,
          sale_id: this.form.region
        }).then(res => {
          this.getData();
          this.dialogFormVisible = false;
        });
      } else {
        this.$notify({
          title: '警告',
          message: '未修改，请修改！',
          type: 'warning',
          offset: 60
        });
      }
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
.shenqing {
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 20px;
  margin-top: 20px;
}
.u4257 {
  font-size: 16px;
  color: #666;
  font-family: "微软雅黑";
  margin-bottom: 20px;
}
img {
  width: 80px;
  height: 40px;
  margin: 5px;
}
</style>
