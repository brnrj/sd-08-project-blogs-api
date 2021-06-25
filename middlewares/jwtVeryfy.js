const tokenService = require('../services/token');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  tokenService(token)
  .then(() => next())
  .catch((err) => {
    if (err.message === 'Token not found') {
      return res.status(401).json({ message: 'Token not found' });
    }
    console.log({ err });
    return res.status(401).json({ message: 'Expired or invalid token' });
  });
};