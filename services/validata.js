const STATUS_400 = 400;

const validName = (name) => { 
  if (name && name.length < 8) return '"displayName" length must be at least 8 characters long';
  return false;
};

const validEmail = (email) => {
  const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  if (email === undefined) return '"email" is required';
  const test = regex.test(email);
  if (test === false) return '"email" must be a valid email';
  return false;
};

const validPassword = (password) => {
  if (!password) return '"password" is required';
  if (password.length < 6) return '"password" length must be 6 characters long';
  return false;
};

const validata = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const userValidation = validName(displayName) || validEmail(email)
    || validPassword(password) || false;
  if (userValidation) return res.status(STATUS_400).json({ message: userValidation });
  next();
};

module.exports = {
  validata,
};
