const {
  nameValidation,
  emailValidation,
  passwordValidation,
} = require('../middlewares/validations');

const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const validation = nameValidation(displayName) || emailValidation(email)
    || passwordValidation(password) || false;
  if (validation) return res.status(400).json({ message: validation });
  next();
};

module.exports = {
  userValidation,
};