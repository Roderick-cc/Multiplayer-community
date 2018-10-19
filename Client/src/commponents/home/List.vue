<template>
<div class="list-container  container">
	<div class="topic-list col-md-8 col-xs-12">
		<section class="containers">
			<ul class="meaid-list">
				<li class="media media-person" v-for="item in topics ">
					<div class="media-left">
						<router-link to="#"><img src="../../assets/images/user.png" alt=""></router-link>
					</div>
					<div class="media-body">
						<h4 class="media-heading">
							<router-link :to="{name:'topicdetail',params:{id: item.id}}">{{item.title}}
							</router-link>
						</h4>
						<p class="list-p">发表时间:{{ item.create_time | dateFormat }}</p>
					</div>
				</li>
			</ul>
		</section>

		<el-pagination
		@site-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="currentPage4"
		:page-sizes="[5,10,15,20]" 
		:page-size="100"
		layout="total,sizes,prev,pager,next,jumper"
		:total="totalCount" 
		>	
		</el-pagination>   
	</div>
	<div class="hidden-sm col-md-4 hidden-xs">
		<div class="topic-container">
			<img src="../../assets/images/timg.gif" alt="">
		</div>
		<div class="topic-container">
			<router-link to="#">
				<img src="https://user-gold-cdn.xitu.io/1539767834613a0156470c02135ab72d39634b0a3929b.jpg?imageView2/1/q/85/format/webp/interlace/1" alt="这里是我随便放的广告，没有链接">
			</router-link>
		</div>
		<div class="topic-container">
			<router-link to="#">
				<img src="https://user-gold-cdn.xitu.io/1539336323601fbfb03ae1091357fdec37688081a2932.jpg?imageView2/1/q/85/format/webp/interlace/1" alt="这里是我随便放的广告，没有链接">
			</router-link>
		</div>
	</div>


</div>


</template>

<script>

export default{
	data (){
		return {
			topics:[],
			totalCount:0, //总页数
			currentPage4:1
		}
	},
	created(){
		// this.loadTopics({})
		this.loadTopics(1,5)
		
	},
	methods:{
		async loadTopics(page,pageSize){
			const {data} =await axios.get(`/api/topics?_page=${page}&_limit=${pageSize}`)
			this.topics=data.topice
			this.totalCount = data.count
		},
		
		handleCurrentChange (page){
			this.loadTopics(page,5)
		},
		handleSizeChange (){

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
.media-left{
	margin-right:15px;

}
.list-p{
	font-size:14px;
}
.topic-list{
	box-sizing: border-box;
	padding-top: 20px;

	background-color: #fff;
}
.topic-right{
	width: 350px;
}
.topic-container{
	margin-bottom: 20px;
	background-color: #fff;
}

.media-person{
	margin-top: 25px;
}
.el-pagination{
	text-align: center;
}

.topic-container img {
	width: 100%;
}
.el-pagination{
	width: 100%;
	overflow: hidden;
}




</style>
