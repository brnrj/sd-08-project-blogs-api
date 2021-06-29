const checkPasswordLength = (password) => password.length >= 6;
const EMPTY = { message: '"password" is not allowed to be empty' };
const VALID = { message: '"password" is required' };
const CHARACTER = { message: '"password" length must be 6 characters long' };
const BAD_REQUEST = 400;

function validatePass(req, res, next) {
  const { password } = req.body;

  if (password === '') {
    return res.status(BAD_REQUEST).json(EMPTY);
  }
  if (!password) {
    return res.status(BAD_REQUEST).json(VALID);
  }
  if (!checkPasswordLength(password)) {
    return res.status(BAD_REQUEST).json(CHARACTER);
  }
  next();
}

module.exports = {
  validatePass,
};