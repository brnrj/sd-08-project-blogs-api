const { Categories } = require('../models');

const addCategory = async (name) => {
  const data = await Categories.create({ name });
  return data;
};

const getCategories = async () => {
  const data = await Categories.findAll();
  return data;
};

module.exports = {
  addCategory,
  getCategories,
};