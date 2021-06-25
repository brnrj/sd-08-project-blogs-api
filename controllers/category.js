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

module.exports = {
  createCategory,
};