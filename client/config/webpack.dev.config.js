const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.config');
const merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    host: 'localhost',
    port: '9000',
    compress: true,
    inline: true, // 设置为true，当源文件改变的时候会自动刷新
    hot: true, // 允许热加载
    overlay: true, // 将错误显示在html之上,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})