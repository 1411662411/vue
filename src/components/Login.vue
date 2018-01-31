<template>
    <div class="div" style="width:100%;height:100%;position:relative;">
        <div class="panel_state">
            <div class="w">
                <img id="u29_img" class="img " src="../images/logo.png">
                <div id="u3" class="text">
                    <p style="font-size:36px;">
                        <span style="font-family:'微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';font-weight:700;font-size:48px;">酒玩家后台业务管理系统</span>
                        <span style="font-family:'微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';font-weight:700;"> </span>
                    </p>
                    <p style="font-size:36px;">
                        <span style="font-family:'微软雅黑';font-weight:410;">Business Management System</span>
                    </p>
                </div>

                <!-- 表单部分 -->
                <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <div style="position:relative;top:170px;left:220px;width: 700px;height:100px;">
                    <div class="u13_div">
                        <img id="u18_img" class="img " src="../images/u18.png">
                        <!--<input type="text" value="请输入内容"/>-->
                        <el-input v-model="ruleForm2.age" placeholder="请输入用户名称"></el-input>
                    </div>
                    <div class="u13_div password">
                        <img id="u18_img" width="19" class="img " src="../images/u20.png">
                        <!--<input type="text"/>-->
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入登录密码"></el-input>
                    </div>
                    <a href="javascript:;" @click="submitForm('ruleForm2')">
                        <img  src="../images/login.png" width="49" height="49" style="position:absolute;top:2px;right:20px;"/>
                    </a>
                </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from "element-ui";
import { mapGetters, mapActions } from "vuex";
import { login } from "../api/login.js";
export default {
  data() {
    return {
      ruleForm2: {
        pass: "",
        age: ""
      }
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["checkToken"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login({
            user_name: this.ruleForm2.age,
            password: this.ruleForm2.pass
          }).then(res => {
            console.log(res.data)
            // return false;
            if(res.code == '0'){
              localStorage.setItem('data', res.data);
              localStorage.setItem('name', this.ruleForm2.age);
              this.$store.dispatch("checkToken", res.data);
              this.$router.push({ name: "shopping", path: "/shopping" });
            }else if(res.code == '1'){
              this.$message({
                message: '密码错误',
                type: 'warning'
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    if(localStorage.getItem('data')){
      this.$router.push({name:'shoppinglist', path: '/shopping/shoppinglist'})
    }
    // console.info(this.$store.state.token);
  }
};
</script>

<style scoped lang="scss">
@import "../css/common.scss";
.div {
  background: url("http://cdn.huashijituan.net/u0_state0.jpg");
  background-size: cover;
}
.panel_state {
  height: 300px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.498039215686275);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
#u29_img {
  width: 100px;
  height: 100px;
  margin: 47px 16px 0 100px;
  float: left;
}
#u3 {
  float: left;
  margin: 49px 0 25px 0;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
  font-style: normal;
  color: #ffffff;
  text-align: left;
  line-height: 48px;
}

.u13_div {
  width: 300px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background: #fff;
  position: absolute;
  .el-input {
    border: 0;
    position: relative;
    top: -19px;
    left: -3px;
    height: 50px;
    width: 215px;
    color: rgb(204, 204, 204);
    font-size: 14px;
  }
}
.password {
  top: 0;
  left: 317px;
}
#u18_img {
  // width: 24px;
  height: 24px;
  margin: 13px;
}
</style>
