const { responseCode } = require('../utils/responseCode');

module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(responseCode.BAD_REQUEST).json({ message: err.details[0].message });
  }

  if (err.isBoom) {
  const { statusCode, payload: { message } } = err.output;

  return res.status(statusCode).json({ message });
  }

  return res.status(responseCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};
