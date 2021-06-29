const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const userIdFromToken = (token) => {
  const decoded = jwt.decode(token, secret);
  const userId = decoded.data.id;

  return userId;
};

module.exports = { userIdFromToken };
