const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "development" ? false : true,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
