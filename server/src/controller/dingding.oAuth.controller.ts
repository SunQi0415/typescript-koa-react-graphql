import { Context } from 'koa'
import http from '../utils/request';
import { Controller, Get, Post } from '../core/routerDecorator/router.decorator';
import {
  DINGDING_GET_TICKET,
  DINGDING_GEN_QRCODE,
  DINGDING_QRCODE_STATUS,
  DINGDING_GET_USERINFO,
  DINGDING_JS_CONFIG, 
} from '../const/api';
import { 
  getTicketRequest,
  getTicketResponse,
  genQRCodeRequest,
  qrCodeStatusRequest,
  jsConfigRequest,
} from '../const/interfaces/dingding.interface';
import { dingdingConfig } from '../config/oAuth.config';
import { getManager, getRepository } from "typeorm";
import { UserDing } from '../entity/mysql/user.dingding.entity';
import redis from '../config/redis.config';

@Controller('/api/user/dingding')
export default class {
  private ticket: string;
  private uuid: string;

  @Post('/login')
  async login(ctx: Context) {
    let ticketRes: getTicketResponse = await getTicket()
    let ticket = ticketRes.ticket;
    this.ticket = ticket;

    let qrCodeRes = await genQRCode(ticket)
    let { uuid ,qrcode } = qrCodeRes;
    this.uuid = uuid;
    
    ctx.body = {
      errcode: 0,
      msg: 'ok',
      data: {
        url: qrcode,
        uuid
      }
    }
    // await qrCodeStatus(uuid)
  }

  @Post('/userinfo')
  async getUserInfo(ctx: Context) {
    const { token } = ctx.request.body;
    const req = {
      token: token,
      ticket: this.ticket
    }
    let userInfoRes: any = await http.get(DINGDING_GET_USERINFO, req);

    ctx.session.token = token;

    let userToUpdate = await getRepository(UserDing).findOne({
      where: {
        email: userInfoRes.email
      }
    })

    let user = new UserDing();

    if (!userToUpdate) {
      user.email = userInfoRes.email;
      user.dingid = userInfoRes.dingid;
      user.name = userInfoRes.name;
      user.department_id = userInfoRes.department_id;
      user.department_ids = userInfoRes.department_ids.join();
      user.all_dept_ids = userInfoRes.all_dept_ids.join();
      user.department = userInfoRes.department;
      user.departments = userInfoRes.departments.join();
      user.avatar = userInfoRes.avatar;
      user.position = userInfoRes.position;
      user.token = token;
    } else {
      user.token = token;
    }
    await getRepository(UserDing).save(user);
    
    ctx.body = userInfoRes
  }
}


async function getTicket(): Promise<any> {
  const req: getTicketRequest = dingdingConfig;
  return await http.get(DINGDING_GET_TICKET, req);
}

async function genQRCode(ticket: string): Promise<any> {
  const req: genQRCodeRequest = {
    ticket: ticket
  }
  return await http.get(DINGDING_GEN_QRCODE, req);
}

async function qrCodeStatus(uuid: string): Promise<any> {
  const req: qrCodeStatusRequest = {
    uuid: uuid
  }
  return await http.get(DINGDING_QRCODE_STATUS, req);
}

async function getJsConfig(ticket: string, url: string): Promise<any> {
  const req: jsConfigRequest = {
    appid: dingdingConfig.appid,
    ticket: ticket,
    url: encodeURI(url)
  }
  await http.get(DINGDING_JS_CONFIG, req);
}