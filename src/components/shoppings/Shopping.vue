<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-container>
        <el-aside style="width:180px;height:913px;background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;">
            <el-menu
                router
                style="background-color: rgba(234, 237, 241, 1);position:fixed;left:0;z-index:999;"
                :default-active="shoppingsindex"
                class="el-menu-vertical-demo"
                active-text-color="#47C9AF"
                >
                <el-menu-item index="/shopping/shoppinglist" style="width:179px;">
                    <span>商品列表</span>
                </el-menu-item>
                <el-menu-item index="/shopping/shoppingcate">
                    <span slot="title">商品分类</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container style="position:relative;width:100%;">
            <el-main style="margin-left:180px;">
                <router-view ></router-view>
            </el-main>
            <el-footer style="height:100px;color: #6B6B6B;line-height:100px;">Copyright © 2017 酒玩家, All Rights Reserved.</el-footer>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import { shoppings } from '../../api/shoppings/Shopping.js';
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
            'shoppingsindex',
            'fullscreenLoadings5'
        ])
    },
    created() {
        this.getData();
    },
    methods: {
        ...mapActions(['checkTIndex']),
        ...mapMutations(['checkFullscreenLoading5']),
        openFullScreen() {
            this.$data.fullscreenLoading = true;
            setTimeout(() => {
                this.$data.fullscreenLoading = false;
                this.checkFullscreenLoading5(false);
            }, 500);
        },
        getData() {
            // shoppings({params:{token: '1',id: 3}}).then((res) => {
            //     console.log(res,'---');
            // }).catch( (err) =>{
            //     console.log(err);
            // });
        }
    },
    created() {
        if(this.$store.state.fullscreenLoadings5){
            this.openFullScreen()
        };
    },
    beforeCreate() {
        this.$store.dispatch('checkTIndex', '1')
    } 
}
</script>

<style lang="scss" scoped>
    @import '../../css/common.scss';
</style>

