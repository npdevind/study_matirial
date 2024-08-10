require('dotenv').config();
const PostgreSQLConnector = require('postgresql-cg');
const pg = require("pg");
const { Pool } = pg;

const dbConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.NAME,
    password: process.env.PASS,
    port: process.env.PORT,
  };
const db = new Pool(dbConfig);


module.exports = db;
