<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-container>
        <el-aside style="width:180px;height:913px;background-color: rgba(234, 237, 241, 1);">
            <el-menu
                router
                style="background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;"
                :default-active="settingsindex"
                class="el-menu-vertical-demo"
                active-text-color="#47C9AF"
                >
                <el-menu-item index="/setting/dialog" style="width:180px;">
                    <span>首页弹框</span>
                </el-menu-item>
                <el-menu-item index="/setting/search" style="width:180px;">
                    <span>搜索框</span>
                </el-menu-item>
                <el-menu-item index="/setting/banner" style="width:180px;">
                    <span>banner图</span>
                </el-menu-item>
                <el-menu-item index="/setting/notice">
                    <span>公告</span>
                </el-menu-item>
                <el-menu-item index="/setting/menu">
                    <span>导航菜单</span>
                </el-menu-item>
                <el-menu-item index="/setting/winpos">
                    <span>橱窗位</span>
                </el-menu-item>
                <el-menu-item index="/setting/filter">
                    <span>商品筛选条件</span>
                </el-menu-item>
                <el-menu-item index="/setting/logistics">
                    <span>物流公司</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container style="position:relative;">
            <el-main>
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
            'settingsindex',
            'fullscreenLoadings4'
        ])
    },
    methods: {
        ...mapActions(['checkTIndex']),
        ...mapMutations(['checkFullscreenLoading4']),
        openFullScreen() {
            this.$data.fullscreenLoading = true;
            setTimeout(() => {
                this.$data.fullscreenLoading = false;
                this.checkFullscreenLoading4(false);
            }, 500);
        }
    },
    created() {
        if(this.$store.state.fullscreenLoadings4){
            this.openFullScreen()
        };
    },
    beforeCreate() {
        this.$store.dispatch('checkTIndex', '7')
    }
}
</script>

<style lang='scss' scoped>
    @import '../../css/common.scss';
</style>
