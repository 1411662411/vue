<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <!-- 订单切换 -->
        <div class="buttons">
          <el-button @click="getSpike('')" :class="{'btnColor':btns == ''}">全部活动(<span :class="{'btnColor':btns == '','btn-red': btns != ''}">{{ this.$data.states.zero }}</span>)</el-button>
          <el-button @click="getSpike(1)" :class="{'btnColor':btns == 1}">未开始(<span :class="{'btnColor':btns == 1,'btn-red': btns != 1}">{{ this.$data.states.one }}</span>)</el-button>
          <el-button @click="getSpike(2)" :class="{'btnColor':btns == 2}">进行中(<span :class="{'btnColor':btns == 2,'btn-red': btns != 2}">{{ this.$data.states.two }}</span>)</el-button>
          <el-button @click="getSpike(3)" :class="{'btnColor':btns == 3}">已结束(<span :class="{'btnColor':btns == 3,'btn-red': btns != 3}">{{ this.$data.states.three }}</span>)</el-button>
        </div>
        <!-- 下架、删除 -->
        <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;background-color: rgba(243, 243, 243, 1);text-align:left;">
          <!-- <el-button size="small" icon="el-icon-download" style="margin-left:20px;" @click="multipleDown">下架</el-button> -->
          <el-button size="small" icon="el-icon-delete" @click="multipleDel" style="margin-left:15px;">删除</el-button>
          <el-button 
            type="primary" 
            icon="el-icon-plus" 
            @click="addSpikes"
            style="float:right;margin:10px 20px 9px 0;padding:7px 10px;border-radius:0;">
            添加活动
          </el-button>
        </div>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          @select="yy"
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="56">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            align="center"
            width="94">
          </el-table-column>
          <el-table-column
            prop="statuss"
            label="活动状态"
            align="center"
            width="102">
          </el-table-column>
          <el-table-column
            prop="start_at"
            label="每日开始时间"
            align="center"
            width="266">
          </el-table-column>
          <el-table-column
            prop="end_at"
            label="每日结束时间"
            align="center"
            width="284">
          </el-table-column>
          <el-table-column
            prop="upDown"
            label="上下线"
            align="center"
            width="86">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="font-size: 12px;padding:0 12px;color: rgb(0, 102, 255);"
                @click.prevent="downSpikes(scope.$index, tableData,scope.row)">
                {{ scope.row.upDown }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            width="210"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click.prevent="editSpikes(scope.$index, tableData,scope.row.id)">
                编辑
              </a>
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click.prevent="delSpikes(scope.$index, tableData,scope.row.id)">
                删除
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加活动弹出框 -->
      <el-dialog title="提示" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm1"  ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="每日开始时间" required>
            <el-form-item prop="start_at">
              <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="ruleForm1.start_at" style="width: 70%;"></el-time-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="每日结束时间" required>
            <el-form-item prop="end_at">
              <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="ruleForm1.end_at" style="width: 70%;"></el-time-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="上线/下线:" prop="status">
            <el-radio-group v-model="ruleForm1.status">
              <el-radio label="上线"></el-radio>
              <el-radio label="下线"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="sureAdd"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑活动弹出框 -->
      <el-dialog title="提示" :visible.sync="dialogFormVisible5">
        <el-form :model="ruleForm"  ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="每日开始时间" required>
            <el-form-item prop="start_at">
              <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="ruleForm.start_at" style="width: 70%;"></el-time-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="每日结束时间" required>
            <el-form-item prop="end_at">
              <el-time-picker type="fixed-time" value-format="HH:mm" format="HH:mm" placeholder="选择时间" v-model="ruleForm.end_at" style="width: 70%;"></el-time-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="上线/下线:" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="上线"></el-radio>
              <el-radio label="下线"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible5 = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="sureEdit"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 上下线弹出框 -->
      <el-dialog title="提示" :visible.sync="dialogFormVisible3">
        <span>{{this.$data.toggleLine}}</span>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible3 = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="sureDown"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 多个上下线弹出框 -->
      <el-dialog title="提示" :visible.sync="dialogFormVisible7">
        <span>确定下架该商品吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible7 = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="sureMultipleDown"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 删除弹出框 -->
      <el-dialog title="提示" :visible.sync="dialogFormVisible4">
        <span>确定删除商品吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible4 = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="sureDel"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 删除多个弹出框 -->
      <el-dialog title="提示" :visible.sync="dialogFormVisible6">
        <span>确定删除吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button 
            @click="dialogFormVisible6 = false"
            style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
            取 消
          </el-button>
          <el-button type="success"
          @click="sureMultipleDel"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  spike,
  addSpike,
  delSpike,
  editSpike,
  downSpike
} from "../../api/marketings/Marketing.js";
import Base from "../../common/Base.js";
export default {
  mixins: [Base],
  data() {
    return {
      PageName: "限时抢购列表",
      dialogFormVisible: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
      dialogFormVisible7: false,
      tableData: [],
      toggleLine: "",
      index: null,
      id: "",
      status: "",
      arrId: [],
      total: 10,
      ruleForm: {
        status: "",
        start_at: "",
        end_at: ""
      },
      ruleForm1: {
        status: "",
        start_at: "",
        end_at: ""
      },
      states: {
        zero: 0,
        one: 0,
        two: 0,
        three: 0
      },
      iStatus: null,
      btns: ''
    };
  },
  computed: {
    ...mapGetters(["marketingsindex", "token"])
  },
  methods: {
    ...mapActions(["checkMarketingsIndex", "checkToken"]),
    changeTime(val) {
      return new Date(parseInt(val) * 1000)
        .toLocaleString()
        .replace(/:\d{1,2}$/, " ");
    },
    doubleTime(time) {
      if (time < 10) {
        time = "0" + time;
      } else {
        time = time;
      }
      return time;
    },
    //获取列表
    getSpike(iStatus) {
      this.iStatus = iStatus;
      this.btns = iStatus;
      var arr = [];
      this.$store.dispatch('checkToken',localStorage.getItem('data'))
      spike({ params: { token: this.$store.state.token } })
        .then(res => {
          arr = res.data.spike;
          console.log(arr,new Date().getHours())
          this.$data.states.zero = arr.length;
          var currentHours = new Date().getHours();
          var currentMinutes = new Date().getMinutes();
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].start_at.substring(0, 2) > currentHours) {
              arr[i].statuss = "未开始";
            } else if (
              arr[i].start_at.substring(0, 2) == this.doubleTime(currentHours)
            ) {
              if (
                arr[i].start_at.substring(0, 2) ==
                  this.doubleTime(currentHours) &&
                arr[i].start_at.substring(3, 5) > currentMinutes
              ) {
                arr[i].statuss = "未开始";
              } else if (
                arr[i].start_at.substring(0, 2) ==
                  this.doubleTime(currentHours) &&
                arr[i].start_at.substring(3, 5) <= currentMinutes
              ) {
                arr[i].statuss = "进行中";
              }
            } else if (
              arr[i].start_at.substring(0, 2) < currentHours &&
              currentHours <= arr[i].end_at.substring(0, 2)
            ) {
              if (
                arr[i].end_at.substring(0, 2) ==
                  this.doubleTime(currentHours) &&
                arr[i].end_at.substring(3, 5) >= currentMinutes
              ) {
                arr[i].statuss = "进行中";
              } else if(currentHours < arr[i].end_at.substring(0, 2)) {
                arr[i].statuss = "进行中";
              }else {
                arr[i].statuss = "已结束";
              }
            } else if (currentHours > arr[i].end_at.substring(0, 2)) {
              arr[i].statuss = "已结束";
            }

            if (arr[i].status == 1) {
              arr[i].upDown = "下线";
            } else {
              arr[i].upDown = "上线";
            }
          }

          this.$data.tableData = arr;
          var arring = [],
            arr1 = [],
            arred = [];
          for (var i = 0; i < this.$data.tableData.length; i++) {
            if (this.$data.tableData[i].statuss == "进行中") {
              arring.push(this.$data.tableData[i]);
            } else if (this.$data.tableData[i].statuss == "未开始") {
              arr1.push(this.$data.tableData[i]);
            } else if (this.$data.tableData[i].statuss == "已结束") {
              arred.push(this.$data.tableData[i]);
            }
          }

          if (iStatus) {
            if (iStatus == 1) {
              this.$data.tableData = arr1;
            } else if (iStatus == 2) {
              this.$data.tableData = arring;
            } else if (iStatus == 3) {
              this.$data.tableData = arred;
            }
          }
          if (!iStatus) {
            this.$data.tableData = arr;
          }
          this.$data.states.one = arr1.length;
          this.$data.states.two = arring.length;
          this.$data.states.three = arred.length;
          this.$data.total = arr.length;
        })
        .catch(err => {
          console.log(err);
        });
      return arr;
    },
    //添加秒杀
    addSpikes() {
      this.$data.dialogFormVisible = true;
    },
    sureAdd() {
      if(this.$data.ruleForm1.end_at!='' && this.$data.ruleForm1.start_at!='' && this.$data.ruleForm1.status!=''){
        if (this.$data.ruleForm1.status == "上线") {
          this.$data.ruleForm1.status = "1";
        } else {
          this.$data.ruleForm1.status = "2";
        }
        this.$store.dispatch('checkToken',localStorage.getItem('data'))
        addSpike({
          token: this.$store.state.token,
          status: this.$data.ruleForm1.status,
          start_at: this.$data.ruleForm1.start_at,
          end_at: this.$data.ruleForm1.end_at
        })
        .then(res => {
          // console.log(res,'---');
        })
        .then(res => {
          this.getSpike();
          this.$data.ruleForm1.status = "";
          this.$data.ruleForm1.start_at = "";
          this.$data.ruleForm1.end_at = "";
          this.$data.dialogFormVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        this.$notify({
          title: '警告',
          message: '输入不符合规范的！',
          type: 'warning',
          offset: 60
        });
      }
    },
    //删除
    delSpikes(index, rows, id) {
      this.$data.index = index;
      this.$data.id = id;
      this.$data.dialogFormVisible4 = true;
    },
    sureDel() {
      this.$store.dispatch('checkToken',localStorage.getItem('data'))
      delSpike({ token: this.$store.state.token, id: this.$data.id })
        .then(res => {
          this.$data.tableData.splice(this.$data.index, 1);
          this.$data.dialogFormVisible4 = false;
        })
        .then(res => {
          this.getSpike();
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除多个
    multipleDel() {
      this.$data.dialogFormVisible6 = true;
    },
    sureMultipleDel() {
      for (var i = 0; i < this.$data.arrId.length; i++) {
        delSpike({ token: this.$store.state.token, id: this.$data.arrId[i].id })
          .then(res => {
            // console.log(res)
          })
          .then(res => {
            this.getSpike();
            this.$data.dialogFormVisible6 = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    yy(selection, row) {
      //多选表格
      if (selection[0]) {
        this.$data.id = selection[0].id;
        for (var i = 0; i < selection.length; i++) {
          this.$data.arrId[i] = selection[i];
        }
      }
    },
    //编辑
    editSpikes(index, rows, id) {
      this.$data.id = id;
      this.$data.dialogFormVisible5 = true;
      spike({ params: { token: this.$store.state.token } })
        .then(res => {
          var arr = res.data.spike;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
              if (arr[i].status == "1") {
                arr[i].status = "上线";
              } else {
                arr[i].status = "下线";
              }
              this.$data.ruleForm.status = arr[i].status;
              this.$data.ruleForm.start_at = arr[i].start_at;
              this.$data.ruleForm.end_at = arr[i].end_at;
            }
          }
          // this.$data.tableData = arr;
          // console.log(res,'---');
        })
        .catch(err => {
          console.log(err);
        });
    },
    sureEdit() {
      if (this.$data.ruleForm.status == "上线") {
        this.$data.ruleForm.status = "1";
      } else {
        this.$data.ruleForm.status = "2";
      }
      editSpike({
        token: this.$store.state.token,
        id: this.$data.id,
        status: this.$data.ruleForm.status,
        start_at: this.$data.ruleForm.start_at,
        end_at: this.$data.ruleForm.end_at
      })
        .then(res => {
          // console.log(res,'---');
        })
        .then(res => {
          this.getSpike();
          this.$data.dialogFormVisible5 = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上下线
    downSpikes(index, rows, id) {
      this.$data.id = id.id;
      this.$data.dialogFormVisible3 = true;
      if (id.status == "1") {
        this.$data.toggleLine = "确定下线该活动吗？";
      } else {
        this.$data.toggleLine = "确定上线该活动吗？";
      }
    },
    sureDown() {
      downSpike({ token: this.$store.state.token, id: this.$data.id })
        .then(res => {
          // console.log(res,'---');
        })
        .then(res => {
          this.getSpike();
          this.$data.dialogFormVisible3 = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //多个上下线
    multipleDown() {
      this.$data.dialogFormVisible7 = true;
    },
    sureMultipleDown() {
      downSpike({ token: this.$store.state.token, id: this.$data.id })
        .then(res => {
          // console.log(res,'---');
        })
        .then(res => {
          this.getSpike();
          this.$data.dialogFormVisible7 = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    Dingbu
  },
  beforeCreate() {
    this.$store.dispatch("checkMarketingsIndex", "/marketing/limitlist");
  },
  created() {
    this.getSpike('');
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
