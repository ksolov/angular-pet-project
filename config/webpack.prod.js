/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = 'production';

const getConfig = require('./webpack.common.js');
// uncomment if you want to see configs merge result
// const helpers = require('./helpers');


const ASSETS_PATH = 'assets/';

const commonConfig = getConfig({
  env: ENV,
  folder: ASSETS_PATH,
  folderFonts: ASSETS_PATH + 'fonts/'
});

const config = webpackMerge.smart(commonConfig, {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: ASSETS_PATH + '[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/stub.html'
    })
  ]
});

// uncomment if you want to see configs merge result
// helpers.writeJSON(config);

module.exports = config;
