const { Users } = require('../models');

const userExists = async (req, res, _next) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
};

const loginValidate = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email, password } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  res.locals.user = user.dataValues;
};

module.exports = {
  userExists,
  loginValidate,
};