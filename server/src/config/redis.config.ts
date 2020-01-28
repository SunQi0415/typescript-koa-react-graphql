const redisEnvConfig = {
  development: {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    ttl: 60 * 60 * 24, // 过期时间
    family: 4,
    db: 0
  },
  test: {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    ttl: 60 * 60 * 24, // 过期时间
    family: 4,
    db: 0
  },
  production: {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    ttl: 60 * 60 * 24, // 过期时间
    family: 4,
    db: 0
  }
}

// 不同环境设置不同配置
type NODE_ENV = 'development' | 'test' | 'production'
const ENV: keyof typeof redisEnvConfig = (process.env.NODE_ENV as NODE_ENV) || 'development';
let redisConfig  = redisEnvConfig[ENV];


export default redisConfig;
