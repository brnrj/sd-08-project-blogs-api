const { Category } = require('../models');

const getAllCategory = async (_req, res) => {
  const allPosts = await Category.findAll();

  res.status(200).json(allPosts);
};

const getCategoryById = async (req, res) => {
  const postById = await Category.findByPk(req.params.id);

  if (!postById) return res.status(404).json({ message: 'Produto não encontrado' });

  res.status(201).json(postById);
};

module.exports = {
  getAllCategory,
  getCategoryById,
};