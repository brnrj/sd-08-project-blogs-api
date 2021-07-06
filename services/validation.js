const joi = require('joi');
const jwt = require('jsonwebtoken');
const { StatusCodes: HTTP } = require('http-status-codes');

const generateError = require('../utils/generateError');

const userSchema = joi.object({
  displayName: joi.string().min(8),
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
  image: joi.string(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
});

const categorySchema = joi.object({
  name: joi.string().required(),
});

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
});

const tokenValidation = (token) => {
  if (!token) throw generateError('Token not found', HTTP.UNAUTHORIZED);
  let tokenData;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw generateError('Expired or invalid token', HTTP.UNAUTHORIZED);
    }
    tokenData = decoded;
  });
  return tokenData;
};

module.exports = {
  userSchema,
  loginSchema,
  categorySchema,
  postSchema,
  tokenValidation,
};
