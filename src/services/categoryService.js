const { Category } = require('../../models');

const addCategory = async (categoryName) => {
  const addedCategory = await Category.create({ name: categoryName });
  return addedCategory;
};

module.exports = {
  addCategory,
};
