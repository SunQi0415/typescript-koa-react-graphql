// 不同环境设置不同配置
// const ENV = process.env.NODE_ENV || 'development';

// mysql配置
const mysqlEnvConfig = {
  development: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "test",
    synchronize: true,
    dropSchema: true,
    logging: false
  },
  test: {
    type: "mysql",
    database: "",
    host: "localhost",
    port: 3306,
    username: "root",
    password: 12345678,
    synchronize: false,
    dropSchema: false,
    logging: true
  },
  production: {
    type: "mysql",
    database: "",
    host: "localhost",
    port: 3306,
    username: "root",
    password: 12345678,
    synchronize: false,
    dropSchema: false,
    logging: true
  }
}

// mongodb 配置
const MongoEnvConfig = {
  development: {
    type: "mongodb",
    database: "test",
    host: "localhost",
    port: 27107,
    // username: 'root',
    // password: 12345678,
    // logging: true,
    dropSchema: true,
    synchronize: true
  },
  test: {
    type: "mongodb",
    database: "test",
    host: "localhost",
    port: 27107,
    // username: 'root',
    // password: 12345678,
    dropSchema: false,
    synchronize: false,
    logging: true,
  },
  production: {
    type: "mongodb",
    database: "test",
    host: "localhost",
    port: 27107,
    // username: 'root',
    // password: 12345678,
    dropSchema: false,
    synchronize: false,
    logging: true,
  }
}

const ENV = process.env.NODE_ENV || 'development';

// @ts-ignore
let MySqlConfig = mysqlEnvConfig[ENV];
// @ts-ignore
let MongoConfig = MongoEnvConfig[ENV];

export {
  MySqlConfig,
  MongoConfig
}
