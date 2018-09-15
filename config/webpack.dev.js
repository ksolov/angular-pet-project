/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = 'development';

const commonConfig = require('./webpack.common.js')({ env: ENV });
// uncomment if you want to see configs merge result
// const helpers = require('./helpers');

const config = webpackMerge.smart(commonConfig, {
  devtool: 'cheap-inline-module-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/stub.html'
    })
  ]
});

// uncomment if you want to see configs merge result
// helpers.writeJSON(config);

module.exports = config;
