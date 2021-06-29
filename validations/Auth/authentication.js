const { MILLISECONDS_FACTOR, ERRORS } = require('../../utils/dictionary');
const { decoded } = require('../../utils/token');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { eTokenEmpty, eTokenInvalid } = ERRORS;

  if (!authorization) return res.status(eTokenEmpty.status).json({ message: eTokenEmpty.message });
  const userToken = decoded(authorization);
  if (!userToken) return res.status(eTokenInvalid.status).json({ message: eTokenInvalid.message });
  if (Date.now() >= (userToken.exp * MILLISECONDS_FACTOR)) {
    return res.status(eTokenInvalid.status).json({ message: eTokenInvalid.message });
  }
  next();
};
