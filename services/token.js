const jwt = require('jsonwebtoken');

const tokenCreate = (req, _res, next) => {
  const { email } = req.body;
  const jwtConfig = {
    expiresIn: '12h',
    algorithm: 'HS256',
};
  const token = jwt.sign(
    { email }, 
    process.env.JWT_SECRET, 
    jwtConfig,
  );  
  req.userToken = token;
next();
};

module.exports = {
  tokenCreate,
};
