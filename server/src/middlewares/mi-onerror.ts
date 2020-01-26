import { Context } from 'koa';

export default () => {

  return async(ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch(err) {
      ctx.body = {
        errcode: err.status,
        msg: err.message || err
      }
      // ctx.app.emit("error", err, ctx);
      ctx.errorLog.error(err.stack || err)
    }
  }
}