const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const helpers = require('../../helpers/helpers');
require('dotenv').config();

const msg = 'Expired or invalid token';
const msg1 = 'Token not found';

const validateJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(helpers.QOU).json({ message: msg1 });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const exists = await User.findOne({ where: { email } });
    
    if (!exists) return res.status(helpers.QOO).json({ message: msg });
    
    req.users = decoded;

    next();
  } catch (err) {
    return res.status(helpers.QOU).json({ message: msg });
  }
};

module.exports = validateJwt;
