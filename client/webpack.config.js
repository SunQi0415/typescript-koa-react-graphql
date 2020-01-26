// const merge = require('webpack-merge');
// const baseConfig = require('./config/webpack.base.config');
// const devConfig = require('./config/webpack.dev.config');
// const prodConfig = require('./config/webpack.prod.config');

// module.exports =  (env, argv) =>  {
//   console.log(argv)
//   let config = argv.mode === 'development' ? devConfig : prodConfig;
//   return merge(baseConfig, config)
// }
// // 
// // switch (process.env.NODE_ENV) {
// //   case 'production':
// //       module.exports = require('./config/webpack.prod.config.js');
// //     break;
// //   default:
// //     module.exports = require('./config/webpack.dev.config.js');
// // }
