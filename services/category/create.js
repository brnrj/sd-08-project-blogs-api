const { Category } = require('../../models');

module.exports = async (newCategory) => {
  const { id, name } = await Category.create(newCategory);

  return { id, name };
};