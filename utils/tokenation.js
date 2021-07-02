const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const tokenGenerateForLogin = async (userData) => {
  const token = jwt.sign({ data: userData }, privateKey, jwtConfig);
  return ({ token });
};

const tokenDecodation = async (toDecode) => {
  const decodationData = jwt.verify(toDecode, privateKey, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
  return (decodationData);
};

module.exports = { tokenGenerateForLogin, tokenDecodation };
