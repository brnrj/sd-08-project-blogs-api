const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
require('dotenv/config');

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const createJWT = async (email) => {
    try {
      const response = await User.findOne({ where: { email } });
      
      const { displayName: nameBank, email: emailBank } = response;
      
      const token = jwt.sign({ data: { nameBank, emailBank } }, process.env.JWT_SECRET, jwtConfig);
      return token;
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
    createJWT,
};