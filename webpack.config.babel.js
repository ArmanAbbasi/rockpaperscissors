import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    cache: true,
    debug: true,
    context: process.cwd(),
    devtool: 'source-map',
    devServer: {
        inline: true,
        port: 3333
    },
    resolve: {
        root: [
            path.resolve('./node_modules')
        ],
        extensions: ['', '.js']
    },
    resolveLoader: {
        root: path.join(process.cwd(), 'node_modules')
    },
    entry: {
        'main': './src/js/App.js'
    },
    output: {
        path: path.join(process.cwd(), 'build'),
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.ejs'
        }),
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([{
            from: './src/images/*',
            to: 'images',
            flatten: true
        }, {
            from: './src/audio/**/*',
            to: 'audio',
            flatten: true
        }, {
            from: './src/data/**/*',
            to: 'data',
            flatten: true
        }])
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint',
            exclude: [/node_modules/]
        }],
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        },{
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: 'babel'
        }]
    },
    eslint: {
        failOnError: true
    }
};
