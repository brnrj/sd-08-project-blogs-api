const eMiddleware = (err, _req, res, _next) => {
  res.status(500).send({ message: err.message });
};

module.exports = eMiddleware;
