const boom = require('@hapi/boom');

const { User } = require('../models');
const { decodeToken } = require('../utils/handleToken');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(boom.unauthorized('Token not found'));

  try {
    const decodedToken = decodeToken(token);
    const user = await User.findOne({ where: { email: decodedToken.data.email } });

    req.userId = user.id;

    return next();
  } catch (_err) {
    return next(boom.unauthorized('Expired or invalid token'));
  }
};
