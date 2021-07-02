const { Categories } = require('../models');

const addCategory = async (name) => {
  const data = await Categories.create({ name });
  return data;
};

module.exports = {
  addCategory,
};