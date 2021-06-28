const { Category } = require('../models');

const createCategory = async (name) => {
  const category = await Category.create({ name });
  return category;
};

const findAllCategories = async () => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  });
  return categories;
};

module.exports = {
  createCategory,
  findAllCategories,
};
