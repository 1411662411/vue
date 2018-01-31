<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
      <el-container>
        <el-aside style="width:180px;height:913px;background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;">
            <el-menu
                router
                style="background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;"
                :default-active="usersindex"
                class="el-menu-vertical-demo"
                active-text-color="#47C9AF"
                >
                <el-menu-item index="/user/userlist" style="width:179px;">
                    <span>用户列表</span>
                </el-menu-item>
                <el-menu-item index="/user/agentlist">
                    <span slot="title">代理商列表</span>
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
            'usersindex',
            'fullscreenLoadings6'
        ])
    },
    methods: {
        ...mapActions(['checkTIndex']),
        ...mapMutations(['checkFullscreenLoading6']),
        openFullScreen() {
            this.$data.fullscreenLoading = true;
            setTimeout(() => {
                this.$data.fullscreenLoading = false;
                this.checkFullscreenLoading6(false);
            }, 500);
        }
    },
    created() {
        if(this.$store.state.fullscreenLoadings6){
            this.openFullScreen()
        };
    },
    beforeCreate() {
        this.$store.dispatch('checkTIndex', '4')
    }
}
</script>

<style lang="scss" scoped>
    @import '../../css/common.scss';
</style>
