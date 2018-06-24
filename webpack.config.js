var HTMLWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/client/index.html',
  filename: 'index.html',
  inject: 'body',
})

module.exports = {
  entry: __dirname + '/src/client/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/build',
  },
  plugins: [HTMLWebpackPluginConfig],
}
