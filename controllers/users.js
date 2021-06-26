const UserServices = require('../services/users');

const add = async (req, res) => {
  const { body } = req;

  const token = await UserServices.add(body);

  return res.status(201).json({ token });
};

module.exports = {
  add,
};
