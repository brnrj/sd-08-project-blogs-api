const { Categories } = require('../models');
const { User } = require('../models');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

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

const userRegistred = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  next();
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  if (token !== 'token') {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};

const titleValidation = (title) => {
  if (!title) return '"title" is required';
  return false;
};

const contentValidation = (content) => {
  if (!content) return '"content" is required';
  return false;
};

const categoryIdsValidation = (categoryIds) => {
  if (!categoryIds) return '"categoryIds" is required';
  return false;
};

const postValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const validation = titleValidation(title) || contentValidation(content)
    || categoryIdsValidation(categoryIds) || false;
  if (validation) return res.status(BAD_REQUEST).json({ message: validation });
  next();
};

const categoryValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Categories.findAll();
  const idsFromCategories = categories.map(({ id }) => id);
  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!idsFromCategories.includes(categoryIds[i])) {
      return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
    }
  }
  next();
};

module.exports = {
  userValidation,
  loginValidation,
  userRegistred,
  tokenValidation,
  postValidation,
  categoryValidation,
};
