var UglifyJsPlugin = require('uglify-js-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const webpack = require("webpack");
const dev = require("./webpack.config.js")
var path = require("path");

module.exports= merge(dev,{

    plugins: [
        new BundleAnalyzerPlugin(),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    mode: "production",
    output: {
        path: path.join( __dirname, "build/assets/js" ),
        filename: "bundle.js"
    },
    devtool: 'source-map'
})