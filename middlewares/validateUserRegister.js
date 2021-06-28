const codes = require('../services/codes');
const errors = require('../services/errorMessages');

const validateName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(codes.BAD_REQUEST).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const emailValidate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const resultValidateEmail = emailValidate.test(email);

  if (email === '') {
    return res.status(codes.BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }

  if (!email) {
    return res.status(codes.BAD_REQUEST).json({
      message: '"email" is required',
    });
  }

  if (!resultValidateEmail) {
    return res.status(codes.BAD_REQUEST).json({
      message: '"email" must be a valid email',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(codes.BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });
  }

  if (!password) {
    return res.status(codes.BAD_REQUEST).json({
      message: '"password" is required',
    });
  }

  if (password.length < 6) {
    return res.status(codes.BAD_REQUEST).json({
      message: '"password" length must be 6 characters long',
    });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(errors.tokenNotFound.statusCode).json(errors.tokenNotFound);
  }

  console.log(authorization);
  
  // const teste = await testToken(authorization);

  // console.log(await testToken(authorization));

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateToken,
};