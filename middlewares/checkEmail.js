const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
const EMPTY = { message: '"email" is not allowed to be empty' };
const REQUIRED = { message: '"email" is required' };
const VALID = { message: '"email" must be a valid email' };
const BAD_REQUEST = 400;

const verifyEmail = (email) => regex.test(email);

function validateEmail(req, res, next) {
  const { email } = req.body;

  if (email === '') {
    return res.status(BAD_REQUEST).json(EMPTY);
  }
  if (!email) {
    return res.status(BAD_REQUEST).json(REQUIRED);
  }
  if (!verifyEmail(email)) {
    return res.status(BAD_REQUEST).json(VALID);
  }
  next();
}

module.exports = {
  validateEmail,
};