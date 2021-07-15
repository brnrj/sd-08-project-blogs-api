const { User } = require('../models');

const insertUser = async (data) => {
  const newUser = await User.create(data);
  console.log(newUser);
  return { status: 200, response: { message: data } };
};

module.exports = {
  insertUser,
};