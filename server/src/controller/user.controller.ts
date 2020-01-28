import { Context } from 'koa'
import { Controller, Get, Post } from '@core/routerDecorator/router.decorator';
import { getManager, getRepository } from "typeorm";
import { User } from '@entity/mysql/user.entity';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = 'sun';
const cryptPwd = (password: string)  => {
  return crypto.createHmac('sha256', JWT_SECRET).update(password).digest('hex');
}

@Controller('/api/user')
export default class {

  @Post('/register')
  async register(ctx: Context) {
    let { email, password } = ctx.request.body;
    let user = await getManager().findOne(User, {
      where: {
        email: email
      }
    })

    if (user) {
      ctx.throw(400, '该用户已经被注册')
    } else {
      let user = new User();
      user.email = email;
      user.password = cryptPwd(password);
      ctx.body = 
        await getRepository(User).save(user)
              .then(() => {
                return {
                  errcode: 0,
                  msg: '注册成功'
                }
              })
              .catch(err => {
                return {
                  errcode: 1001,
                  msg: '注册失败'
                }
              })
     
    }
  }
  
  @Post('/login')
  async login(ctx: Context) {
    const { email, password } = ctx.request.body; // 请求数据
    const userToUpdate = await getRepository(User).findOne({
      where: {
        email: email,
        password: cryptPwd(password)
      }
    });
    
    if (userToUpdate) {
      const token = jwt.sign({ ...userToUpdate }, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 //秒到期时间
      });
      ctx.session.token = token;
      let n = ctx.session.views || 0;
      ctx.session.views = ++n;

      userToUpdate.token = token;
      await getRepository(User).save(userToUpdate);

      ctx.body = {
        errcode: 0,
        msg: '登录成功',
        data: {
          token: token,
          views: n
        }
      }
    }
    else {
      ctx.throw(400, '用户名或密码错误！');
    }

  }
}