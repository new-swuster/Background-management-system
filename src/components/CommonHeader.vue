<template>
   <el-header>
    <div class="l-content">
        <!-- 图标展示 -->
        <el-button size="small" @click="handleCollapse">
            <el-icon size="20" style="color:green"><HelpFilled /></el-icon>
        </el-button>
        <!-- 面包屑↓-->
        <el-breadcrumb separator="/" class="bread">
          <!-- 首页是存在其不变的 -->
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <!-- 判断 -->
    <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 面包屑↑ -->
    </div>
    <div class="r-content">
        <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <!-- Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon> -->
      <img :src="getImgSrc()" alt="" class="user">
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item >个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLoginOut()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    </div>
   </el-header>
   
</template>

<script>
// 动态引入图片
import { defineComponent, computed } from 'vue-demi';
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default defineComponent({
  setup(){
    let store= useStore()
    // const imgSRC=require('../assets/头像图片.png');
    const getImgSrc =()=>{
      return new URL('../assets/样例图片.png', import.meta.url).href
    };
    let handleCollapse= ()=>{
      // 调佣vuex中的mutations
      store.commit('updateIsCollapse');
    };
    // 计算属性
    const current = computed(()=>{
      return store.state.currentMenu;
    });
    const router = useRouter()
    const handleLoginOut =()=>{
      router.push({
        name:'login',
      })
    }
    return{
      // imgSRC,
      getImgSrc,
      handleCollapse,
      current,
      handleLoginOut,
    };
  },
})
</script>

<style scoped>
.user{
    width:40px;
    height:40px;
    border-radius:50%;
}

header{
    display:flex;
    justify-content: space-between;
    align-items:center;
    width:100%;
    background-color:rgb(72, 70, 70); 
}

.r-content{
  .user{
    width:40px;
    height:40px;
    border-radius: 50%;
  }
}

.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right:20px;
  }
  h3{
    color:#fff;
  }
}
/* 穿透样式(强制实现) */
.bread {
  color: #fff;
  cursor:pointer !important;
}
</style>
