const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(png|jpg|jpe?g|gif|svg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'assets'
						}
					}
				]
			},
			{
				test: /\.(sc|c)ss$/,
				loader: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					}
				]
			}
		]
	},
	devtool: 'inline-source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: "assets/styles.css",
			linkType: 'text/css',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: true
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: 'src/assets/resources',
				to: 'assets'
			}]
		}),
		new HtmlWebpackPlugin({
			inject: true,
			hash: true,
			filename: 'index.html',
			template: './src/index.html'
		}),
	],
	entry: './src/assets/javascript/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'assets/app.bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'src/'),
		watchContentBase: true,
		compress: true,
		port: 9000,
		index: path.join(__dirname, 'src/index.html'),
		hot: true,
		publicPath: '/'
	},
};