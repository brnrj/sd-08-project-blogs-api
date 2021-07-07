const { User } = require('../models');
const requestError = 400;

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return res.status(requestError).json({ message: 'Invalid fields' });
  }
  next();
};
