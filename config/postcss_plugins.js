/* eslint import/no-extraneous-dependencies: 0, global-require: 0 */
const webpack = require('webpack');
const plugins = [
  require('autoprefixer')({
    browsers: [
      'last 3 versions',
      'ie 10',
      'ff 24',
      'android 4.2',
      'ios >= 5'
    ]
  })
];

module.exports = plugins;
