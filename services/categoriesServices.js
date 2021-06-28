const errors = require('./errorMessages');
const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) return errors.nameIsRequired;
  const newCategory = await Category.create({
    name,
  });
  return newCategory;
};

const showCategories = async () => Category.findAll();

module.exports = {
  createCategory,
  showCategories,
};