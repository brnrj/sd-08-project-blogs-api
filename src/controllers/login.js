const joi = require('joi');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const rescue = require('../utils/rescue');
const UserService = require('../services/user');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const getJwtToken = (payload) => {
  const jwtConfig = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
};

module.exports = rescue(async (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) throw error;

  const { email, password } = req.body;

  const user = await UserService.findByEmail(email);

  if (!user || user.password !== password) {
    throw boom.badRequest('Invalid fields');
  }

  const token = getJwtToken({ id: user.id, email });

  res.json({ token });
});
