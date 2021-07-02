const { User } = require('../models');
const { userValidation } = require('../services/dataValidations');

module.exports = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const validation = userValidation(displayName, email, password);
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const verifyIfExists = await User.findOne({ where: { email } });
  if (verifyIfExists) return res.status(409).json({ message: 'User already registered' });

  next();
};
