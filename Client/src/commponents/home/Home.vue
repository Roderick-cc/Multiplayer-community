<template>
<div>
<app-navbar></app-navbar>

<topic-list></topic-list>

<footer-compont></footer-compont>

</div>
</template>

<script>

import TopicList from '../home/List.vue'
import AppNavbar from '../common/Header.vue'
import FooterCompont from '../common/Footer.vue'

export default{
	data (){
		return {
		}
	},
	components: {
		TopicList,
		AppNavbar,
		FooterCompont

	},
	methods:{
	}
}
</script>


<style>
</style>
