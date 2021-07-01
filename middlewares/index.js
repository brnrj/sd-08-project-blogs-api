const { User } = require('../models');

const BAD_REQUEST = 400;

const validateName = (displayName) => {
    if (displayName.length < 8) return '"displayName" length must be at least 8 characters long';
    return false;
  };
  
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (!email) return '"email" is required';
    if (!regex.test(email)) return '"email" must be a valid email';
    return false;
  };
  
  const validatePassword = (password) => {
    if (!password) return '"password" is required';
    if (password.length < 6) return '"password" length must be 6 characters long';
    return false;
  };

const userValidation = (req, res, next) => {
    const { displayName, email, password } = req.body;
    const validation = validateName(displayName) || validateEmail(email)
    || validatePassword(password) || false;
    if (validation) return res.status(BAD_REQUEST).json({ message: validation });
    next();
};

module.exports = {
    userValidation,
};