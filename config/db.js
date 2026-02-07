const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "contentgen",
  password: "tejj1919",
  port: 5432,
});

module.exports = pool;
