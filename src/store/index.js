import {createStore} from 'vuex'
export default createStore({
    state:{
       isCollapse:true,
       currentMenu:null,
       tabsList:[
        {
            path:'/',
            name:'home',
            label:'首页',
            icon:'home',
        },
       ],
    },
    mutations:{
        updateIsCollapse(state, payload){
            state.isCollapse=!state.isCollapse
        },
        // 新增标签功能的实现
        selectMenu(state, val){
            // 判断
            if(val.name == 'home'){
                state.currentMenu = null
            }else{
                state.currentMenu = val
                let result = state.tabsList.findIndex(item=>item.name === val.name)
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        // 删除标签功能的实现
        closeTab(state, val){
            let res = state.tabsList.findIndex(item=>item.name == val.name)
            state.tabsList.splice(res, 1)
        },
    }

})