<template>
    <div>
        <Dingbu :nameTitle='PageName' :tabBack="BackName" :refresh="RefreshName"></Dingbu>
        <div class="w">
            <div class="u165_div">
                账户设置
            </div>
            <div class="u688_div">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="450px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name1">
                        <el-input v-model="ruleForm.name1" style="width:45%;"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="name2">
                        <el-input v-model="ruleForm.name2" style="width:45%;"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="name">
                        <el-input v-model="ruleForm.name" style="width:45%;"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="name">
                        <el-input v-model="ruleForm.name" style="width:45%;"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：" prop="name">
                        <el-input v-model="ruleForm.name" style="width:45%;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" style="margin-left:100px;padding:9px 23px;background-color: rgba(26, 188, 156, 1);" @click="submitForm('numberValidateForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-footer style="height:100px;color: #6B6B6B;line-height:100px;text-align:center;">Copyright © 2017 酒玩家, All Rights Reserved.</el-footer>
        </div>
    </div>
</template>

<script>
import Dingbu from "../header/dingbu.vue";
export default {
    data() {
        return {
            PageName: '账户设置',
            BackName: '返回',
            RefreshName: '刷新',
            ruleForm: {
                name: '',
                name1: 'zhangsan',
                name2: '张三'
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                ],
                name1: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                ],
                name2: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    },
    components: {
        Dingbu
    }
}
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>