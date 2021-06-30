const errors = require('./errorMessages');
const { Categories } = require('../models');
// Categories

const createCategory = async (name) => {
  if (!name) return errors.nameIsRequired;
  const newCategory = await Categories.create({
    name,
  });
  return newCategory;
};

const showCategories = async () => Categories.findAll();

module.exports = {
  createCategory,
  showCategories,
};