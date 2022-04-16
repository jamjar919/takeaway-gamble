const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

const SRC_DIR = './src/client/';
const COMMON_DIR = './src/common/';

const include = [
    path.resolve(__dirname, SRC_DIR),
    path.resolve(__dirname, COMMON_DIR)
];

const exclude = [
    path.resolve(__dirname, "./src/server")
];

module.exports = {
    entry: SRC_DIR + 'index.js',
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'client.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude,
                include
            },
            {
                loader: 'ts-loader',
                test: /\.ts(x?)$/,
                exclude,
                include
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
                exclude,
                include
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({template: SRC_DIR + 'index.html'}),
        new MiniCssExtractPlugin({ filename: "style.css" })
    ],
    devServer:{
        port:9000
    },
    mode : devMode ? 'development' : 'production'
};
