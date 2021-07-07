const requestError = 400;

const emailValidation = (email) => {
  if (email === '') {
    return '"email" is not allowed to be empty';
  }
  if (!email) {
    return '"email" is required';
  }
  return false;
};

const passwordValidation = (password) => {
  if (password === '') {
    return '"password" is not allowed to be empty';
  }
  if (!password) {
    return '"password" is required';
  }
  return false;
};

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const validation = emailValidation(email) || passwordValidation(password) || false;
  if (validation) {
    return res.status(requestError).json({ message: validation });
  }
  next();
};
