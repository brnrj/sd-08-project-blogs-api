const { verifyToken } = require('./jwtValidation');

const checkTokenExist = (token) => !!token;
const checkTokenValid = (token) => {
  try {
    return !!verifyToken(token);
  } catch (error) {
    console.log(error);
  }
};

function checkToken(req, res, next) {
  const { authorization: token } = req.headers;
  if (!checkTokenExist(token)) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (!checkTokenValid(token)) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
}

module.exports = {
  checkToken,
};