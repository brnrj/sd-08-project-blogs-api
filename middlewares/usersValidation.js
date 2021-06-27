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

const emailRequired = async (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredEmail });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailIsValid = emailRegex.test(email);
  if (!emailIsValid) {
    return res.status(status.badRequest).json({ message: message.invalidEmail });
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

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(status.badRequest).json({ message: message.requiredPassword });
   }
   if (password === '') {
     return res.status(status.badRequest).json({ message: message.emptyPassword });
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

const validateNotEmptyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === '') {
    return res.status(status.badRequest).json({ message: message.emptyEmail });
  }
  next();
};

module.exports = {
  validateDisplayName,
  emailRequired,
  validateEmail,
  validateEmailExists,
  validatePassword,
  validateUserEmailExists,
  validateNotEmptyEmail,
};
