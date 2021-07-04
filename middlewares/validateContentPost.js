const { StatusCodes } = require('http-status-codes');

const validContentPost = (req, res, next) => {
  const { content } = req.body;
  if (content === undefined || content === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"content" is required',
    });
  }
  next();
};

module.exports = {
  validContentPost,
};
