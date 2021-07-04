const { StatusCodes } = require('http-status-codes');

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const emailValid = /^[A-Za-z0-9.-]+@[A-Za-z0-9]+(\.[A-Za-z]{3}|\.[A-Za-z]{3}\.[A-Za-z]{2})$/.test(
      email,
    );
  if (email === '' || email === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"email" is required' });
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
