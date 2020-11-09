const jwt = require("jsonwebtoken");

const private = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    res.status(401);
    throw new Error("No token");
  }
  const token = req.headers.authorization.split(" ")[1];
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  req.body = {
    ...req.body,
    id: verifyToken
  }
  next();
};

module.exports = private;
