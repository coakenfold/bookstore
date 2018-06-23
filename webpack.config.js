var HTMLWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: 'client/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/build/client',
  },
  plugins: [HTMLWebpackPluginConfig],
}
