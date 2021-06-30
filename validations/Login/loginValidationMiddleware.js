const { ERRORS } = require('../../utils/dictionary');
const emptyEmailValidation = require('./emptyEmailValidation');
const emptyPasswordValidation = require('./emptyPasswordValidation');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const { eEmailEmpty, ePasswordEmpty, eLoginEmail, eLoginPassword } = ERRORS;

  if (email === undefined) {
    return res.status(eEmailEmpty.status).json({ message: eEmailEmpty.message });
  }
  if (password === undefined) {
    return res.status(ePasswordEmpty.status).json({ message: ePasswordEmpty.message });
  }
  if (!emptyEmailValidation(email)) {
    return res.status(eLoginEmail.status).json({ message: eLoginEmail.message });
  }
  if (!emptyPasswordValidation(password)) {
    return res.status(eLoginPassword.status).json({ message: eLoginPassword.message });
  }
  next();
};
