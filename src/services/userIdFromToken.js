const jwt = require('jsonwebtoken');
const config = require('../config/config');

const { secret } = config.development;

const userIdFromToken = (token) => {
  const decoded = jwt.decode(token, secret);
  const userId = decoded.data.id;

  return userId;
};

module.exports = { userIdFromToken };
