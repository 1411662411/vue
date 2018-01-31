<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-container>
        <el-aside style="width:180px;height:913px;background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;">
            <el-menu
                router
                style="background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;"
                :default-active="ordersindex"
                class="el-menu-vertical-demo"
                active-text-color="#47C9AF"
                >
                <el-menu-item index="/order/orderlist" style="width:179px;">
                    <span>订单列表</span>
                </el-menu-item>
                <el-menu-item index="/order/orderrefund">
                    <span slot="title">退款申请</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container style="position:relative;">
            <el-main style="margin-left:180px;">
                <router-view></router-view>
            </el-main>
            <el-footer style="height:100px;color: #6B6B6B;line-height:100px;">Copyright © 2017 酒玩家, All Rights Reserved.</el-footer>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default {
    data() {
        return {
            fullscreenLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'tindex',
            'ordersindex',
            'fullscreenLoadings3'
        ])
    },
    methods: {
        ...mapActions(['checkTIndex']),
        ...mapMutations(['checkFullscreenLoading3']),
        openFullScreen() {
            this.$data.fullscreenLoading = true;
            setTimeout(() => {
                this.$data.fullscreenLoading = false;
                this.checkFullscreenLoading3(false);
            }, 500);
        }
    },
    created() {
        if(this.$store.state.fullscreenLoadings3){
            this.openFullScreen()
        };
    },
    beforeCreate() {
        this.$store.dispatch('checkTIndex', '2')
    },
    beforeRouteLeave (to, from, next) {  
        localStorage.removeItem('orderSn');
        next()  
    } 
}
</script>

<style lang="scss" scoped>
    @import '../../css/common.scss';
</style>
