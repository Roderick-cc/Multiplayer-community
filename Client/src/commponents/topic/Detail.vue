<template>
<div>
	<app-navbar></app-navbar>

<!-- 
	<h1>{{topic.id}}</h1>
	<p>发布于{{topic.create_time | dateFormat }}</p>
	<p v-if="isLoginUser">
		<router-link :to="{name:'topicedit',params: {id: topic.id}}">编辑
		</router-link>
		<a @click.prevent="removeTopicByid(topic.id)" href="#">删除</a>
	</p>
	<h3> 文章标题：{{topic.title}}</h3>

	<article>
		<h4>文章内容：</h4>
		{{topic.content}}
	</article> -->
 
<div class="detail-container container">

	<div class="panel">
	    <div class="header topic_header">
	      <span class="topic_full_title"> {{topic.title}}</span>
	      <div class="changes">
	        <span> 发布于{{topic.create_time | dateFormat }} </span>
	        <span>作者 {{topic.id}}</span>
	        <span>5 次浏览</span>
	        <template v-if="isLoginUser">
	        	<router-link :to="{name:'topicedit',params: {id: topic.id}}">编辑
			</router-link>
			<a @click.prevent="removeTopicByid(topic.id)" href="#">删除</a>
	        </template>

	      </div>
	      
	    </div>
	    <div class="inner topic">

	      <div class="topic_content">
	        <div class="markdown-text">
	          {{topic.content}}
	        </div>
	      </div>
	    </div>
	</div>



	<div class="panel">
	    <div class="header" v-if="comments_time"><span class="col_fade">{{comments.length}}评论回复</span></div>


		<div class="div" v-for="(item,index) in comments" >

		    <div class="cell reply_area reply_itemreply_highlight">
		  		<div class="author_content">
		    		<a href="" class="user_avatar">
		      			<img src="https://avatars1.githubusercontent.com/u/359395?v=4&amp;s=120" title="justjavac">
		      		</a>
				    <div class="user_info">
				      <a class="dark reply_author" href="/user/justjavac">来自匿名用户</a>
				      <a class="reply_time" href="">{{index + 1}}楼•{{item.create_time | dateFormat}}</a>
				    </div>
		 		 </div>
		 	</div>
		  <div class="reply_content from-justjavac">
		    <div class="markdown-texts">
		    	<p>{{item.content}}</p>
		    </div>
		  </div>
		  <div class="clearfix">
		    <div class="reply2_area">
		    </div>
		  </div>
		</div>

	</div>
	<div class="comment">
		<p>评论</p>
		<form @submit.prevent="createCommentHandler" >
			<div class="form-group">
				<textarea  placeholder="请输入评论内容" class="form-control" rows="5" v-model.trim="commentContent"></textarea>

			</div>
			<button type="submit" class="btn btn-info full-person">提交</button>
		</form>
	</div>
</div>
	<footer-compont></footer-compont>
</div>
</template>
<script>
import axios from "axios"
import AppNavbar from '../common/Header.vue'
import FooterCompont from '../common/Footer.vue'

 export default{
	data (){
		return {
			topic:{},
			commentContent:"",
			isLoginUser:false,
			comments:[],
			comments_time: true
		}
	},
	created(){
		const {id} =this.$route.params
		this.loadTopics(id)
		this.loadComments(id)
	},
	components: {
		AppNavbar,
		FooterCompont

	},
	methods:{
		//获取文章信息
		async loadTopics(id){
			try{
				const {data} = await axios.get(`/api/topics/${ id }`)
				this.topic = data[0]

				const res = await axios.get('/api/session')
				//显示编辑删除框
				if(res.data.id==data[0].use_id){
					this.isLoginUser=true
				}
			}
			catch(err){
				
			}	
		},
		//删除文章，只有作者能删
		async removeTopicByid (id){
			if(!window.confirm('确定删除吗？老铁')){
				return
			}
			try{
				await axios.delete(`/api/topics/${id}`)
				this.$router.push('/')
			}
			catch(err){

			}
		},
		//创建评论功能
		async createCommentHandler (){
			try{
				await axios.get('/api/session')
				const {data}= await axios.post('/api/comments',{
					topic_id : this.topic.id,
					content : this.commentContent
				})
				//新增的评论
				this.comments.push(data)
				this.commentContent =""
			} 
			catch (err) {
				const {status}= err.response
				if(status==401){
					window.alert('老铁，你没有登录啊')
					this.$router.push('/login')
				}
			}
		},
		async loadComments(topicId){
			const {data}= await axios.get(`/api/comments?topic_id=${topicId}`)
			this.comments =data
			if(this.comments.length==0){
				this.comments_time=false
			}

		}

	}
 }
</script>


<style>
.list-container{
	width: 1200px;
	margin: 1.5rem auto;
	display: flex;
	justify-content: space-between;

}
.panel {
    margin-bottom: 13px;
    margin-top: 2rem;
}
.panel .header.topic_header, .panel .inner {
    background-color: #fff;
}
.panel .header {
    padding: 10px;	
    border-radius: 3px 3px 0 0;
}
.topic_full_title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%;
}
.changes {
    font-size: 12px;
    color: #838383;
}
.changes span:before {
    content: "•";
}

.topic_content {
    margin: 0 10px;
}
.markdown-text{
	min-height: 350px;
	box-sizing: border-box;
	padding: 1rem
}
.markdown-texts{
	box-sizing: border-box;
	padding: 1rem
}

/*评论css*/
.panel .header {
    padding: 10px;
    background-color: #fff;
    border-radius: 3px 3px 0 0;
}
.header .col_fade {
    color: #444;
}
.cell.reply_highlight {
    background-color: #f4fcf0;
}
.panel .cell {
	padding-top: 12px;
    padding-right: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
}
.author_content .user_avatar {
    display: inline-block;
    float: left;
}
.user_avatar img, .user_big_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.user_info {
    margin-left: 10px;
    display: inline-block;
}
a.dark, a.dark:active, a.dark:link, a.dark:visited {
    color: #666;
    text-decoration: none;
}
.reply_time {
    font-size: 11px;
     color: #08c;
    text-decoration: none;
}
.reply_content {
    padding-left: 50px;
    color: #333;
}
.div{
	background-color: #fff;
}

.comment p{
	text-align: center;
}
.full-person{
	width: 100%;
}
.comment{
	margin-bottom: 50px;
}



</style>

















