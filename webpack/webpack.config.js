// import { Configuration } from "webpack";
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RemoveComentsPlugin = require('./remove-coments-plugin')
/**
 * @type {Configuration}
 */
const config = {
  mode: "none",
  entry: './src/index.js',
  output: {
    filename: "bundle[hash].js",
    path: path.join(__dirname,"dist")
  },
  module: {
    rules:[{
      test:/\.css$/,
      use: ["style-loader","css-loader"]
    },{
      test:/\.md$/,
      use: ["html-loader","./markdown-loader"]
    },{
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    },{
      test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8*1024,
            name: '[hash:10].[ext]'
          },
          }],
      }]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'zz',
      template: './index.html'
    }),
   /*  new HtmlWebpackPlugin({
      filename:"zz.html",
      title: 'zz',
      template: './index.html' //HTML模板
    }), */
    new CopyWebpackPlugin(['./public']),
    new RemoveComentsPlugin()
  ]
}

module.exports = config