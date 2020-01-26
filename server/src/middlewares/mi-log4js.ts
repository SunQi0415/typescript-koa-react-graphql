import { Context } from 'koa';
import { configure, getLogger } from 'log4js';
import config from '../config/log4js.config';
// const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];
const env = process.env.NODE_ENV;

export default () => {

  configure(config);

  let logger: any = getLogger();
  let errorLogger = getLogger('error');
  if (env !== 'production') {
    logger = getLogger('dev');
  }

  return async (ctx: Context, next: () => Promise<any>) => {
    const start = Date.now();
    
    ctx.log = logger;
    ctx.errorLog = errorLogger;

    ctx.log.info(JSON.stringify({
      url: ctx.url,
      query: ctx.query,
      headers: ctx.request.headers,
      ua: ctx.userAgent,
      timespan: Date.now()
    }))
    
    await next();
    const end = Date.now();
    const responseTime = end - start;
    console.log(`${ctx.method} ${ctx.url} - ${responseTime/1000}s`);
    logger.info(`${ctx.method} ${ctx.url} - ${responseTime/1000}s`);

  }
}