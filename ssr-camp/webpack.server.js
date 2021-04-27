const path = require('path')
const nodeExternals = require('webpack-node-externals')

// 服务端的webpack
module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server/index.js',
  externals: [nodeExternals()],
  output: {
    file: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 才能支持import 支持jsx
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          // 编译级别 @babel/preset-react 支持jsx  @babel/preset-env 支持最新js语法
          presets: ['@babel/preset-react', '@babel/preset-env'],
        }
      }
    ]
  }
}