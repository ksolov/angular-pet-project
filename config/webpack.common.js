/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getPostcssPlugins = require('./postcss_plugins.js');
const helpers = require('./helpers');

const webpackConfig = function (options) {
  const env = options.env;
  const folder = options.folder || '';
  const folderFonts = options.folderFonts || '';

  const isProd = env === 'prod' || env === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      polyfills: [helpers.root('src', 'polyfills.ts')],
      app: [helpers.root('src', 'main.ts')]
    },
    output: {
      path: helpers.root('build'),
      publicPath: '/',
      filename: `${folder}[name].js`
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        helpers.root('src'),
        helpers.root('node_modules')
      ]
    },
    module: {
      rules: [

        {
          test: /\.s?css$/,
          use: [
            { loader: 'style-loader' },
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => getPostcssPlugins
              }
            },
            { loader: 'sass-loader'},
            { loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/styles/variables.scss',
                  './src/styles/mixins.scss'
                ]
              }
            }
          ]
        },
        // scripts
        {
          test: /\.ts$/, // определяем тип файлов
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: { configFileName: helpers.root('tsconfig.json') }
            } ,
            'angular2-template-loader'
          ]
        },
        {
          test:  /\.(jpg|png|gif)$|(img\.svg)$/,
          use: {
            loader: 'file-loader',
            options: { name: folder + '[name].[ext]' }
          },
          include: [
            helpers.root('src')
          ]
        },
        // fonts
        {
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: {
            loader: 'file-loader',
            options: { name: folderFonts + '[name].[ext]' }
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader?minimize=false'
        }
      ]
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        /angular(\|\/)core/,
          helpers.root('src'), // каталог с исходными файлами
        {} // карта маршрутов
      )
    ]
  };
};

module.exports = webpackConfig;
