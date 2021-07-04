const { User } = require('../models');

async function FindUser(req, res, next) {
  const url = req.originalUrl;
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

if (url === '/user' && user) {
    return res.status(409).json({ message: 'User already registered' });
}

if (url === '/login' && !user) {
    return res.status(400).json({ message: 'Invalid fields' });
}
  next();
}

module.exports = FindUser;
