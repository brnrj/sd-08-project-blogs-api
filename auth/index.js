require('dotenv').config();
const JWT = require('jsonwebtoken');

const auth = (token) => {
  try {
    const compare = JWT.verify(token, process.env.JWT_SECRET);
    return compare;
  } catch (err) {
    return err;
  }
};

module.exports = auth;
