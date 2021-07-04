const { Category } = require('../models');

const GetCategoriesMiddleware = async (req, res) => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  });

  return res.status(200).json(categories);
};

module.exports = GetCategoriesMiddleware;