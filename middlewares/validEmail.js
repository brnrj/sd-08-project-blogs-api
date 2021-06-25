const message = require('../helpers/errorMessages');

const validRegex = (email) => {
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
  const validReg = emailRegex.test(email);
  const restrictEmailRegex = /@gmail.com/i;
  const validRestrictEmail = restrictEmailRegex.test(email);

  // if (!validReg) {
  //   return false;
  // }

  if (!validReg || !validRestrictEmail) {
    return false;
  }

  return true;
};

const validEmail = (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json({ message: message.emailEmptyError });
  }
  
  if (!email) {
    return res.status(400).json({ message: message.emailReqError });
  }

  if (!validRegex(email)) {
    return res.status(400).json({ message: message.emailValidError });
  }

  next();
};

module.exports = validEmail;
