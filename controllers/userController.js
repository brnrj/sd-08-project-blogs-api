const { User } = require('../models');
const { create, getUser } = require('../services/userService');

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const result = await create({ displayName, email, password });
    if (result !== true) {
      return res.status(result.status).json({ message: result.message });
    }  
    const createdU = await User.create({ displayName, email, password, image });
    return res.status(201).json(createdU);
};

const getAllUsers = async (_req, res) => {
  const getUsers = await User.findAll();

  return res.status(200).json(getUsers);
};

const getUserById = async (req, res) => {
  const { result, userById } = await getUser(req.params.id);

  if (result) {
    const { status, message } = result;
    return res.status(status).json({ message });
  }

  return res.status(200).json(userById);
};

const deleteUser = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: 'Usuário removido com sucesso' });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
