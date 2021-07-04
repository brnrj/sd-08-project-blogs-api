const serviceUser = require('../services/userService');

async function getAllUsers(req, res) {
  const user = await serviceUser.getAllUsers();
  res.status(200).json(user);
}

function createUser(req, res) {
  const user = req.body;
  const { token } = req;
  serviceUser.createUser(user);
  res.status(201).json({ token });
}

function loginUser(req, res) {
  const { token } = req;
  res.status(200).json({ token });
}

async function getById(req, res) {
  const { id } = req.params;
  const userById = await serviceUser.getById(id);
  if (!userById) res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(userById);
}

module.exports = { getAllUsers, createUser, loginUser, getById };
