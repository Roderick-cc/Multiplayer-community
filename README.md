
# 多人社区（前后端分离）

![](https://img.shields.io/badge/node-V8.11.3-green.svg)![](https://img.shields.io/badge/vue-v2.0%2B-green.svg)![](https://img.shields.io/badge/webpack-4.0-brightgreen.svg)



这是一款基于Nodejs+vue 实现的前后端分离社区Demo，手动配置的webpack 工程打包

### 安装依赖包

```
//分别进入server-side =>服务端文件夹   Client =>客户端文件夹安装相关依赖
npm install
```

### 开发实时编译

```	
1.//server-side 服务端文件夹下开启nodejs
node app.js

2.// Client =>客户端文件夹下开启vue
npm run dev 
```

### ***补充：

完成上面两步之后需要将数据库开启，并且将根目录的cms.sql导入（我使用的数据库可视化工具是Navicat Premium 12）。

完成上面步骤，程序已经可以正常跑动的了，要注意的一点就是端口的占用，本项目服务端占用开启的是3000端口，客户端打开的8080端口，客户端的影响不大，要注意的是服务端的3000 端口就是了

### 大致目录结构

```
//服务端
├── Server-side
│   ├── controllers 
│   │   ├── comment.js			//评论组件
│   │   ├── session.js			//用户状态组件
│   │   ├── topic.js			//话题文章组件
│   │   └── user.js				//用户组件
│   ├── models
│   │   └── db.js  				//SQL配置
│   ├── utilities
│   │   └── sqlhelper.js		//封装的sql查询方法
│   ├── app.js					//node 入口
│   ├── config.js 				//项目配置文件
│   ├── router.js 				//路由
//客户端
├──Client
│   ├── src 
│   │   ├── assets				//静态资源
│   │   ├── commponents			//功能模块组件
│   │   ├── App.vue				//vue
│   │   ├── main.js				//vue配置
│   │   ├── router.js			//vue路由配置
│   ├── index.html 
│   ├── webpack.config.js		//webpack 配置
//数据库
├── cms.sql
```



### 部分功能图：

![1](https://github.com/heimaozi/Multiplayer-community/blob/master/remadeimg/1.gif)

------------------------------------------------------------------------------------------------------------------------------------------------------

![2](https://github.com/heimaozi/Multiplayer-community/blob/master/remadeimg/2.gif)

