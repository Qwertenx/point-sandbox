const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            'emscripten_point': path.resolve(__dirname, './out/wasm/point'),
            'emscripten_point.wasm': path.resolve(__dirname, './out/wasm/point.wasm')
        }
    },
    entry: {
        index: './index.ts'
    },
    output: {
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }, {
            test: /\.(wasm)$/,
            type: 'javascript/auto',
            loader: 'base64-loader',
            sideEffects: false
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './public/index.html'})
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
