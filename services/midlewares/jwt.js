const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const {
  UNAUTHORIZED,
} = require('../consts');
const { User } = require('../../models');
const { requestError } = require('../requestError');
// const { getUser } = require('../models/recipesModel');

const app = express();
app.use(bodyParser.json());

const secret = process.env.JWT_SECRET;

const generateToken = (data) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, secret, jwtConfig);
  
  return token;
};

const getToken = (headers) => {
  const token = headers.authorization;
  if (!token) {
    requestError('Token not found', UNAUTHORIZED);
  }
  return token;
};

const verifyToken = async (headers) => {
  const token = getToken(headers);
  const decodedToken = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      requestError('Expired or invalid token', UNAUTHORIZED);
    }
    return decoded;
  });
  const { email } = decodedToken;
  const userFound = await User.findOne({ where: { email } });
  return userFound;
};

const decodeToken = async (req, res, next) => {
  try {
    const userFound = await verifyToken(req.headers);
    req.user = userFound;
    next();
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  generateToken,
  getToken,
  decodeToken,
  secret,
};