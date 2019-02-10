const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.config.js')

module.exports = merge(commonConfig, {
	mode: 'development',
	devtool: 'source-map',

	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost',
				pathRewrite: {
					'^/api': '/project-time-management/public/api/'
				},
				secure: false,
				changeOrigin: true
			}
		},
		historyApiFallback: true
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							outputStyle: 'expanded',
							precision: 9,
							lineNumbers: true,
							sourceMap: true,
							includePaths: [
								path.resolve(__dirname, './node_modules/')
							]
						}
					}
				]
			}
		]
	},

	plugins: [
		// donutí dev server po startu zapsat soubory (adresář api) na filesystem
		new WriteFilePlugin({
			test: /api/
		})
	]
})