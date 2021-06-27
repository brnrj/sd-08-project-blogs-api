const { status, message } = require('../schema/status');
const usersServices = require('../services/usersServices');

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
  const emailExists = await usersServices.findUserByEmail(email);
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(status.badRequest).json({ message: message.invalidEmail });
  }
  if (!email) {
    return res.status(status.badRequest).json({ message: message.requiredEmail });
  }
  if (emailExists) {
    return res.status(status.conflict).json({ message: message.existsEmail });
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;  
  if (password.length < 6) {
    return res.status(status.badRequest).json({ message: message.passwordSize });
  }
  if (!password) {
   return res.status(status.badRequest).json({ message: message.requiredPassword });
  }
  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
};
