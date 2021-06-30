const {
  usersServices: {
    existsToken,
    testToken,
  },
} = require('../services');
const codes = require('../services/codes');

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

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization) {
      const result = await existsToken();
      return res.status(result.statusCode).json(result.error);
    }
    
    await testToken(authorization);
  } catch (error) {
    console.error(error.message);
    return res.status(codes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateToken,
};