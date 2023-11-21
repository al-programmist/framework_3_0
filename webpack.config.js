import path from 'path';
import { config } from './gulp/config';

config.setEnv();

export const webpackConfig = {
	context: path.resolve(__dirname, config.scripts.webpackSrc),
	entry: {
		'script': './index/script.js',
		'script-ui-kit': './ui-kit/script-ui-kit.js',
		'script-main': './main/script-main.js',
		'script-catalog': './catalog/script-catalog.js',
		'script-cart': './cart/script-cart.js',
		'script-checkout': './checkout/script-checkout.js',
		'script-order-placed': './order-placed/script-order-placed.js',
		'script-personal': './personal/script-personal.js',
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, config.scripts.dest),
	},
	optimization: {
		minimize: config.isProd,
	},
	mode: config.isDev ? 'development' : 'production',
	devtool: config.isDev ? 'eval-source-map' : false,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	},
};
