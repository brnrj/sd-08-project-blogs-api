const codes = require('../services/codes');

const validateEmailLogin = (req, res, next) => {
  const { email } = req.body;

  const emailValidate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const resultValidateEmail = emailValidate.test(email);
  if (email === '') {
    return res.status(codes.BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }
  
  if (!email) {
    return res.status(codes.BAD_REQUEST).json({ message: '"email" is required' });
  }
  
  if (!resultValidateEmail) {
    return res.status(codes.BAD_REQUEST).json({ message: '"email" should be valid' });
  }
  
  next();
};

const validatePasswordLogin = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(codes.BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });
  }

  if (!password) {
    return res.status(codes.BAD_REQUEST).json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res.status(codes.BAD_REQUEST).json({ message: '"password" should be valid' });
  }

  next();
};

module.exports = {
  validateEmailLogin,
  validatePasswordLogin,
};