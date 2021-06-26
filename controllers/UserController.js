const UserService = require('../services/UserService.js');
const { Users } = require('../models');
const message = require('../helpers/errorMessages');
const tokenGen = require('../services/tokenGenerator');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  if (!UserService.validData(displayName)) {
    return res.status(400).json({ message: message.displayNameError });
  }

  const userAlready = await Users.findOne({ where: { email } });

  if (userAlready) {
    return res.status(409).json({ message: message.userAlreadyError });
  }

  await Users.create({ 
    displayName,
    email,
    password,
    image,
  });

  const token = tokenGen(email);

  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await Users.findAll({ attributes:
    { exclude: ['createdAt', 'updatedAt'] } });

  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne(
    { attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { id } },
  );

  if (!user) {
    return res.status(404).json({ message: message.userIsNotError });
  }

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  await Users.destroy({ where: { id } });

  res.status(204).json();
};

module.exports = {
  create,
  getAll,
  getById,
  deleteUser,
};
