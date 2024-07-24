<template>
    <div class="common-layout">
    <el-container class="lay-container">
     <common-aside></common-aside>
      <el-container class="r-container">
        <common-header></common-header>
        <common-tab></common-tab>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonTab from '../components/CommonTab.vue';
export default defineComponent({
    components:{
        CommonHeader,
        CommonAside,
        CommonTab,
    },
});
</script>

<style  lang="less" scoped>
.el-container {
  flex-wrap: wrap;
  align-items:flex-start;
}
.common-layout {
  height: 100%;
  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      background:rgb(83, 82, 82);
    }
  }
  .lay-container{
    flex-wrap:nowrap;
  }
}
</style>