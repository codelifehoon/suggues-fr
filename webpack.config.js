// webpack.config.js
var path = require('path')
var webpack = require('webpack')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    entry: ['./bin/www.js'], // file extension after index is optional for .js files
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // ES6 문법과 JSX 문법을 사용한다
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015','stage-2']
                }
            }
        ]
    }

    ,plugins:[

    ],
    node: {
        fs: 'empty',
        net:'empty'
    }

}
