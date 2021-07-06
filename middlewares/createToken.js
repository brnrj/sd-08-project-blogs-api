const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');

const { JWT_SECRET } = process.env;

module.exports = rescue((req, res, next) => {
  const { email, password } = req.body;
  res.token = jwt.sign({ email, password }, JWT_SECRET, { expiresIn: '1d' });
  next();
});