const categoryServices = require('../services/category');

const createCategory = (req, res) => {
  const category = req.body;

  categoryServices.createCategory(category)
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log(err.message, 'catch categody services');
      const { code, message } = JSON.parse(err.message);
    
      res.status(code).json({ message });
    });
};

const getCategories = (req, res) => {
  categoryServices.getCategories()
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json(err.message));
};

module.exports = {
  createCategory,
  getCategories,
};