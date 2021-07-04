// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
// const validation = require('../validation');
const jwt = require('../auth/tokenGeneratis');

const tokenValidate = (req, res, next) => {
  console.log('valida token');
  // const { Authorization } = req.headers;
  const token = req.headers.authorization;
  // console.log(token);
  if (!token) {
    // console.log('sem token');
    return res.status(Number(process.env.STATUS_UNAUTHORIZED)).json({ message: 'Token not found' });
  }
  const isValid = jwt.tokenVerify(token);
  // console.log(isValid);
  if (!isValid) {
    // console.log('token não  valido');
    return res.status(Number(process.env.STATUS_UNAUTHORIZED)).json(
      { message: 'Expired or invalid token' },
);
  }
  // console.log('token valido');
  next();
};

module.exports = tokenValidate;