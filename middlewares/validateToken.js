const { UNAUTHORIZED } = require('../common/constants/statusCodes');
const { MISSING_TOKEN, INVALID_TOKEN } = require('../common/constants/statusMessages');
const { convertToken } = require('../validations/token');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: MISSING_TOKEN });
  }
  try {
    const isValid = convertToken(token);
    req.userData = isValid.data;
  } catch (_error) {
    return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });
  }
  next();
};

module.exports = validateToken;
