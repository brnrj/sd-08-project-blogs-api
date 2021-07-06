const { BAD_REQUEST } = require('../errors/status');

module.exports = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(BAD_REQUEST).json({ message: '"name" is required' });

  next();
};