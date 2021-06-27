const validator = require('email-validator');

const BAD_REQUEST = 400;
// const CONFLICT = 409;
const INVALID_EMAIL = { message: '"email" must be a valid email' };
const REQUIRED_EMAIL = { message: '"email" is required' };
// const USER_EXISTS = { message: 'User already registered' };

const valEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(BAD_REQUEST).json(REQUIRED_EMAIL);
  if (!validator.validate(email)) return res.status(BAD_REQUEST).json(INVALID_EMAIL);
  // if (await user.findEmail(email)) return res.status(CONFLICT).json(USER_EXISTS); */
  next();
};

module.exports = valEmail;
