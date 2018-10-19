<template>
<div>

<app-navbar></app-navbar>
<div class="container new-container">
	<form @submit.prevent="editHandler" >
		<div class="from-group">
			<p>文章标题</p>
			<input required class="form-control" v-model='formdata.title' >
		</div>
		<div class="from-group">
			<label for="content">文章内容</label>
			<textarea  required class="form-control" id="content" v-model="formdata.content" rows="5"></textarea>
		</div>
		<button type="submit" class="btn btn-info full-person">点击保存</button>

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
			formdata:{
				title:'',
				content:''
			}
		}
	},
	created(){
		const {id}= this.$route.params
		this.loadTopicById(id)
	},
	methods:{
		async loadTopicById(id){
			const res = await axios.get(`/api/topics/${id}`)
			this.formdata=res.data[0]
			console.log(res.data[0])
		},
		async editHandler (){
			try{
				const {id,title,content} =this.formdata
				await axios.patch(`/api/topics/${id}`,{title,content})
				window.alert('修改成功')

				this.$router.back()
			} catch(err){
				window.alert('修改失败')
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
