const { User } = require('../models');

async function FindUser(req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  // console.log(user);
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
}

module.exports = FindUser;