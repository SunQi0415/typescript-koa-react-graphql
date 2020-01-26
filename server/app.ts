import Koa from 'koa';
import KoaRouter from 'koa-router';
import { middlewares } from './src/middlewares';
import Route from './src/core/routerDecorator/controllersToRoutes';
// import "reflect-metadata";
import './src/db/dbConnect';

const app = new Koa();
const router = new KoaRouter();

middlewares(app);

Route(router);

app.use(async(ctx, next) => {
  if (ctx.path === 'favicon.ico') return;
  await next()
})

app.use(router.routes()).use(router.allowedMethods()); // routes

export default app;



