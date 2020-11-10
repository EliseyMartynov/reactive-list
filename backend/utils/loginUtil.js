const db = require("../db");
const { generateToken } = require("../utils/tokenUtil");

const loginUtil = async login => {
  const userDb = await db.query(
    "SELECT id, login, todos FROM todos WHERE login = $1",
    [login]
  );
  const user = {
    id: userDb.rows[0].id,
    login: userDb.rows[0].login,
    todos: userDb.rows[0].todos,
    token: generateToken(userDb.rows[0].id)
  };
  return user;
};

module.exports = loginUtil;
