<template>
<div class="login-container">
	<div class="page-header">
  		<h1>sign in登录</h1>
	</div>
	<form @submit.prevent="loginHandle">
		<div class="form-group">
			<label for="inputemai">邮箱</label>
			<input type="email"
				id="exampleInputEmail" 
				placeholder="Email" 
				required
				v-model="formData.email"
				class="form-control">	
			
		</div>
		<div class="form-group">
			<label for="inputPassword">密码</label>
			<input type="password"
				v-model="formData.password"
				id="exampleInputPassword" 
				placeholder="password" 
				required
				class="form-control">	
			
		</div>
		<div class="checkbox">
			<label>
				<input type="checkbox">记住我
			</label>
		</div>
		<p class="error-message" v-show="loginMessage">邮箱或者密码错误，请重新输入</p>
		<button type="submit" class="btn btn-success btn-block">登录</button>
		<div class="message">
			<p>没有账号？<router-link to="/register">点击创建</router-link></p>
		</div>
	</form>




</div>
</template>

<script>
import axios from 'axios'

export default{
	data (){
		return {
			formData:{
				email:'',
				password: ''
			},
			loginMessage: false,
			headershow:false
			

		}
	},
	methods: {
		async loginHandle (){

			try{
				this.loginMessage=false
			console.log('login')
			const formData = this.formData
			const res = await axios.post('/api/session',formData)
			this.$router.push('/')
			}
			catch(err){
				const {status} = err.response
				switch(status){
					case 404 : this.loginMessage= true
					break
				}
				

			}
		}
	}
}
</script>


<style>
.login-container{
	width: 500px;
	margin:0 auto;
	margin-top:100px;
}
.page-header{
	text-align: center;
}
.error-message{
	color:red;
}
</style>
