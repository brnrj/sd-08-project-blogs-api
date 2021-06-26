const { Categories } = require('../models');

const categoryCreate = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) res.status(400).json({ message: '"name" is required' });
   const categorie = await Categories.create({ name });
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
   const categorie = await Categories.findAll();
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { categoryCreate, getAllCategories };