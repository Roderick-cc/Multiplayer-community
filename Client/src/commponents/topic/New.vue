<template>

<div>	
	<app-navbar></app-navbar>


	<div class="container new-container">

		<form @submit.prevert="topicHandler">
			<div class="from-group">
				<p>文章标题</p>

				<input type="text" class="form-control"
				required
				placeholder="title" 
				 v-model='topic.title' >
			</div>
			<div class="from-group">
				<label for="password">内容</label>
				<textarea class="form-control" v-model="topic.content" 
				required rows="5"></textarea>
			</div>
			
			<button type="submit" class="btn btn-info full-person">提交修改</button>
		</form>


	</div>



	<footer-compont></footer-compont>
</div>








</template>

<script>
import axios from 'axios'
import AppNavbar from '../common/Header.vue'
import FooterCompont from '../common/Footer.vue'

export default{
	data (){
		return {
			topic:{
				title:'',
				content:''
			}
		}
	},
	methods:{
		async topicHandler () {
			
			try{
				const res = await axios.post('/api/topics',this.topic)
				window.alert('发表文章成功')
				this.$router.push('/')
			}catch(err)
			{
				console.dir(err)
			}

		}
	},
	components: {
		AppNavbar,
		FooterCompont

	}
}
</script>


<style>
.new-container{
	width: 1200px;
	margin: 1.5rem auto;
}
.from-group{
	margin: 15px 0;
}
</style>
