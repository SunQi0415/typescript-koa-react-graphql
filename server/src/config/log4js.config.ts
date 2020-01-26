/*
** log4js配置文件
*/
import path from 'path';
let baseLogPath = path.resolve(__dirname, '../../logs')
// console.log(baseLogPath)

export default {
  appenders: {
    console: {
      type: 'console'
    },
    file: {
      type: 'file',
      filename: baseLogPath + '/logger.log',
      maxLogSize : 20971520, // 当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
      backups : 3, //default value = 5.当文件内容超过文件存储空间时，备份文件的数量
      encoding : 'utf-8',
      compress: true // 压缩备份的日志
    },
    dateFile: {
      type: 'dateFile',
      filename: baseLogPath + '/logger/logger',
      alwaysIncludePattern: true, // 是否总是有后缀名
      daysToKeep: 10, //时间文件 保存多少天，距离当前天daysToKeep以前的log将被删除
      pattern: "-yyyy-MM-dd.log", //（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding : 'utf-8'
    },
    errorFile: {
      type: 'dateFile',
      filename: baseLogPath + '/error/error',
      alwaysIncludePattern: true, //（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      daysToKeep:10, //时间文件 保存多少天，距离当前天daysToKeep以前的log将被删除
      pattern: "_yyyy-MM-dd.log", //（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding : 'utf-8'
    }
  },
  categories: {
    default: { appenders: ['file', 'dateFile'], level: 'info' }, // 默认log类型
    dev: { appenders: ['console'], level: 'warn'}, // 开发环境
    error: { appenders: ['errorFile'], level: 'error'} // 错误日志
  }
}