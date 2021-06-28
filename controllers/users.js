const { User } = require('../models');
const UserServices = require('../services/users');

const add = async (req, res) => {
  const { body } = req;
  const token = await UserServices.add(body);
  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  try {
    const response = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!response) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Internal Error' });
  }
};

module.exports = {
  add,
  getAll,
  getById,
};
