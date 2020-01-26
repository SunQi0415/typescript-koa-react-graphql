import * as KoaRouter from "koa-router";
import { Controller, Get, Post } from '../core/routerDecorator/router.decorator';

@Controller('/api')
export default class testController {
  @Post('cats')
  getName(ctx: KoaRouter.RouterContext) {
    console.log(ctx)
    ctx.body = {
      aaa: 1
    }
  }
  
  @Post('dogs')
  getSex(ctx: KoaRouter.RouterContext) {
    ctx.body = {
      bbb: 2
    }
  }
}

// var test = new testController()
// test.getName()

// var aaa = Reflect.ownKeys(testController.prototype)
// console.log(aaa)