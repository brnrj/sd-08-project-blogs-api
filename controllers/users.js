const UserServices = require('../services/users');

const add = async (req, res) => {
  const { body } = req;
  const token = await UserServices.add(body);
  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const response = await UserServices.getAll();
  res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await UserServices.getById(id);
  res.status(200).json(response);
};

module.exports = {
  add,
  getAll,
  getById,
};
