const { userSchema, loginSchema } = require('../schema/UserSchema');
const { userExists, loginValidate } = require('./validations');

const validateUserRegister = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    await userSchema.validate({ displayName, email, password });
    await userExists(req, res, next);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

const validateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await loginSchema.validate({ email, password });
    await loginValidate(req, res, next);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  validateUserRegister,
  validateLogin,
};