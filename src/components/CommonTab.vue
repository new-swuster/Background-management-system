<template>
    <div class="tags">
        <el-tag :key="tag.name" v-for="(tag,index) in tags" :closable="tag.name !== 'home'" :disable-transitions="false"
        :effect="$route.name == tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
        >{{tag.label  }}</el-tag>
    </div>
</template>

<script>
import {useStore} from 'vuex';
import {useRouter, useRoute} from 'vue-router';
export default{
    setup(){
        // 新增标签功能的实现↓
        const router = useRouter();
        const changeMenu=(item)=>{
            router.push({name:item.name});
        };
        const store =useStore();
        const tags = store.state.tabsList; 
        // 新增标签功能的实现↑
        const route = useRoute();
        // 标签删除功能的实现↓
        const handleClose =(tag, index)=>{
            // 逻辑长度，保持于标签一致
            let length = tags.length - 1;
            // 处理vuex中的tabsList
            store.commit('closeTab', tag);
            // 做第一个判断
            if(tag.name !== route.name){
                return;
            }
            // 做第二个判断
            if(index === length){
                router.push({
                    name:tags[index-1].name,
                })
            }
            // 做第三个判断
            else{
                router.push({
                    name:tags[index].name,
                })
            }
        };
        return{
            tags,
            changeMenu,
            handleClose,
        };
    },
}
</script>

<style lang="less" scoped>
.tags{
    padding:10px;
    width:100%;
    .el-tag{
        margin-right:20px;
        cursor:pointer;
    }
}
</style>