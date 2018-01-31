<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-container>
        <el-aside style="width:180px;height:913px;background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;">
            <el-menu
                router
                style="background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;"
                :default-active="marketingsindex"
                class="el-menu-vertical-demo"
                active-text-color="#47C9AF"
                >
                <el-menu-item index="/marketing/manjian" style="width:179px;">
                    <span>满额立减</span>
                </el-menu-item>
                <el-menu-item index="/marketing/limitlist">
                    <span>限时抢购列表</span>
                </el-menu-item>
                <el-menu-item index="/marketing/needslist">
                    <span slot="title">优惠套餐列表</span>
                </el-menu-item>
                <el-menu-item index="/marketing/red">
                    <span slot="title">新客立减红包</span>
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
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      fullscreenLoading: false
    };
  },
  computed: {
    ...mapGetters(["tindex", "marketingsindex", "fullscreenLoadings"])
  },
  methods: {
    ...mapActions(["checkTIndex"]),
    ...mapMutations(["checkFullscreenLoading"]),
    openFullScreen() {
      this.$data.fullscreenLoading = true;
      setTimeout(() => {
        this.$data.fullscreenLoading = false;
        this.checkFullscreenLoading(false);
      }, 500);
    }
  },
  created() {
    if (this.$store.state.fullscreenLoadings) {
      this.openFullScreen();
    }
  },
  beforeCreate() {
    this.$store.dispatch("checkTIndex", "3");
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
