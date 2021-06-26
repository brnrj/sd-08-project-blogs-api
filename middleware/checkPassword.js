const checkPasswordExist = (password) => !!password;
const checkPasswordLength = (password) => password.length >= 6;

function checkPassword(req, res, next) {
  const { password } = req.body;
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