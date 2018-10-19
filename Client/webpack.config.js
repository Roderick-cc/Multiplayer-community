


const path=require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack =require('webpack')



module.exports= {
	mode: 'production',
	entry: ['babel-polyfill','./src/main.js'],
	output:{
		path : path.join(__dirname,'./dist/'),
		filename : 'bundle.js'
	},
	devtool:'inline-source-map',//查看报错的源文件而不是bundle.js
	plugins:[
		new htmlWebpackPlugin({
			template: './index.html'
		}),
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin()

	],
	//打包结束自动打开浏览器 npm run xxx
	devServer: {
		contentBase:'./',
		hot: true,
		proxy: {
      		
      		'/api': {
        	target: 'http://localhost:3000',
        	pathRewrite: {'^/api' : ''}
      }
    
		}
	},
	//声明第三方包不被webpack一起打包
	externals:{
		jquery: 'jQuery',
		vue: 'Vue',
		'vue-router': 'VueRouter',
		axios: 'axios',
		'_': 'lodash'
	},
	module: {
		rules:[
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test:/\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test : /\.less$/,
				use :[
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use :{
					loader : 'babel-loader',
					options: {
						cacheDirectory: true,
						//presets: ['@babel/preset-env']
						presets: ['env'],
						plugins:['transform-runtime']
					}
				}
			},
			  {
		         test: /\.(woff|woff2|eot|ttf|otf)$/,
		         use: [
		           'file-loader'
		         ]
		       },
			{
				test: /\.vue$/,
				use: [
					'vue-loader'
				]
			}	

		]
	}


}


























