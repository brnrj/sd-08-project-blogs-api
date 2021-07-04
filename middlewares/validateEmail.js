const { StatusCodes } = require('http-status-codes');

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const emailValid = /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/.test(
      email,
    );
  if (email === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST).json({ message: '"email" is required' });
  }
  if (email === '') {
    return res
      .status(StatusCodes.BAD_REQUEST).json({ message: '"email" is not allowed to be empty' });
  }
  if (emailValid === false) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

module.exports = {
  validEmail,
};
