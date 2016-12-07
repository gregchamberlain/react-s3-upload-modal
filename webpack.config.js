var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './site/src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'site'),
    filename: 'bundle.js',
    publicPath: '/site/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'site'), path.join(__dirname, 'src')]
    },
    {
     test: /\.json?$/,
     loaders: ['json']
    }]
  }
};
