const { Op } = require('sequelize');
const { hash } = require('bcryptjs');
const { User } = require('../models');
const HandleError = require('../http/errors/HandleError');

exports.createUser = async ({ displayName, email, password, image = 'any' }) => {
  const userExists = await User.findAll({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
  if (userExists.length !== 0) throw new HandleError('User already registered', 409);
  const hashedPassword = await hash(password, 8);
  const user = await User.create({ displayName, email, password: hashedPassword, image });
  return user;
};

exports.findUsers = async () => {
  const user = await User.findAll();
  if (user.length === 0) throw new HandleError('User already registered');
  return user;
};
