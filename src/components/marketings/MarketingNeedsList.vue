<template>
  <div>
      <Dingbu :nameTitle='PageName'></Dingbu>
      <div class="w">
        <!-- 下架、删除 -->
        <div style="1100px;height:50px;line-height:50px;border:1px solid rgba(228, 228, 228, 1);border-bottom:0;background-color: rgba(243, 243, 243, 1);text-align:left;margin-top:20px;">
          <el-button size="small" icon="el-icon-download" style="margin-left:20px;" @click="multipleDown">下线</el-button>
          <el-button size="small" icon="el-icon-delete" @click="multipleDel">删除</el-button>
          <el-button 
            type="primary" 
            icon="el-icon-plus" 
            @click="addComposeryy"
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
            width="42">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            align="center"
            width="187">
          </el-table-column>
          <el-table-column
            prop="name"
            label="套餐名称"
            align="center"
            width="153">
          </el-table-column>
          <el-table-column 
            prop="cover" 
            label="套餐图片" 
            width="173">
            <template slot-scope="scope">
              <img :src="scope.row.cover"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="普通用户套餐价格"
            align="center"
            width="125">
          </el-table-column>
          <el-table-column
            prop="agent_price"
            label="代理商套餐价格"
            align="center"
            width="133">
          </el-table-column>
          <el-table-column
            label="上下线"
            align="center"
            width="162">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click="downComposers(scope.$index, tableData,scope.row)">
                {{ scope.row.upDown }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            width="123"
            label="操作"
            align="center">
            <template slot-scope="scope">
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click="editComposers(scope.$index, tableData,scope.row.id)">
                编辑
              </a>
              <a 
                href="javascript:;" 
                style="color: rgb(0, 102, 255);font-size: 12px;padding:0 12px;"
                @click="delComposers(scope.$index, tableData,scope.row.id)">
                删除
              </a>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加活动弹出框 -->
      <el-dialog title="添加套餐" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm1" ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="套餐名称:" prop="name">
            <el-input v-model="ruleForm1.name" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="普通用户套餐价格:" prop="price">
            <el-input v-model="ruleForm1.price" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="代理商套餐价格:" prop="agent_price">
            <el-input v-model="ruleForm1.agent_price" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="套餐图片:" prop="cover">
            <el-upload action="https://api.jiuwanjia.com/api/user/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
              :file-list="fileList" :on-success="files" :limit="1">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="ruleForm1.cover" />
            </el-dialog>
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
          @click="addComposers"
          style="width:80px;height:35px;line-height:31px;text-align:center;padding:0;">
          确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑活动弹出框 -->
      <el-dialog title="编辑套餐" :visible.sync="dialogFormVisible2">
        <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="套餐名称:" prop="name">
            <el-input v-model="ruleForm.name" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="普通用户套餐价格:" prop="price">
            <el-input v-model="ruleForm.price" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="代理商套餐价格:" prop="agent_price">
            <el-input v-model="ruleForm.agent_price" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="套餐图片:" prop="cover">
            <el-upload action="https://api.jiuwanjia.com/api/user/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" 
              :file-list="fileList" :on-success="files" :limit="1">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="ruleForm.cover" />
            </el-dialog>
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
            @click="cancel"
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
    <!-- 删除多个弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible6">
      <span>确定删除该商品吗？</span>
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
  composer,
  addComposer,
  delComposer,
  editComposer,
  downComposer
} from "../../api/marketings/Marketing.js";
export default {
  data() {
    return {
      PageName: "优惠套餐列表",
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible5: false,
      dialogFormVisible6: false,
      toggleLine: "",
      tableData: [],
      fileList: [],
      dialogImageUrl: "",
      id: "",
      arrId: [],
      total: 10,
      ruleForm: {
        name: "",
        price: "",
        agent_price: "",
        cover: "",
        status: ""
      },
      ruleForm1: {
        name: "",
        price: "",
        agent_price: "",
        cover: "",
        status: ""
      }
    };
  },
  computed: {
    ...mapGetters(["marketingsindex", "token"])
  },
  methods: {
    ...mapActions(["checkMarketingsIndex", "checkToken"]),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggleStatus() {
      //转化状态
      if (this.$data.ruleForm1.status == "上线") {
        this.$data.ruleForm1.status = "1";
      }
      if (this.$data.ruleForm1.status == "下线") {
        this.$data.ruleForm1.status = "2";
      }
    },
    //移除照片
    handleRemove(file, fileList) {
      this.ruleForm1.cover = "";
      this.ruleForm.cover = "";
      this.fileList[0].url = "";
      // console.log(file, fileList);
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    files(res) {
      this.dialogImageUrl = res.data.url;
      this.ruleForm1.cover = res.data.url;
      this.ruleForm.cover = res.data.url;
    },
    //获取列表
    getData() {
      var arr = [];
      this.$store.dispatch('checkToken',localStorage.getItem('data'))
      composer({ params: { token: this.$store.state.token } })
        .then(res => {
          arr = res.data.composers;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].status == 1) {
              arr[i].upDown = "下线";
            } else {
              arr[i].upDown = "上线";
            }
          }
          this.$data.tableData = arr;
          this.$data.total = arr.length;
        })
        .catch(err => {
          console.log(err);
        });
      return arr;
    },
    //添加套餐
    addComposeryy() {
      this.$data.ruleForm1.cover = "";
      this.$data.ruleForm1.name = "";
      this.$data.ruleForm1.price = "";
      this.$data.ruleForm1.agent_price = "";
      this.$data.fileList = [];
      this.$data.dialogFormVisible = true;
    },
    addComposers() {
      this.toggleStatus();
      if(this.$data.ruleForm1.cover!='' && this.$data.ruleForm1.name!='' && this.$data.ruleForm1.price!='' && this.$data.ruleForm1.agent_price!='') {
        addComposer({
          token: this.$store.state.token,
          name: this.$data.ruleForm1.name,
          price: this.$data.ruleForm1.price,
          agent_price: this.$data.ruleForm1.agent_price,
          cover: this.$data.ruleForm1.cover,
          status: this.$data.ruleForm1.status
        })
        .then(res => {
          console.log(res);
        })
        .then(res => {
          this.$notify({
            title: '添加成功',
            message: '这是一条添加成功的提示消息！',
            type: 'success',
            offset: 60
          });
          this.getData();
          this.dialogFormVisible = false;
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
      this.$data.ruleForm1.cover = "";
      this.$data.ruleForm1.name = "";
      this.$data.ruleForm1.price = "";
      this.$data.ruleForm1.agent_price = "";
      this.$data.fileList = [];
    },
    //删除套餐
    delComposers(index, rows, id) {
      delComposer({ token: this.$store.state.token, id: id })
        .then(res => {
          rows.splice(index, 1);
          this.$notify({
            title: '删除成功',
            message: '这是一条删除成功的提示消息！',
            type: 'success',
            offset: 60
          });
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
        delComposer({
          token: this.$store.state.token,
          id: this.$data.arrId[i].id
        })
          .then(res => {
            // console.log(res)
          })
          .then(res => {
            this.getData();
            this.$notify({
              title: '删除成功',
              message: '这是一条删除成功的提示消息！',
              type: 'success',
              offset: 60
            });
            this.$data.dialogFormVisible6 = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    yy(selection, row) {
      //多选表格
      this.$data.id = selection[0].id;
      for (var i = 0; i < selection.length; i++) {
        this.$data.arrId[i] = selection[i];
      }
    },
    //编辑套餐
    editComposers(index, rows, id) {
      this.$data.id = id;
      this.dialogFormVisible2 = true;
      composer({ params: { token: this.$store.state.token } })
        .then(res => {
          var arr = res.data.composers;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
              if (arr[i].status == "1") {
                arr[i].status = "上线";
              } else {
                arr[i].status = "下线";
              }
              this.$data.ruleForm.name = arr[i].name;
              this.$data.ruleForm.price = arr[i].price;
              this.$data.ruleForm.agent_price = arr[i].agent_price;
              this.$data.fileList = [];
              this.fileList = [];
              this.fileList.push({ url: arr[i].cover });
              this.$data.ruleForm.cover = arr[i].cover;
              this.$data.ruleForm.status = arr[i].status;
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
      this.toggleStatus();
      if (this.$data.ruleForm.status == "上线") {
        this.$data.ruleForm.status = "1";
      } else {
        this.$data.ruleForm.status = "2";
      }
      console.log(this.$data.ruleForm1.cover);
      editComposer({
        token: this.$store.state.token,
        id: this.$data.id,
        name: this.$data.ruleForm.name,
        price: this.$data.ruleForm.price,
        agent_price: this.$data.ruleForm.agent_price,
        cover: this.$data.ruleForm.cover,
        status: this.$data.ruleForm.status
      })
        .then(res => {
          console.log(res);
        })
        .then(res => {
          this.getData();
          this.$notify({
            title: '修改成功',
            message: '这是一条修改成功的提示消息！',
            type: 'success',
            offset: 60
          });
          this.$data.fileList = [];
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible2 = false;
    },
    //取消操作
    cancel() {
      this.$data.fileList = [];
      this.$data.dialogFormVisible2 = false;
    },
    //上下线套餐
    downComposers(index, rows, id) {
      this.$data.id = id;
      this.dialogFormVisible3 = true;
      if (id.status == "1") {
        this.$data.toggleLine = "确定下线该套餐吗？";
      } else {
        this.$data.toggleLine = "确定上线该套餐吗？";
      }
    },
    sureDown() {
      downComposer({ token: this.$store.state.token, id: this.$data.id.id })
        .then(res => {
          console.log(res,'---');
          this.getData();
          this.$notify({
            title: '修改成功',
            message: '这是一条修改成功的提示消息！',
            type: 'success',
            offset: 60
          });
          this.$data.dialogFormVisible3 = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //多个上下线
    multipleDown() {
      var arr = this.$data.arrId;
      for (var i = 0; i < arr.length; i++) {
        downComposer({ token: this.$store.state.token, id: arr[i].id })
          .then(res => {
            // console.log(res,'---');
          })
          .then(res => {
            this.$notify({
              title: '修改成功',
              message: '这是一条修改成功的提示消息！',
              type: 'success',
              offset: 60
            });
            this.getData();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  components: {
    Dingbu
  },
  beforeCreate() {
    this.$store.dispatch("checkMarketingsIndex", "/marketing/needslist");
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.el-table__row img {
  width: 150px;
  height: 50px;
}
</style>
