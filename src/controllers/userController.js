const serviceUser = require('../services/userService');

async function getAllUsers(req, res) {
  const user = await serviceUser.getAllUsers();
  res.status(200).json(user);
}

function createUser(req, res) {
  const user = req.body;
  const userCreated = serviceUser.createUser(user);
  res.status(201).send(userCreated);
}

module.exports = { getAllUsers, createUser };
