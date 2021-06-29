const { Users } = require('../models');

const createNewUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await Users.create({ displayName, email, password, image });
    res.status(201).json(newUser);
  } catch (e) {
    if (e.errors[0].message.includes('unique')) {
      return next({
      status: 409,
      message: 'User already registered',
      });
    }
    return next(e.message);
  }
};

const getAllUsers = async (req, res, _next) => {
  const users = await Users.findAll();
  res.status(200).json(users);
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findByPk(parseInt(id, 10));
  if (!user) return next({ status: 404, message: 'User does not exist' });
  return res.status(200).json(user);
};

const deleteUser = async (req, res, _next) => {
  const { id } = req.user;
  await Users.destroy({ where: { id } });
  res.status(204).send();
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUser,
  deleteUser,
};