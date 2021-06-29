const { Category } = require('../../models');

const createCategory = async (name) => {
  const categoryCreated = await Category.create({ name });
  return categoryCreated;
};

const verifyValidation = (name) => {
  if (name === undefined) {
    return { message: '"name" is required' };
  }

  return true;
};

module.exports = {
  createCategory,
  verifyValidation,
};
