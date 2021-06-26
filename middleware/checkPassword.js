const checkPasswordExist = (password) => !!password;
const checkPasswordLength = (password) => password.length >= 6;
const checkPasswordEmpty = (password) => (password !== '');

function checkPassword(req, res, next) {
  const { password } = req.body;

  if (!checkPasswordEmpty(password)) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!checkPasswordExist(password)) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (!checkPasswordLength(password)) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
}

module.exports = {
  checkPassword,
};