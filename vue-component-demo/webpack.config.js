var webpack = require('webpack');
var path = require("path");
require("babel-polyfill");
module.exports = {
  entry: path.resolve(__dirname, "./modules/main.js"),
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }, // use ! to chain loaders
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  }
};
