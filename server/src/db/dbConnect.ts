import 'reflect-metadata';
import { createConnection } from "typeorm";
import { MySqlConfig, MongoConfig } from '../config/db.config';
import { MySqlEntities } from '../entity/mysql';
import { MongoEntities } from '../entity/mongo';

const connectMySql = (): void => {
  createConnection({
    type: 'mysql',
    host: MySqlConfig.host,
    port: MySqlConfig.port,
    username: MySqlConfig.username,
    password: MySqlConfig.password,
    database: MySqlConfig.database,
    entities: MySqlEntities,
    synchronize: MySqlConfig.synchronize,
    // dropSchema: MySqlConfig.dropSchema,
    logging: MySqlConfig.logging
  }).then((connection) => {
    console.log('mysql connect success!')
  }).catch((err) => {
    console.log('mysql connect fail!', err)
  })
}

const connectMongo = (): void => {
  createConnection({
    name     : 'mongo',
    type     : 'mongodb',
    host     : MongoConfig.host,
    port     : MongoConfig.port,
    // username : MongoConf.username,
    // password : MongoConf.password,
    database : MongoConfig.database,
    entities : MongoEntities,
    synchronize: MongoConfig.synchronize,
    dropSchema: MongoConfig.dropSchema,
    logging  : MongoConfig.logging,
  }).then((connection) => {
    console.log('mongo connect success!')
  }).catch((err) => {
    console.log('mongo connect fail!', err)
  })  
}

connectMySql()

