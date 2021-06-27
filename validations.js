const { Users } = require('./models');

/*  const validationUser = async (req, res, next) => {
  const emailRegex = /\S+@\S+\.\S+/;

  const { displayName, email, password } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (user) res.status(409).json({ message: 'User already registered' });

const emailValid = emailRegex.test(email);

if (displayName.length < 8) {
 res.status(400)
 .json({ message: '"displayName" length must be at least 8 characters long' }); 
}
if (password.length > 6 || password.length < 6) res.status(400).json({ message: '"password" length must be 6 characters long' });

if (!password) res.status(400).json({ message: '"password" is required' });
if (!email) res.status(400).json({ message: '"email" is required' });
 if (!emailValid) res.status(400).json({ message: '"email" must be a valid email' });
next();
};
 */ 

const nameValidation = (displayName) => {
  if (displayName.length < 8) return '"displayName" length must be at least 8 characters long';
  return false;
};

const emailValidation = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (!email) return '"email" is required';
  if (!regex.test(email)) return '"email" must be a valid email';
};

const passValidation = (password) => {
  if (!password) return '"password" is required';
  if (password.length < 6) return '"password" length must be 6 characters long';
};

const userValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const validation = nameValidation(displayName) || emailValidation(email)
    || passValidation(password);
  if (validation) return res.status(400).json({ message: validation });
  const user = await Users.findOne({ where: { email } });
  if (user) return res.status(409).json({ message: 'User already registered' });
  next();
};

module.exports = { userValidation };