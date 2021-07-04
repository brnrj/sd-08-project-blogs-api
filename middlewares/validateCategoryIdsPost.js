const { StatusCodes } = require('http-status-codes');

const validCategoryIdsPost = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds === undefined || categoryIds === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"categoryIds" is required',
    });
  }
  next();
};

module.exports = {
  validCategoryIdsPost,
};
