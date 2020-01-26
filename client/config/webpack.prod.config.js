// const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base.config');
const merge = require('webpack-merge');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].js',      // 打包后的文件名称
    chunkFilename:'js/[chunkhash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),  // 打包后的目录，必须是绝对路径
    publicPath: '/'
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_debugger: true,
            drop_console: true
          },
          output: {
            comments: false // 打包的时候去掉注释
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'), // 引入css配置压缩选项
        cssProcessorOptions: { 
          discardComments: { removeAll: true } 
        },
        canPrint: true //是否将插件信息打印到控制台
      }),
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist/public')
    }]),
    new CleanWebpackPlugin(),
    // new webpack.HashedModuleIdsPlugin() // 长缓存配置
  ]
})
