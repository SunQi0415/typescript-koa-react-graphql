const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FockTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const resolve = (p) => path.resolve(__dirname, '..', p) // 返回绝对路径
const devMode = process.env.NODE_ENV !== 'production';
const theme = require('../theme');
const darkTheme = require('@ant-design/dark-theme');
const aliyunTheme  = require('@ant-design/aliyun-theme');

module.exports = {
  entry: {
    app: [path.resolve(__dirname, '../src/Main.tsx')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      '@': resolve('src'),
    }
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'lib',
              style: true
            }) ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { 
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              // modifyVars: aliyunTheme
            }
          } 
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'images/', // 输出到images文件夹
            limit: 8192 // 小于8kb的文件达成base64的格式，写入js
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'media/', // 输出到images文件夹
          limit: 10000
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'fonts'
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto',
      }

    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
  　　 filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      // chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css'   //把css文件单独打包
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: true,
      minify: {
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace: true, // 把生成的html文件的内容的没用空格去掉，减少空间
      },
      chunksSortMode: 'none', // 暂时不使用chunkSort,以解决循环引用问题
      hash: true // 为了更好的cache，可以在文件名后加个hash
    }),
    new FockTsCheckerWebpackPlugin()
  ],
  
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // }
};