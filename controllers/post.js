const PostSevices = require('../services/post');

const add = async (req, res) => {
  const { body, user: { dataValues: userData } } = req;
  const response = await PostSevices.add(body, userData);
  res.status(201).json(response);
};

const getAll = async (req, res) => {
  const response = await PostSevices.getAll();
  res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await PostSevices.getById(id);
  res.status(200).json(response);
};

module.exports = { 
  add,
  getAll,
  getById,
};