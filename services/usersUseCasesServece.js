const { Op } = require('sequelize');
// const { hash } = require('bcryptjs');
const { signToken } = require('../config/jwtConfig');
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
  // const hashedPassword = await hash(password, 8);
  // const user = await User.create({ displayName, email, password: hashedPassword, image });
  const user = await User.create({ displayName, email, password, image });
  return user;
};

exports.authorizationUser = async ({ email, password }) => {
  const [user] = await User.findAll({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
  // if (!user || !(await compare(password, user.password))) {
  if (!user || password !== user.password) {
    throw new HandleError('Invalid fields');
  }

  const token = await signToken({ user: {
    id: user.id,
    email: user.email,
  } });

  return { token };
};

exports.findByUser = async ({ id }) => {
  const [user] = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  if (!user) throw new HandleError('User does not exist', 404);
  return user;
};
