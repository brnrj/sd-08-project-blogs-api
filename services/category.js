const { Category } = require('../models');

async function createCategory(name) {
  const newCategory = await Category.create({ name });
  return newCategory;
}

async function getCategories() {
  const data = await Category.findAll();
  return data;
}

module.exports = {
  createCategory, getCategories,
};