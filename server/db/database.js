import { config } from '../config.js';
import mysql from 'mysql2';
import SQ from 'sequelize';

const { host, user, database, password, port } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password,{
  host,
  dialect : 'mysql',
});

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

export const db = pool.promise();