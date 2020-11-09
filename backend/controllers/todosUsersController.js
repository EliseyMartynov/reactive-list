const db = require("../db");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateToken } = require('../utils/tokenUtil')

//Registration controller
const todosRegistration = asyncHandler(async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  try {
    const data = await db.query("SELECT login FROM todos WHERE login = $1", [
      login
    ]);

    if (data.rows.length === 0) {
      const cryptPass = await bcrypt.hash(password, 10);
      const toDb = await db.query(
        "INSERT INTO todos(login, password) VALUES ($1, $2)",
        [login, cryptPass]
      );
      res.json({ message: `User ${login} has been created` });
    } else {
      res.status(409);
      throw new Error("User already exists");
    }
  } catch (e) {
    throw new Error(e);
  }
});

//Login controller

const todosLogin = asyncHandler(async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  try {
    const data = await db.query("SELECT password FROM todos WHERE login = $1", [
      login
    ]);
    if (data.rows.length === 0) {
      res.status(401);
      throw new Error(
        `Account with login ${login} doesn't exist. Please register first.`
      );
    } else {
      const cryptCompare = await bcrypt.compare(
        password,
        data.rows[0].password
      );
      if (cryptCompare) {
        const userDb = await db.query("SELECT id, login, todos FROM todos WHERE login = $1", [login]);
        const user = {
          id: userDb.rows[0].id,
          login: userDb.rows[0].login,
          todos: userDb.rows[0].todos,
          token: generateToken(userDb.rows[0].id)
        }
        return res.json({ message: user });
      } else {
        res.status(401);
        throw new Error("Incorrect password");
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = {
  todosRegistration,
  todosLogin
};
