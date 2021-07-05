require('dotenv').config({ path: './config.env' });
const jwt = require('../auth/tokenGeneratis');

const tokenValidate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.boom.unauthorized('Token not found');

    // return res.status(Number(process.env.STATUS_UNAUTHORIZED)).json({ message: 'Token not found' });
  }
  const isValid = jwt.tokenVerify(token);
  if (!isValid) {
    return res.boom.unauthorized('Expired or invalid token');
//     return res.status(Number(process.env.STATUS_UNAUTHORIZED)).json(
//       { message: 'Expired or invalid token' },
// );
  }
  next();
};

module.exports = tokenValidate;