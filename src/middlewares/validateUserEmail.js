const { BAD_REQUEST } = require('../errors/status');

const validateEmail = (email) => {
  if (!email || email.length === 0) {
    return 'required';
  }

  const emailRegex = /\w+@(\w+\.)+\w+$/i;
  const emailIsValid = emailRegex.test(email);

  if (!emailIsValid) {
    return 'valid';
  }
};

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const emailValdid = validateEmail(email);

  if (emailValdid === 'required') {
      return res.status(BAD_REQUEST).json({ message: '"email" is required' });
  } 
  if (emailValdid === 'valid') {
    return res.status(BAD_REQUEST).json({ message: '"email" must be a valid email' });
  } 

  next();
};
