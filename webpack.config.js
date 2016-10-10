'use strict';

let  webpack = require('webpack');
let  path = require('path');

// switch dev and prod mode
const NODE_ENV = process.env.NODE_ENV || 'dev';

let webpackOptions = {

	context: path.join(__dirname, '/source'),
	entry: {
		app: ['whatwg-fetch','./app/app.js']
	},
	output: {
		path: path.join(__dirname, '/dist'),
		// export global variable
		filename: '[name].bundle.js',
		library: '_[name]'
	},

	// watcher webpack
	watch: NODE_ENV == 'dev',
	watchOptions: {
		// delay before rebuild app
		aggregateTimeout: 300
	},

	devtool: NODE_ENV == 'dev' ? 'cheap-inline-module-source-map' : null,

	plugins: [
		new webpack.ProvidePlugin({
				'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
				'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],

	resolve: {
		root: [
				path.join(__dirname, 'node_modules')
		],
		extensions: ['', '.js', '.json'] 
	},

	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ // loader for all JS files and JSX files
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0', 'react'],
				}
			}, {// loader for STYLUS files
				test: /\.styl/,
				loader: 'style!css!postcss!stylus?resolve url'
			}, { // loader for PUG(JADE) files
				test: /\.pug$/,
				loader: 'pug-loader'
			}, {
				test: /\.(png|jpe?g|svg|ttf|eot|woff|woff2|html|css)$/,
				exclude: '/\node_modules\//',
				loader: 'url-loader',
				query: {
					name: '[path][name].[ext]',
					limit: 10240
				}
			}, {
				test: /\.(html|css)/,
				loader: 'file-loader'
			}
		]
	}

};

if(NODE_ENV !== 'dev') {
	webpackOptions.plugins.push(
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	)
}

module.exports = webpackOptions;