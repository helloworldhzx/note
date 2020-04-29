// import { Configuration } from "webpack";
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
      test: /\.css$/,
      use: [
        // "style-loader",
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    }, {
      test: /\.md$/,
      use: ['html-loader', './markdown-loader'],
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }],
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'img',
        },
      }],
    }, 
    /* {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true,
      },
    } */
    {
      test:/\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets:[[
          "@babel/preset-env",
          {
            // 按需加载
              useBuiltIns: "usage",
              // 指定corejs版本
              corejs:{
                  version: 3
              },
              // 指定兼容性做到哪个版本浏览器
              targets:{
                  chrome:"60",
                  ie:"9"
              }
          }
         ]]
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
