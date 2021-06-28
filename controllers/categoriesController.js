const { Categories } = require('../models');

const categoryCreate = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
   const categorie = await Categories.create({ name });
    return res.status(201).json(categorie);
  } catch (error) {
   return res.status(500).json(error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
   const categorie = await Categories.findAll();
   return res.status(200).json(categorie);
  } catch (error) {
   return res.status(500).json(error.message);
  }
};

module.exports = { categoryCreate, getAllCategories };