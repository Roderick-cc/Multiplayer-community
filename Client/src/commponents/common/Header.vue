<template>
<div class="nav-person">

	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header navbar-centers">
	    	<router-link to="/" class="navbar-brand"> <img alt="Brand" src="../../assets/images/1.png"></router-link>
			<div class="nav-title"><p>开发者自由的思想国度</p></div>

	    	<div class="form-group">
          		<input type="text" class="form-control" placeholder="Search">
        	</div>
	    </div>
	    


	    <div class="button-container">	
			<div v-show="isLogin">
				<router-link to="/topicnew"><button type="button" class="btn btn-primary navbar-btn">发表文章</button></router-link>
				<!-- <router-link  to="/login" @click.prevent="LogoutHandler" >
					<button type="button" class="btn btn-primary navbar-btn">退出登录</button>
				</router-link> -->
			
					<button type="button" @click.prevent="LogoutHandler"  class="btn btn-primary navbar-btn">退出登录</button>
				
			</div>
		    <div v-show="!isLogin">
		    	<router-link to="/login">
		    		<button type="button" class="btn btn-primary navbar-btn">登录</button>
		    	</router-link>
		    	<router-link to="/register">
		    		<button type="button" class="btn btn-primary navbar-btn">注册</button>
		    	</router-link>
		    	
			</div>
			




		</div>
	  </div>
	</nav>

</div>
</template>

<script>
import axios from 'axios'
export default{
	data (){
		return {
			isLogin : false //登录状态
		}
	},
	created (){
		this.checkLogin()
	}
	,
	methods:{
		async LogoutHandler () {
			try{
				axios.delete('/api/session')
				window.alert('退出成功')
				this.$router.push('/')
				this.isLogin =!this.isLogin

			} catch (err) {
				window.alert('退出失败')
			}
		},
		async checkLogin () {
			try{	
				const {data} = await axios.get('/api/session')
				this.isLogin = true
			}
			catch(err){}
		}

	}
}
</script>


<style scoped>
.nav-person{
	background-color: #fff;
}
.navbar-centers{
	display: flex;
	align-items: center;
}
.form-group{margin-bottom: 0;}

.nav-title{
	margin-right:6rem;
}


</style>
