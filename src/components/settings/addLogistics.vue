<template>
  <div>
    <Dingbu :nameTitle='PageName'></Dingbu>
    <div class="w">
      <div class="main">
        <el-form :model="numberValidateForm" :rules="rules2" ref="numberValidateForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="物流公司名称" prop="name" :rules="[{ required: true, message: '物流公司名称不能为空'}]">
            <el-input type="name" v-model="numberValidateForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="费用计算">
            <el-button type="primary" icon="el-icon-plus" @click="addNoLogPrice">新增</el-button>
            <ul>
              <li v-for="item in numberValidateForm.no_free" :key="item.value">
                <select v-model="item.province_id" placeholder="请选择" class="myselect">
                  <option v-for="items in provinces" :key="items.id" :value="items.id" class="myoption">{{items.name}}
                  </option>
                </select>
                <!-- <el-select v-model="item.province_id" placeholder="请选择">
                  <el-option v-for="items in provinces" :key="items.id" :label="items.name" :value="items.id">
                  </el-option>
                </el-select> -->
                <el-input v-model.number="item.price" placeholder="请输入金额"></el-input>  
                <el-button class="delList" @click="del(index)" type="danger">删除</el-button>
              </li>
            </ul>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import {mapGetters, mapMutations, mapActions} from 'vuex';
import {
  logisticsDetail,
  getProvince,
  editLogistics,
  addLogistics
} from "../../api/settings/Setting.js";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('运费不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 1) {
            callback(new Error('必须满1元'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      PageName: "物流公司",
      
      numberValidateForm: {
        no_free:[],
        price: '',
      },
      provinces: [],
      newList: {
        price: "",
        province_id: ""
      },
      rules2: {
        price: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
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
    ...mapActions(['checkToken','checkSettingsIndex']),
    getData(id) {
      var that = this;
      logisticsDetail({ params: { token: this.thisToken, id: id } })
        .then(res => {
          this.numberValidateForm = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProvice(){
      getProvince({ params: { token: this.thisToken } })
        .then(res => {
          this.provinces = res.data.provinces;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      // if (!Number.isInteger(this.numberValidateForm)) {
      //   callback(new Error('请输入数字值'));
      // }
      // console.log(isNaN(this.numberValidateForm.price));
      if(this.numberValidateForm.no_free.length==0){
        this.$alert("请选择地区！", "提示", {
            confirmButtonText: "确定"
          });
          return;
      }
      for (let i = 0; i < this.numberValidateForm.no_free.length; i++) {
        if (this.numberValidateForm.no_free[i].province_id == "") {
          this.$alert("请选择地区！", "提示", {
            confirmButtonText: "确定"
          });
          return;
        }
        if (this.numberValidateForm.no_free[i].price == "") {
          this.$alert("请填写价格！", "提示", {
            confirmButtonText: "确定"
          });
          return;
        }
      }
      if (this.$route.params.logId != -1) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.numberValidateForm.token = this.thisToken;
            editLogistics(this.numberValidateForm)
              .then(res => {
                this.$router.push({
                  name: "logistics",
                  path: "/setting/logistics"
                });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }else{
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.numberValidateForm.token = this.thisToken;
            addLogistics(this.numberValidateForm)
              .then(res => {
                this.$router.push({
                  name: "logistics",
                  path: "/setting/logistics"
                });
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    addNoLogPrice() {
      this.numberValidateForm.no_free.push({
        price: "",
        province_id: ""
      });
    },
    del(index) {
      this.numberValidateForm.no_free.splice(index, 1);
    }
  },
  created: function() {
    this.$store.dispatch('checkToken',localStorage.getItem('data'));
    this.thisToken = this.$store.state.token;
    let thisId = this.$route.params.logId;
    if (thisId != -1) {
      this.getData(thisId);
    }
    this.getProvice();
  },
  beforeCreate() {
    this.$store.dispatch('checkSettingsIndex', '/setting/logistics');
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.main {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 10px 20px;
  min-height: 630px;
  ul {
    > li {
      @include flex;
      width: 500px;
      @include flexLeftRight;
      margin: 10px 0;
      > .el-input {
        width: 200px;
      }
    }
  }
}
</style>
