const code = require('../utils/code');

module.exports = async (error, _req, res, _next) => {
  if (error.err && error.code) {
    return res.status(error.code).json(error.err);
  }
  return res.status(code.internalServerError).json({ message: error.message || 'Unknow error' });
};