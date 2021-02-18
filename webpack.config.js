const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	entry: resolveAppPath('src'),
	output: {
		path: resolveAppPath('dist'),
		publicPath: '/',
		filename: 'app.bundle.js'
	},
	devServer: {
		contentBase: resolveAppPath('public'),
		compress: true,
		hot: true,
		port: 9000,
		publicPath: '/'
	},
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
				from: 'src/resources',
				to: 'assets'
			}]
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: resolveAppPath('public/index.html')
		}),
	],
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
};