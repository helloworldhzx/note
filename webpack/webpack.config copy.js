import { Configuration } from 'webpack';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveComentsPlugin = require('./remove-coments-plugin');
/**
 * @type {Configuration}
 */
const config = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'js/bundle[hash].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [{
      /* 语法检查 eslint-loader eslint
        注意只检查自己代码，不用检查第三方库
        设置检查规则：package.json中eslintConfig中设置,也能配置单独文件.eslintrc
        "eslintConfig":{
          "extends":"airbnb-base"
        }
      需要安装 eslint-config-airbnb-base eslint-plugin-import eslint
      */
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true, // 打包时自动修复
      },
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'zz',
      template: './index.html',
    }),
    /*  new HtmlWebpackPlugin({
      filename:"zz.html",
      title: 'zz',
      template: './index.html' //HTML模板
    }), */
    new CopyWebpackPlugin(['./public']),
    new RemoveComentsPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = config;
