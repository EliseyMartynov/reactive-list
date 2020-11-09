const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.URI
});

module.exports = {
  query: (text, params) => pool.query(text, params)
}