const jwt = require('jsonwebtoken');

const CODE_ERR = 401;
const segredo = 'betrybe';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  // const { token } = req.headers;

  if (!token) {
    return res.status(CODE_ERR).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(token, segredo);
    req.user = user;
    next();
  } catch (err) {
    return res.status(CODE_ERR).json({ message: 'Expired or invalid token' });
  }
};