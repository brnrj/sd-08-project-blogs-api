const { StatusCodes } = require('http-status-codes');

const validDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  const MIN_LENGTH_NAME = 8;
  if (displayName === undefined || displayName.length < MIN_LENGTH_NAME) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

module.exports = {
  validDisplayName,
};
