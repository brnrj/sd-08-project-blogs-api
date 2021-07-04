const { Category } = require('../models');
const schema = require('../utils/schemaValidation');

const createCategory = async (newCategory) => {
  const { error } = schema.category.validate(newCategory);

  if (error) return { error };

  const category = await Category.create(newCategory);

  return category;
};

const findAllCategories = async () => {
  const categories = Category.findAll();

  return categories;
};

module.exports = { createCategory, findAllCategories };
