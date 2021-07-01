const { Users } = require('../models');

const BAD_REQUEST = 400;

const errors = {
  requiredEmail: '"email" is required',
  emptyEmail: '"email" is not allowed to be empty',
  requiredPassword: '"password" is required',
  emptyPassword: '"password" is not allowed to be empty',
  invalidFields: 'Invalid fields',
};

const verifyLoginEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === '') return res.status(BAD_REQUEST).json({ message: errors.emptyEmail });
  if (!email) return res.status(BAD_REQUEST).json({ message: errors.requiredEmail });
  next();
};

const verifyLoginPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === '') return res.status(BAD_REQUEST).json({ message: errors.emptyPassword });
  if (!password) return res.status(BAD_REQUEST).json({ message: errors.requiredPassword });
  next();
};

const verifyIfUserExists = async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await Users.findOne({ where: { email, password } });
  if (!findUser) {
    return res.status(BAD_REQUEST).json({ message: errors.invalidFields });
  }
  next();
};

module.exports = {
  verifyLoginEmail,
  verifyLoginPassword,
  verifyIfUserExists,
};