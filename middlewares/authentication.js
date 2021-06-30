const auth = require('../auth');
const CustomError = require('../utils/customError');

const { code, err, msg } = new CustomError();

const authentication = (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return next(err(msg.tokenNotExists, code.unauthorized));
    const compare = auth(token);
    if (!compare.payload) {
      return next(err(msg.invalidToken, code.unauthorized));
    }
    req.payload = compare.payload;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authentication;
