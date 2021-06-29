const Services = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
      console.log(name);
      const data = await Services.createCategorie(name);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Services.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
}; 
