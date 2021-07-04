const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const userService = require('../../services/userService');

const secret = process.env.JWT_SECRET;

const validToken = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userService.findByEmail(decoded.data.mail);

    if (user) {
      const { password, ...authenticatedUser } = user;
      req.user = authenticatedUser;
    }

    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Expired or invalid token' });
  }
};
module.exports = {
  validToken,
};
