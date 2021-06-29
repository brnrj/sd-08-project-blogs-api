const { User } = require('../models');

const decodeToken = require('../helper/decodeToken');

const isTokenValid = async (token) => {
  if (!token) throw new Error('Token not found');

  const { data: { email } } = decodeToken(token);

  const userExists = await User.findOne({ where: { email } });

  if (!userExists) throw new Error('Expired or invalid token');
};

module.exports = isTokenValid;