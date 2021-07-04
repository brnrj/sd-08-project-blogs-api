// Codigo copiado do VItor
// https://github.com/tryber/sd-08-project-blogs-api/pull/25/files
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../config' });

const secret = process.env.JWT_SECRET;

const headers = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

const tokenGenerete = (payload) => {
  const token = jwt.sign(payload, secret, headers);
  return token;
};
const tokenDecoded = (token) => {
    const decoded = jwt.decode(token);
    return decoded;
};
const tokenVerify = (token) => {
    try {
        jwt.verify(token, secret);
    } catch (err) {
        return false;
    }
    return true;
};

module.exports = {
    tokenGenerete,
    tokenDecoded,
    tokenVerify,
};