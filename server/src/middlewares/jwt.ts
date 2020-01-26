import { Context } from 'koa';
// import * as jwt from 'jsonwebtoken';
import * as koajwt from 'koa-jwt';


export default () => {

  return async(ctx: Context, next: () => Promise<any>) => {
    const secret = 'sun:sec';
    // 路由白名单
    const whiteList = [
      '/api/user/login',
      '/api/user/register'
    ]
    console.log(111)
    // const token = ctx.header.authorization;
    // if(token === '') {
    //   ctx.throw(401, 'no token detected in http headerAuthorization');
    // }

    // try {
    //   jwt.verify(token, secret);
    // } catch {
    //   ctx.throw(401, 'invalid token');
    // }

    await next();
  }
}