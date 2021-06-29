require('dotenv').config();
const JWT = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const generateToken = (data) => {
  console.log(data);
  const payload = {
    ...data,
  };
  const token = JWT.sign({ payload }, process.env.JWT_SECRET, jwtConfig);
  return token; 
};

module.exports = generateToken;
