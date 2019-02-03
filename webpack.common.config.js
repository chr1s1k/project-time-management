const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
	entry: ['./src/js/index.js', './src/assets/stylesheets/main.scss'],
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'js/bundle.min.js'
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			}
		]
	},

	plugins: [
		// kompilace SASSu a vytažení do jednoho souboru
		new MiniCssExtractPlugin({
			filename: 'css/[name].min.css'
		}),

		// použití HTML šablony a include vygenerovaného bundle
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
			hash: true
		}),

		// kopírování API adresáře
		new CopyWebpackPlugin([
			{
				from: 'api/**/*', // vezmi celý adresář api a všechno v něm
				to: './', // output.path = ./public
				force: true,
				context: './src/'
			}
		])
	]
}