const { Category } = require('../models');
const { create } = require('../services/categorieService');

const getAllCategory = async (req, res) => {
  const { name } = req.body;
  const allPosts = await Category.findAll(req.body);

  res.status(201).json(allPosts);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const createC = await create({ name })

  if (!createC) return res.status(404).json({ message: 'Produto não encontrado' });

  res.status(201).json(postById);
};

module.exports = {
  getAllCategory,
  createCategory,
};