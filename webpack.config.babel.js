import LiveReloadPlugin from 'webpack-livereload-plugin';

export default {
	devtool: "eval",
	entry: "./app/Index.jsx",
	mode: process.env.NODE_ENV || 'development',
	output: {
		filename: "app.js",
		path: "/",
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
			},
		}],
	},
	plugins: [
		new LiveReloadPlugin(),
	],
};
