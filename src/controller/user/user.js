const rescue = require('express-rescue');
const helpers = require('../../helpers/helpers');

const {
  createServices,
} = require('../../sevices/user/user');

const createUser = rescue(async (req, res, next) => {
  console.log(helpers.DOU);
  const { displayName, email, password, image } = req.body;
  const user = await createServices({ displayName, email, password, image });
  if (user.status) return next(user);
  res.status(helpers.DOU).json({ user });
});

module.exports = {
  createUser,
};
