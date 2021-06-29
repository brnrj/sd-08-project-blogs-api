const { ERRORS } = require('../../utils/dictionary');
const displayNameValidation = require('./displayNameValidation');
const emailValidation = require('./emailValidation');
const passwordValidation = require('./passwordValidation');

module.exports = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { eDisplayLength, eEmailInvalid, ePasswordLength } = ERRORS;

  if (!displayNameValidation(displayName)) {
    return res.status(eDisplayLength.status).json({ message: eDisplayLength.message });
  }
  if (!emailValidation(email)) { 
    return res.status(eEmailInvalid.status).json({ message: eEmailInvalid.message });
  }
  if (!passwordValidation(password)) {
    return res.status(ePasswordLength.status).json({ message: ePasswordLength.message });
  }
  next();
};
