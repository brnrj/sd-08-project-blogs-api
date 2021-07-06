require('dotenv/config');

const { Category } = require('../models/index.js');

const checkName = async (name) => {
  if (!name) throw new Error('"name" is required');

  return null;
};

const createCategory = async (name) => {
  await Category.create({ name });
  const category = await Category.findOne({ where: { name } });

  return category;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = { checkName, createCategory, getAllCategories };