const validator = require('email-validator');

const BAD_REQUEST = 400;
const INVALID_EMAIL = { message: '"email" must be a valid email' };
const REQUIRED_EMAIL = { message: '"email" is required' };
const EMPTY_EMAIL = { message: '"email" is not allowed to be empty' };

const valEmail = (req, res, next) => {
  const { email } = req.body;
  if (email === '') return res.status(BAD_REQUEST).json(EMPTY_EMAIL);
  if (!email) return res.status(BAD_REQUEST).json(REQUIRED_EMAIL);
  if (!validator.validate(email)) return res.status(BAD_REQUEST).json(INVALID_EMAIL);
  next();
};

module.exports = valEmail;
