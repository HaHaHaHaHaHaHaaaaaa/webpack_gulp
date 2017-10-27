const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry:'./index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename:'[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['.html', '.css', '.js']
  },
  module: {
    rules: [{
        test: /\.html$/,

        loaders: [
          'html-loader',
        ]
      }, {
        test: /\.css$/,
        loader:'style-loader!css-loader'
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
  /*   new webpack.optimize.CommonsChunkPlugin({
      name:["vendor","app"]
  
    }), */
    new HtmlWebpackPlugin({ template: './share.html',inject:'body', filename: 'index.html' })
  ]
}