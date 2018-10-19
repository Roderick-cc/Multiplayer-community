<template>
<div class="register-container">

	<div class="page-header">
  		<h1>register注册</h1>
	</div>
	<form @submit.prevent="register">
		<!-- <form > -->
		<div class="form-group">
			<label for="email">邮箱</label>
			<input type="email"
				v-model="formData.email"
				@blur="checkEmail"
				@input="checkEmail"
				required
				class="form-control" 
			>	
			
			<p class="error-message" v-show="emailMessage">邮箱已存在</p>
		</div>
		<div class="form-group">
			<label for="nickname">昵称</label>
			<input class="form-control"
				v-model="formData.nickname"
				@input="checkNickname"
				@blur="checkNickname"
				required
				minlength="2"
				maxlength="8"
				id="nickname" name="nickname" placeholder="Nickname">
			<p class="error-message" v-show="nicknameMessage">昵称已经存在</p>
		</div>
		<div class="form-group">
			<label for="password">密码</label>
			<input
				class="form-control" 
				type="password" 
				v-model="formData.password"
				required
				minlength="6"
				maxlength="18"
				id="password" 
				name="password" placeholder="passWord">
		</div>
		<button type="submit" class="btn btn-success btn-block">注册</button>
	</form>
	<div class="message">
		<p>已有账号？
	
		<router-link to="/login">点击登录</router-link>
		</p>
	</div>


</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'


export default{
	data (){
		return {
			formData:{
				email:'',
				password:'',
				nickname:''
			},
			emailMessage:false,
			nicknameMessage:false,
		}
	},
	methods:{
		async register(){

			if(this.emailMessage){
				return
			}
			if(this.nicknameMessage){
				return
			}


			const ret = await axios.post('/api/users',this.formData)
			console.log(ret)
			this.$router.push('/login')


		},
		//延迟检验lodash
		checkEmail:_.debounce(async function(){
			const {data} =await axios.get(`/api/users?email=${this.formData.email}`)
			this.emailMessage =data[0]? true:false
		},500)
		,
		checkNickname:_.debounce(async function(){
			const {data} = await axios.get(`/api/users?nickname=${this.formData.nickname}`)
			this.nicknameMessage= data[0]?true:false
		})







	}
}
</script>


<style>
.register-container{
	width: 500px;
	margin:0 auto;
	margin-top:100px;
}
.page-header{
	text-align:center;
}
.error-message{
	color:red;
}
</style>
