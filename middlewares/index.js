const BAD_REQUEST = 400;

const displayNameValidation = (displayName) => {
  if (displayName.length < 8) return '"displayName" length must be at least 8 characters long';
  return false;
};

const emailValidation = (email) => {
  // reference: https://ui.dev/validate-email-address-javascript/
  const regex = /\S+@\S+\.\S+/;
  if (!email) return '"email" is required';
  if (!regex.test(email)) return '"email" must be a valid email';
  return false;
};

const passwordValidation = (password) => {
  if (!password) return '"password" is required';
  if (password.length < 6) return '"password" length must be 6 characters long';
  return false;
};

const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const validation = displayNameValidation(displayName) || emailValidation(email)
    || passwordValidation(password) || false;
  if (validation) return res.status(BAD_REQUEST).json({ message: validation });
  next();
};

const emailValid = (email) => {
  if (email === '') return '"email" is not allowed to be empty';
  if (!email) return '"email" is required';
  return false;
};

const passwordValid = (password) => {
  if (password === '') return '"password" is not allowed to be empty';
  if (!password) return '"password" is required';
  return false;
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const validation = emailValid(email) || passwordValid(password) || false;
  if (validation) return res.status(BAD_REQUEST).json({ message: validation });
  next();
};

module.exports = {
  userValidation,
  loginValidation,
};
