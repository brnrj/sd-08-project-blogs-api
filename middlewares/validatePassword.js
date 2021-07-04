const { StatusCodes } = require('http-status-codes');

const validPassword = (req, res, next) => {
  const { password } = req.body;
  const MIN_LENGTH_PASS = 6;
  if (password && password.length < MIN_LENGTH_PASS) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"password" length must be 6 characters long',
    });
  }
  if (password === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"password" is required' });
  }
  if (password === '') {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

module.exports = {
  validPassword,
};
