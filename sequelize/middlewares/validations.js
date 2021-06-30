const { Users } = require('../models');

const userExists = async (req, res, _next) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
};

module.exports = {
  userExists,
};