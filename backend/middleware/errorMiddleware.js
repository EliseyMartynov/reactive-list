const errorMiddleware = (err, req, res, next) => {
  if (err) {
    res.json({ error: err.message, stack: err.stack });
  }
  next();
};

module.exports = errorMiddleware;
