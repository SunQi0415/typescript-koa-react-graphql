import { resolve } from 'path';
import Koa from 'koa';
import onerror from './mi-onerror';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import session from 'koa-session';
import logger from './mi-log4js';
import jwt from 'koa-jwt';
import koaStatic from 'koa-static';
import sessionConfig from '../config/session-store.config';

export const middlewares = (app: Koa) => {

  app.use(onerror());
  app.use(koaStatic(resolve(__dirname, '../../public'), {
    maxAge: 30 * 24 * 60 * 60
  }));
  app.use(bodyParser());
  app.use(cors());
  
  app.keys = ['xes1v1:sess'];
  app.use(session(sessionConfig, app));
  app.use(logger())
  app.use(jwt({ secret: 'sun'}).unless({ path: [/login$/, /register$/] }));
}