<template>
  <div>
      <div class="h-container" style="padding:0 42px;">
        <div class="w" style="position:relative;">
          <div class="left"><div class="nameList">{{nameTitle}}</div></div>
          <template v-if="this.$props.tabBack && this.$props.refresh" >
            <a href="javascript:;" @click="shuaxin" class="refresh" style="position:absolute;top:9px;right:95px;">
              <i class="el-icon-refresh"></i>刷新
            </a>
            <a href="javascript:;" @click="preBack" class="refresh" >
              <i class="el-icon-arrow-left"></i>返回
            </a>
          </template>
          <template v-else-if="this.$props.tabBack">
            <a href="javascript:;" @click="preBack" class="refresh">
              <i class="el-icon-arrow-left"></i>返回
            </a>
          </template> 
          <template v-else-if="this.$props.refresh">
            <a href="javascript:;" @click="shuaxin" class="refresh">
              <i class="el-icon-refresh"></i>刷新
            </a>
          </template>
          <template v-else>
            
          </template> 
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nameTitle","tabBack","refresh"],
  methods: {
    preBack() {
      // location.replace(document.referrer);
      window.history.back()
    },
    shuaxin() {
      location = location;
    },
    close() {
      window.close();
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../css/common.scss";
</style>
