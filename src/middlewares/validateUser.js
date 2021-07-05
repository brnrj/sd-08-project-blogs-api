const { User } = require('../database/models');

const { CONFLICT, BAD_REQUEST } = require('../errors/status');

const validatePassword = (password) => {
  if (!password) {
    return 'required';
  }
  if (password && password.length < 6) {
    return 'minLength';
  }
};

const validateName = (displayName) => {
  if (displayName && displayName.length < 8) {
    return 'minLength';
  }
};

module.exports = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const passwordValid = validatePassword(password);
  if (passwordValid === 'required') {
    return res.status(BAD_REQUEST).json({ message: '"password" is required' });
  } 
  if (passwordValid === 'minLength') {
    return res.status(BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  } 

  const nameValid = validateName(displayName);
  if (nameValid === 'minLength') {
    return res.status(BAD_REQUEST).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  } 

  const userByEmail = await User.findOne({ where: { email } });
  if (userByEmail) return res.status(CONFLICT).json({ message: 'User already registered' });

  next();
};
