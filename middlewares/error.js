const { STATUS } = require('../constants');

const ERRORS = {
  invalidData: STATUS.BAD_REQUEST,
  conflict: STATUS.CONFLICT,
  invalidLogin: STATUS.UNAUTHORIZED,
  missingToken: STATUS.UNAUTHORIZED,
  invalidToken: STATUS.UNAUTHORIZED,
  invalidRecipe: STATUS.BAD_REQUEST,
  notFound: STATUS.NOT_FOUND,
  accessDenied: STATUS.UNAUTHORIZED,
  forbidden: STATUS.FORBIDDEN,
};

const INTERNAL_ERROR = 500;

module.exports = (err, _req, res, _next) => {
  if (!err.err) {
    return res
      .status(STATUS.INTERNAL_ERROR)
      .json({ message: 'Internal error' }); 
  }

  const { err: error } = err;

  const statusCode = ERRORS[error.code] || INTERNAL_ERROR;

  res.status(statusCode).json({ message: error.message });
};
