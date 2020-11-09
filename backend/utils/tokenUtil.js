const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (id) => jwt.sign(id, process.env.JWT_SECRET)
}