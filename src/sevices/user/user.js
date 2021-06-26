const { User } = require('../../models');

const {
  validUser,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validUser.validate(data);
  if (error) return { status: 400, message: error.details[0].message };

  const { email } = data;
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) return { status: 409, message: 'User already registered' };

  const result = await User.create(data);
  return result;
};

module.exports = {
  createServices,
};
