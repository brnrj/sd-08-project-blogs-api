const { Category } = require('../../models');

const addCategory = async (categoryName) => {
  const addedCategory = await Category.create({ name: categoryName });
  return addedCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll({});
  return allCategories;
};

module.exports = {
  addCategory,
  getAllCategories,
};
