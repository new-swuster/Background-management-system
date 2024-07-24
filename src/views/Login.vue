<template>
   <el-form class="square" :model="loginForm">
		<i style="--clr:#00ff0a;"></i>
		<i style="--clr:red;"></i>
		<i style="--clr:#fffd44;"></i>
        <i style="--clr:#fff;"></i>
        <i style="--clr:#28d6e0;"></i>
		<div class="login">
			<h2>系统登录</h2>
			<div class="inputBx">
				<input type="text" placeholder="输入用户名" >
			</div>
			<div class="inputBx">
				<input type="password" placeholder="输入密码">
			</div>
			<div class="inputBx">
				<input type="submit" value="登录" @click="login()">
			</div>
			<div class="links">
				<a href="#">忘记密码</a>
				<a href="#">注册</a>
			</div>
		</div>
	</el-form>
</template>

<script>
import {useRouter} from 'vue-router'
export default{
	setup(){
		const router = useRouter()
		const login = ()=>{
			router.push({
				name:'home'
			})
		}
		return{
			login,
		}
	},
}
</script>

<style scoped>
@import url(./style.css);
</style>
