const jwt = require('jsonwebtoken');
const { User } = require('../models');
const userData = require('./validations/users/userData');

const { JWT_SECRET } = process.env;

const createUser = async (displayName, email, password, image) => {
  try {
    const userDateValidate = await userData(displayName, email, password);
    if (userDateValidate.err) return userDateValidate;
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const user = { displayName, email, password, image };
    const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);
    
    await User.create({ displayName, email, password, image });
    return { token };
  } catch (e) {
    return { message: 'Algo de errado aconteceu...' };
  }
};

module.exports = {
  createUser,
};
