const { getToken } = require('../middleware');
const { User } = require('../models');

async function login(body) {
  const { email } = body;
  const data = await User.findOne({ where: { email } });
  if (!data) throw new Error('Invalid fields');
  return getToken(data);
}

module.exports = {
  login,
};