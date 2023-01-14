import { config } from '../config.js';
import mysql from 'mysql2';

const { host, user, database, password, port } = config.db;

const pool = mysql.createPool({
  host,
  user, 
  database, 
  password, 
  port,
});

export const db = pool.promise();