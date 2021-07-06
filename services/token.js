require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenCreate = (req, _res, next) => {
  const { email } = req.body;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    jwtConfig,
  );
  // console.log('midlewareToken', token);
  req.userToken = token;
next();
};

module.exports = {
  tokenCreate,
};
