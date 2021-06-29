const Services = require('../services');

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const data = await Services.createUser(body);
    res.status(201).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;
    const newLogin = await Services.login(body);
    res.status(200).json(newLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await Services.getAllUsers();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Services.getUserById(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  findById,
};