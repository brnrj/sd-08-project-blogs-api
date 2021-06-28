const rescue = require('express-rescue');
const helpers = require('../../helpers/helpers');

const {
  createServices,
  loginServices,
} = require('../../sevices/user/user');

const createUser = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const user = await createServices({ displayName, email, password, image });
  if (user.status) return next(user);
  res.status(helpers.DOU).json({ user });
});

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const token = await loginServices({ email, password });
  if (token.status) return next(token);
  res.status(helpers.DOO).json({ token });
});

module.exports = {
  createUser,
  loginUser,
};
