const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: {
        app: helpers.root('app.js')
    },
    output: {
        path: helpers.root('build'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },
    module: {
        rules: [
            // { don't need this yet
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html'}),
        new webpack.HotModuleReplacementPlugin()
    ]
};
