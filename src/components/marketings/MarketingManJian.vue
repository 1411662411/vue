<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <div id="u890_div">
          <el-button 
            type="primary" 
            icon="el-icon-plus" 
            @click="add"
            style="float:right;margin:9px 20px 9px 0;padding:7px 10px;border-radius:0;">
            添加活动
          </el-button>
        </div>
        <div class="main" style="margin-top:-1px;">
          <p style="font-size: 12px;color: #999999;margin-bottom:10px;">
            <b style="font-size: 16px;font-family: 'Arial Negreta', 'Arial Normal', 'Arial';position:relative;top:1px;color: #666666;">
              活动内容：
            </b>该活动适用于单笔订单
          </p>
          <!-- 表格 -->
          <el-table
            :data="tableData"
            border
            style="width: 100%;margin-top:-1px;">
            <el-table-column
              prop="id"
              label="序号"
              align="center"
              width="85">
            </el-table-column>
            <el-table-column
              prop="type"
              label="客户类型"
              align="center"
              width="221">
            </el-table-column>
            <el-table-column
              prop="price"
              label="满"
              align="center"
              width="230">
            </el-table-column>
            <el-table-column
              prop="cut"
              label="减"
              align="center"
              width="280">
            </el-table-column>
            <el-table-column
              width="240"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <a 
                  href="javascript:;" 
                  style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                  @click.prevent="editRow(scope.$index, tableData,scope.row.id)">
                  编辑
                </a>
                <a 
                  href="javascript:;" 
                  style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                  @click.prevent="deleteRow(scope.$index, tableData,scope.row.id)"
                  >
                  删除
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    <!-- 添加 -->
    <el-dialog title="添加活动" :visible.sync="dialogFormVisible3">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="客户类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="普通用户" style="width:350px;">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="代理商" value="代理商"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满" prop="price">
          <el-input v-model="ruleForm.price" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="减" prop="cut">
          <el-input v-model="ruleForm.cut" style="width:350px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button 
          @click="dialogFormVisible3 = false"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          取 消
        </el-button>
        <el-button type="success"
         @click="addActivity"
         style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
         确 定
         </el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑活动" :visible.sync="dialogFormVisible2">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="客户类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="普通用户" style="width:350px;">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="代理商" value="代理商"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满" prop="price">
          <el-input v-model="ruleForm.price" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="减" prop="cut">
          <el-input v-model="ruleForm.cut" style="width:350px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button 
          @click="dialogFormVisible2 = false"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          取 消
        </el-button>
        <el-button type="success"
         @click="editActivity"
         style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
         确 定
         </el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible4">
      <span>确定删除该订单吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button 
          @click="dialogFormVisible4 = false"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          取 消
        </el-button>
        <el-button type="success"
         @click="dialogFormVisible4 = true"
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
  addFull,
  fullList,
  delList,
  editFull
} from "../../api/marketings/Marketing.js";
export default {
  data() {
    return {
      PageName: "满额立减",
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      tableData: [],
      id: "",
      ruleForm: {
        price: "",
        cut: "",
        type: ""
      }
    };
  },
  computed: {
    ...mapGetters(["marketingsindex", "token"])
  },
  methods: {
    ...mapActions(["checkMarketingsIndex", "checkToken"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取列表
    full() {
      var arr = [];
      this.$store.dispatch('checkToken',localStorage.getItem('data'))
      fullList({ params: { token: this.$store.state.token } })
        .then(res => {
          arr = res.data.full_list;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].type == 1) {
              arr[i].type = "普通用户";
            } else {
              arr[i].type = "代理商";
            }
          }
          this.$data.tableData = arr;
          // console.log(res,'---');
        })
        .catch(err => {
          console.log(err);
        });
      return arr;
    },
    //添加
    add() {
      this.$data.ruleForm.type = "";
      this.$data.ruleForm.cut = "";
      this.$data.ruleForm.price = "";
      this.$data.dialogFormVisible3 = true;
    },
    addActivity() {
      var that = this;
      if (that.$data.ruleForm.type == "普通用户") {
        that.$data.ruleForm.type = "1";
      }
      if (that.$data.ruleForm.type == "代理商") {
        that.$data.ruleForm.type = "2";
      }
      if (Number(that.$data.ruleForm.cut) < Number(that.$data.ruleForm.price)) {
        addFull({
          token: this.$store.state.token,
          cut: Number(that.$data.ruleForm.cut),
          price: Number(that.$data.ruleForm.price),
          type: that.$data.ruleForm.type
        })
          .then(res => {
            // console.log(res,'---');
          })
          .then(res => {
            this.full();
          })
          .catch(err => {
            console.log(err);
          });
        that.$data.ruleForm.type = "";
        that.$data.ruleForm.cut = "";
        that.$data.ruleForm.price = "";
        that.$data.dialogFormVisible3 = false;
      } else {
        this.$notify({
          title: '警告',
          message: '请输入符合规范的金额！',
          type: 'warning',
          offset: 60
        });
      }
    },
    //删除
    deleteRow(index, rows, id) {
      delList({ token: this.$store.state.token, id: id })
        .then(res => {
          rows.splice(index, 1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //编辑
    editRow(index, rows, id) {
      this.dialogFormVisible2 = true;
      this.$data.id = id;
      fullList({ params: { token: this.$store.state.token } })
        .then(res => {
          var arr = res.data.full_list;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
              if (arr[i].type == "1") {
                arr[i].type = "普通用户";
              } else {
                arr[i].type = "代理商";
              }
              this.$data.ruleForm.type = arr[i].type;
              this.$data.ruleForm.price = arr[i].price;
              this.$data.ruleForm.cut = arr[i].cut;
            }
          }
          // this.$data.tableData = arr;
          // console.log(res,'---');
        })
        .catch(err => {
          console.log(err);
        });
    },
    editActivity() {
      if (this.$data.ruleForm.type == "普通用户") {
        this.$data.ruleForm.type = "1";
      }
      if (this.$data.ruleForm.type == "代理商") {
        this.$data.ruleForm.type = "2";
      }
      editFull({
        token: this.$store.state.token,
        id: this.$data.id,
        cut: Number(this.$data.ruleForm.cut),
        price: Number(this.$data.ruleForm.price),
        type: this.$data.ruleForm.type
      })
        .then(res => {
          console.log(res);
        })
        .then(res => {
          this.full();
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible2 = false;
    }
  },
  components: {
    Dingbu
  },
  beforeCreate() {
    this.$store.dispatch("checkMarketingsIndex", "/marketing/manjian");
  },
  created() {
    this.full();
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
#u890_div {
  width: 1100px;
  height: 50px;
  background-color: rgba(243, 243, 243, 1);
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  margin-top: 20px;
}
.main {
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 10px 20px;
  min-height: 630px;
}
</style>
