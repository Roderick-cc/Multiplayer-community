
import vue from 'vue'
import VueRouter from 'vue-router'
import Home from './commponents/home/Home.vue'
// import HomeList from './commponents/home/List.vue'


import Login from './commponents/user/Login.vue'
import register from './commponents/user/Register.vue'


import TopicNew from './commponents/topic/New.vue'
import TopicDetail from './commponents/topic/Detail.vue'
import TopicEdit from './commponents/topic/Edit.vue'


// import Setting from './commponents/settings/Setting.vue'
// import SessingProfile from './commponents/settings/Profile.vue'
// import SessingAdmin from './commponents/settings/Admin.vue'





export default new VueRouter({
	routes:[
		{
			path:'/',
			component: Home
		},
		{
			path: '/topicnew',
			component: TopicNew
		},
		{	
			name : 'topicdetail',
			path : '/topicdetail/:id',
			component: TopicDetail

		},
		{	
			name : 'topicedit',
			path : '/topicedit/:id',
			component: TopicEdit

		},
		{
			path: '/register',
			component: register
		},
		{
			path: '/login',
			component: Login
		}


	]

})













