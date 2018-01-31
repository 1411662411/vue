<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-container>
        <el-aside style="width:180px;height:913px;background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;">
            <el-menu
              router
              style="background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;"
              :default-active="membersindex"
              class="el-menu-vertical-demo"
              active-text-color="#47C9AF"
              >
              <el-menu-item index="/member/membermanager" style="width:179px;">
                  <span>成员管理</span>
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
            'membersindex',
            'fullscreenLoadings2',
            'token'
        ])
    },
    methods: {
        ...mapActions(['checkTIndex']),
        ...mapMutations(['checkFullscreenLoading2']),
        openFullScreen() {
            this.$data.fullscreenLoading = true;
            setTimeout(() => {
                this.$data.fullscreenLoading = false;
                this.checkFullscreenLoading2(false);
            }, 500);
        }
    },
    created() {
        if(this.$store.state.fullscreenLoadings2){
            this.openFullScreen()
        };
    },
    beforeCreate() {
        this.$store.dispatch('checkTIndex', '6')
    }
}
</script>

<style lang="scss" scoped>
    @import '../../css/common.scss';
</style>
