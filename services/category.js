const { Category } = require('../models/index.js');

const isValidName = (name) => {
  if (!name) return '"name" is required';
  return undefined;
};

const createCategory = async (name) => {
  const validName = isValidName(name);
  if (validName) throw new Error(validName);

  await Category.create({ name });

  const findNewCat = await Category.findOne({ where: { name } });
 
  return findNewCat;
};

module.exports = {
  createCategory,
};
