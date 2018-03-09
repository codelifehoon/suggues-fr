// webpack.config.js
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: ['./appNode'], // file extension after index is optional for .js files
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
    ,plugins:[
            new webpack.optimize.UglifyJsPlugin({
                compressor : {
                    warnings:false,
                },
            })
            ,new webpack.optimize.OccurenceOrderPlugin()
    ]
}
