require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = (token) => jwt.verify(token, secret);