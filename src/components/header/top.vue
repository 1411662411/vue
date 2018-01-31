<template>
    <div style="width:100%;height:100%;">
        <el-popover
            ref="popover2"
            placement="top-start"
            width="400"
            trigger="hover">
            <span style="color: #999;float:left;font-size:12px;line-height:28px;padding-left:20px;">订单提示</span>
            <span style="display:block;height:1px;background:rgba(228, 228, 228, 1);margin-top:32px;margin-bottom:1px;"></span>
            <p class="info_p"><a href="javascript:;" @click="lookOrder">待付款订单</a><span>(<b>10</b>)</span></p>
            <p class="info_p"><a href="javascript:;" @click="lookOrder">待发货订单</a><span>(<b>10</b>)</span></p>
            <p class="info_p"><a href="javascript:;" @click="lookOrder">已完成订单</a><span>(<b>10</b>)</span></p>
            <p class="info_p"><a href="javascript:;" @click="lookOrder">已关闭订单</a><span>(<b>10</b>)</span></p>
            <p class="info_p"><a href="javascript:;" @click="lookRefund">待处理退款订单</a><span>(<b>10</b>)</span></p>
            <p class="info_p"><a href="javascript:;" @click="lookAgentList">待审核代理商</a><span>(<b>10</b>)</span></p>
        </el-popover>
        <el-container style="width:100%;height:100%;">
            <el-header v-if="!toggleLogin" style="position:fixed;top:0;height:60px;width:100%;z-index:10000;">
                <el-menu style="border:0;height:60px;" :default-active="tindex" class="el-menu-demo" mode="horizontal"
                    @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-row style="height:60px;box-sizing:content-box;">
                        <el-col :span="3"><div class="grid-content bg-purple">
                            <img src="../../images/top.png" width="40" height="40" id="logo"/><span id="cache3">酒玩家</span>
                        </div></el-col>
                        <el-col :span="10"><div class="grid-content bg-purple-light menu">
                            <el-menu-item index="1" style="width:68px;padding:0;"><router-link style="float:left;width:100%;height:100%;" to="/shopping">商品</router-link></el-menu-item>
                            <el-menu-item index="2" style="width:68px;padding:0;"><router-link style="float:left;width:100%;height:100%;" to="/order">订单</router-link></el-menu-item>
                            <el-menu-item index="3" style="width:68px;padding:0;"><router-link style="float:left;width:100%;height:100%;" to="/marketing">营销</router-link></el-menu-item>
                            <el-menu-item index="4" style="width:68px;padding:0;"><router-link style="float:left;width:100%;height:100%;" to="/user">用户</router-link></el-menu-item>
                            <el-menu-item index="5" style="width:68px;padding:0;"><router-link style="float:left;width:100%;height:100%;" to="/count">统计</router-link></el-menu-item>
                            <el-menu-item index="6" style="width:68px;padding:0;"><router-link style="float:left;width:100%;height:100%;" to="/member">成员</router-link></el-menu-item>
                            <el-menu-item index="7" style="width:68px;padding:0;"><router-link style="float:left;width:100%;height:100%;" to="/setting">设置</router-link></el-menu-item>
                        </div></el-col>
                        <el-col :span="6" id="u91"><div class="grid-content bg-purple">
                            <b>
                                <img src="../../images/u94.png" id="u94"/><b>{{name}}</b>
                            </b>
                            <span></span>
                            <a href="javascript:;" @click="backHome">
                                <img src="../../images/u96.png" />
                            </a>
                            <!-- <span></span>  -->
                            <!-- <b v-popover:popover2>
                                <el-badge :value="5" class="item">
                                    <img src="../../images/u98.png" id="u98"/>
                                </el-badge>
                            </b> -->
                            <span></span>
                            <a href="javascript:;" @click="dialogVisible = true">
                                <img src="../../images/u102.png" id="u102"/>    
                            </a>   
                        </div></el-col>
                    </el-row>
                </el-menu>
            </el-header>
            <router-view v-bind:class="{'martop':!toggleLogin}"></router-view>
        </el-container>
        <el-dialog
            title="退出确认"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确定要退出登录吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="success" @click="quit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    export default {
        data() {
            return {
                dialogVisible: false,
                toggleLogin: false,
                name: ''
            };
        },
        computed: {
            ...mapGetters([
                'tindex',
                'toLogin',
                'token'
            ])
        },
        methods: {
            ...mapActions(['checkTIndex', 'checkToken']),
            ...mapMutations(['tooLogin']),
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            backHome() {
                this.$router.push({path: '/shopping'})
            },
            accountSetting() {
                this.$router.push({name: 'accountsetting', path: '/accountsetting'})
            },
            lookOrder() {
                this.$router.push({name: 'orderlist', path: '/order/orderlist'})
            },
            lookRefund() {
                this.$router.push({name: 'orderrefunddetail', params: {id: 1}})
            },
            lookAgentList() {
                this.$router.push({name: 'agentlist', path: '/user/agentlist'})
            },
            quit() {
                this.$data.dialogVisible = false;
                localStorage.removeItem('data');
                localStorage.removeItem('name');
                this.$store.dispatch('checkToken', null)
                this.$router.push({name: 'home', path: '/'})
            }
        },
        updated() {
            if(this.$route.name === 'login') {
                this.$data.toggleLogin = true
            }else{
                this.$data.toggleLogin = false
            }
            this.name = localStorage.getItem('name');
        },
        beforeRouteEnter (to, from, next) { 
            localStorage.getItem('name');
            // this.getData();
            next()  
        }
    }
</script>

<style scoped>
    .martop {
        margin-top:60px;
    }
    .info_p {
        border-bottom: 1px solid rgba(242, 242, 242, 1);
    }
    .info_p a{
        padding-left: 20px;
        font-size: 12px;
        text-align: left;
        line-height: 36px;
        color:#666;
    }
    .info_p a:hover {
        color:#1ABC9C;
    }
    .info_p span{
        padding-right: 20px;
        font-size: 12px;
        float: right;
        line-height: 36px;
        color:#666;
    }
    .info_p span:hover {
        color:#1ABC9C;
    }
    .info_p span b{
        font-weight:100;
        color: rgb(240, 72, 68);
        font-size: 14px;
    }
    .info_p span:hover b {
        color:#1ABC9C;
    }
    .login_p {
        color:#999;
        font-size: 12px;
        line-height:36px;
        padding-left:15px;
    }
    .login_p span {
        color: #666;
    }
    .el-header {
        padding: 0;
    }
    .el-header {
        text-align: center;
        line-height: 60px;
    }
    .el-footer {
        text-align: center;
        font-family: '微软雅黑';
        font-weight: 410;
        font-style: normal;
        font-size: 12px;
        color: #6B6B6B;
        line-height: 100px;
        padding: 0;
    }
    .el-aside {
        text-align: center;
        line-height: 200px;
        padding: 0;
    }
    
    .el-main {
        text-align: center;
        line-height: 160px;
        padding: 0;
    }
    
    body > .el-container {
        padding: 0;
    }
    #logo {
        float: left;
        margin: 10px 10px 0 10px;
    }
    #cache3 {
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
        font-weight: 700;
        font-size: 18px;
        color: #FFFFFF;
        text-align: left;
        line-height: 28px;
        line-height: 60px;
    }
    #u91 {
        float: right;
        border-width: 0px;
        font-family: '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        color: #FFFFFF;
        text-align: right;
        line-height: 60px;
    }
    #u91 img {
        vertical-align: middle;
        margin-left: 16px;
    }
    #u91 b {
        font-weight: 100;
    }
    #u91 span {
        color: #000;
        display: inline-block;
        height: 20px;
        width: 1px;
        position: relative;
        top: 6px;
        border-right: 1px solid #000;
        padding: 0 9px;
    }
    #u94 {
        margin-right: 16px;
    }
    .item {
        margin-top: 15px;
        height: 42px;
    }
    #u98 {
        margin-top: -35px;
    }
    #u102 {
        margin-right: 16px;
    }

</style>
