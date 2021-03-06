//const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const helpers = require('./helpers');
const BUILD_PATH = './build/';


var webpackConfig = {
    devtool: 'inline-source-map',
    target: 'node',
    entry: [helpers.root('server', 'server.js')],
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        path: helpers.root(BUILD_PATH),
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        modules: [helpers.root('src'), helpers.root('node_modules')],
        extensions: ['.js']
    },
    //externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
    ]
};


module.exports = webpackConfig;
