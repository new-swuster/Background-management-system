<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '64px'" >
    <el-menu class="el-menu-vertical-demo" background-color="gray" text-color="#fff" :collapse="!$store.state.isCollapse" :collapse-transition="false">
      <h3 v-show="$store.state.isCollapse">体检报告解读</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>
      <hr>
      <!-- 路由跳转 -->
      <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)">
          
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group >
            <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" @click="clickMenu(subItem)"  :key="subIndex" >
              <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
  </el-aside>
</template>

<script>
// 引入方法
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default{
  setup(){
    const store = useStore();
    const list = [
      {
        path: "/home",
        name: "home",
        label: "主页",
        color:'#fff',
        icon: "View",
        url: "HomeManage/HomeManage",
      },
      {
        path: "/user",
        name: "user",
        label: "体检数据",
        color:'#fff',
        icon: "user",
        url: "UserManage/UserManage",
      },
      {
        label: "其他",
        icon: "location",
        color:'#fff',
        path: "/other",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            color:'#fff',
            icon: "setting",
            url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            color:'#fff',
            label: "页面2",
            icon: "setting",
            url: "Other/PageTwo",
          },
        ],
      },
    ];

    const router=useRouter();
      // 定义方法函数
    const noChildren=()=>{
      return list.filter((item)=>!item.children);
    };

    const hasChildren=()=>{
      return list.filter((item)=>item.children);
    };

    const clickMenu=(item)=>{
      router.push({
        name:item.name,
      });
      // vuex实现跨组件之间的通信
      store.commit('selectMenu',item);
    }
    return{
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
}
</script>

<style >
.icons{
  width:15px;
  height:15px;
}
.el-menu-vertical-demo{
  background-color: rgb(83, 82, 82);
  height:900px;
}
.el-menu{
  border-right:none;
  h3{
    line-height:48px;
    color:#fff;
    text-align:center;
  }
}

</style>