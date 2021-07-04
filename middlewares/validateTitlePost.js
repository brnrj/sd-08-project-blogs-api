const { StatusCodes } = require('http-status-codes');

const validTitlePost = (req, res, next) => {
  const { title } = req.body;
  if (title === undefined || title === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"title" is required',
    });
  }
  next();
};

module.exports = {
  validTitlePost,
};
