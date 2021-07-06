const isEmailValid = (email) => /.+@.+\.com.*/.test(email);

const BAD_REQUEST = 400;

const validateDisplayName = (displayName) => (displayName && displayName.length >= 8);
const validateEmail = (email) => {
  if (!email) {
    return '"email" is required';
  }
  if (!isEmailValid(email)) return '"email" must be a valid email';
};
const validatePassword = (password) => {
  if (!password) {
    return '"password" is required';
  }
  if (password.length < 6) return '"password" length must be 6 characters long';
};

const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  console.log(displayName, email, password);
  let message;
  if (!validateDisplayName(displayName)) {
    message = '"displayName" length must be at least 8 characters long';
  }
  message = message || validateEmail(email) || validatePassword(password);
  if (message) return res.status(BAD_REQUEST).send({ message }); 
  next();
};

module.exports = userValidation;
