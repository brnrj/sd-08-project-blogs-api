const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

module.exports = async (req, _res, next) => {
  try {
    // console.log(req);
    const token = req.headers.authorization;
    if (!token) {
      const err = new Error('Token not found');
      err.statusCode = 401;
      return next(err);
    }
    const { email, password } = jwt.verify(token, JWT_SECRET);
  
    const user = await User.findOne({ where: { email, password } });
    if (!user) throw Error();
    
    req.user = user.id;
  
    return next();
  } catch (err) {
    err.statusCode = 401;
    err.message = 'Expired or invalid token';
    return next(err);
  }
};
