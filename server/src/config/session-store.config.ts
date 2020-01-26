import shortid from 'shortid';
import Redis from 'ioredis';
import redisConfig from './redis.config';

class RedisStore {
  redis: any;
  constructor(redisConfig: any) {
    this.redis = new Redis(redisConfig)
  }

  async get(key: any) {
    const data = await this.redis.get(`SESSION:${key}`);
    return JSON.parse(data);
  }

  async set(key: any, sess: any, maxAge: any) {
    await this.redis.set(
      `SESSION:${key}`,
      JSON.stringify(sess),
      'EX',
      maxAge / 1000
    )
  }

  async destroy(key: any) {
    return await this.redis.del(`SESSION:${key}`)
  }
}


const sessionConfig = {
  key: 'sessionId', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  store: new RedisStore(redisConfig),
  genid: () => shortid.generate()
}

export default sessionConfig;