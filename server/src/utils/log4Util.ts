import log4js from 'log4js';
import logConfig from '../config/log4js.config';

// 加载配置文件
log4js.configure(logConfig);

let logUtil: any = {};
// 调用预先定义的日志名称
let consoleLogger = log4js.getLogger();
let errorLogger = log4js.getLogger('errorLogger');


export = () => {
  return async (ctx, next) => {
    ctx.logger = logUtil
    await next()
  }
}
