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

module.exports = { getAllUsers, createUser };
