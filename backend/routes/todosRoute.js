const express = require("express");
const router = express.Router();
const {
  todosRegistration,
  todosLogin
} = require("../controllers/todosUsersController");
const { todosGet, todosPost } = require("../controllers/todosController");
const private = require("../middleware/privateMiddleware");

//router.get('/', (req, res) => {
//  res.send('Hello from get route')
//})

// POST       /api/todos/login
// DESC       Login user
// access     public
router.post("/login", todosLogin);

// POST       /api/todos/register
// DESC       Registering user to DB
// access     public
router.post("/register", todosRegistration);

// GET       /api/todos/:id
// DESC       get users todos
// access     private
router
  .route("/")
  .get(private, todosGet)
  .post(private, todosPost);

module.exports = router;
