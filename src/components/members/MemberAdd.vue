<template>
  <div>
      <Dingbu :nameTitle='PageName' :tabBack="BackName"></Dingbu>
      <div class="w">
          <!-- 内容区 -->
          <div class="neirong">
              <p class="u5056">添加项目经理</p>

              <!-- 表单验证区域 -->
                <el-form 
                    :model="numberValidateForm" 
                    ref="numberValidateForm" 
                    label-width="120px"
                    style="margin-top:40px;"
                    class="demo-ruleForm">
                    <el-form-item
                        label="项目经理姓名:"
                        prop="real_name"
                        style="width:40%;margin:10px auto;"
                        :rules="[
                        { required: true, message: '项目经理姓名不能为空'}
                        ]"
                    >
                        <el-input type="age" v-model="numberValidateForm.real_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="登录账号:"
                        prop="manager_name"
                        style="width:40%;margin:10px auto;"
                        :rules="[
                        { required: true, message: '登录账号不能为空'}
                        ]"
                    >
                        <el-input type="age" v-model="numberValidateForm.manager_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                        label="登录密码:"
                        prop="manager_pwd"
                        style="width:40%;margin:10px auto;"
                        :rules="[
                        { required: true, message: '登录密码不能为空'}
                        ]"
                    >
                        <el-input type="password" v-model="numberValidateForm.manager_pwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top:30px;">
                        <el-button type="success" @click="submitForm('numberValidateForm')">提交</el-button>
                    </el-form-item>
                </el-form>
          </div>
      </div>
  </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { addManager } from "../../api/members/Member.js";
export default {
  data() {
    return {
      PageName: "添加成员",
      BackName: "返回",
      numberValidateForm: {
        real_name: "",
        manager_name: "",
        manager_pwd: ""
      }
    };
  },
  computed : {
      ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['checkToken']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('checkToken',localStorage.getItem('data'))
          addManager(
             {
              token: this.$store.state.token,
              manager_name: this.$data.numberValidateForm.manager_name,
              manager_pwd: this.$data.numberValidateForm.manager_pwd,
              real_name: this.$data.numberValidateForm.real_name
            }
          ).then(res => {
            console.log(res);
            this.$router.push({name: 'membermanager', path: '/member/membermanager'})
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    Dingbu
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
.neirong {
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 1);
  margin-top: 20px;
  min-height: 700px;
  text-align: center;
}
</style>
