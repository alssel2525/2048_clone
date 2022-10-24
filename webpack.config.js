const port = process.env.PORT || 3000;
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	mode: "development",
	entry: "./index.tsx",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.[hash].js"
	},
	devServer: {
		host: "localhost",
		port: port,
		open: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}, {
				test: /\.(css)$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader"]
			}, {
				test: /\.(ts|tsx)$/,
				use: ["ts-loader"],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		})
	]
}
