const db = require("../db/index");
const asyncHandler = require("express-async-handler");

//get todos
const todosGet = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const todos = await db.query('SELECT todos FROM todos WHERE id = $1', [id]);
  res.send({ todos: todos.rows[0].todos})
});

//post todos
const todosPost = asyncHandler(async (req, res) => {
  const id = req.body.id;
  const postTodos = JSON.stringify(req.body.todos)
  const todos = await db.query('UPDATE todos SET todos = $1 WHERE id = $2', [postTodos, id]);
  res.send(postTodos)
});

module.exports = { todosGet, todosPost };
