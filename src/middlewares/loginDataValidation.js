const { User } = require('../models');
const { loginValidation } = require('../services/dataValidations');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const validation = loginValidation(email, password);
  if (validation) return res.status(validation.code).json({ message: validation.message });

  const user = await User.findOne({
    where: { email },
  });
  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  req.body.id = user.id;

  next();
};
