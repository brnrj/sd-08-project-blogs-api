const STATUS_400 = 400;

const validName = (name) => {
  let message = '';
  if (name.length < 8) message = '"displayName" length must be at least 8 characters long';
  if (!message) return false;
  return message;
};

const validEmail = (email) => {
  const regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  let message = '';
  if (!regex.test(email)) message = '"email" must be a valid email';
  if (!email) message = '"email" is required';
  if (!message) return false;
  return message;
};

const validPassword = (password) => {
  let message = '';
  if (!password) message = '"password" is required';
  if (password && password.length < 6) message = '"password" length must be 6 characters long';
  if (!message) return false;
  return message;
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
