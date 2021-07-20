const { Users } = require('../models');
const { validEmail, validPassword, validDisplayName } = require('../services');

const validUser = async (req, res, next) => {
  const user = req.body;
  const validations = validEmail(user.email)
    || validDisplayName(user.displayName) || validPassword(user.password);

  if (validations !== true) {
    return res.status(400).json({ message: validations });
  }

  const userAlredyExist = await Users.findOne({ where: { email: user.email } });
  if (userAlredyExist) return res.status(409).json({ message: 'User already registered' });

  next();
};

module.exports = { validUser };
