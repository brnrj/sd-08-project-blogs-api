const { userSchema } = require('../schema/UserSchema');
const { userExists } = require('./validations');

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

module.exports = {
  validateUserRegister,
};