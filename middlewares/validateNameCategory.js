const { StatusCodes } = require('http-status-codes');

const validCategoryName = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined || name === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"name" is required',
    });
  }
  next();
};

module.exports = {
  validCategoryName,
};
