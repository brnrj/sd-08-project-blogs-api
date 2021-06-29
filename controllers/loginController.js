const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};
const jwtSecret = process.env.JWT_SECRET;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = schema.validate({ email, password });
  if (error) return next(error);
  const loginValid = await Users.findOne({ where: { email } });
  if (!loginValid) return next({ status: 400, message: 'Invalid fields' });
  if (loginValid.password !== password) return next({ status: 400, message: 'Invalid fields' });
  const token = jwt.sign({ data: email, password }, jwtSecret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  validateLogin,
};