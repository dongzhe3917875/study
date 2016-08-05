var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require("path");
module.exports = {
  // plugins: [commonsPlugin],
  entry: {
    "blog_home": './public/javascripts/socketIO_chat_home.js',
    "datatable": './public/javascripts/datatable.js'
  },
  output: {
    path: 'public/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: "/node_modules/"
    }]
  },
  resolve: {
    root: [path.resolve("public/javascripts")]
  }
}
