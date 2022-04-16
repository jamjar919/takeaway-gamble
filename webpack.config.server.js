const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const SRC_DIR = './src/server/';
const COMMON_DIR = './src/common/';

const include = [
    path.resolve(__dirname, SRC_DIR),
    path.resolve(__dirname, COMMON_DIR)
];

const exclude = [
    path.resolve(__dirname, "./src/client")
];

module.exports = {
    entry: './src/server/index.ts',
    target: 'node', // support native modules
    devtool: "inline-source-map",
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                include,
                exclude
            },
        ]
    },
    plugins: [
        new NodemonPlugin()
    ]
};
