const { status, message } = require('../schema/status');
const usersServices = require('../services/usersServices');
const { User } = require('../models');

const validateDisplayName = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(status.badRequest).json({ message: message.displayNameSize });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailIsValid = emailRegex.test(email);
  if (email === '') {
    return res.status(status.badRequest).json({ message: message.emptyEmail });
  }
  if (email === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredEmail });
  }
  if (!emailIsValid) {
    return res.status(status.badRequest).json({ message: message.invalidEmail });
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(status.badRequest).json({ message: message.emptyPassword });
  }
  if (password === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredPassword });
   }
   if (password.length < 6) {
    return res.status(status.badRequest).json({ message: message.passwordSize });
  }
  next();
};

const validateEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const emailExists = await usersServices.findUserByEmail(email);
  if (emailExists) {
    return res.status(status.conflict).json({ message: message.existsEmail });
  }
  next();
};

const validateUserEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(status.badRequest).json({ message: message.invalidFields });
  }
  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validateEmailExists,
  validatePassword,
  validateUserEmailExists,
};
