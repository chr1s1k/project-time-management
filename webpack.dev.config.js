const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.config.js')

module.exports = merge(commonConfig, {
	mode: 'development',
	devtool: 'source-map',

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
	}
})