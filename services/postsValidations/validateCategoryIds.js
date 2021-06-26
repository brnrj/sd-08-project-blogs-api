const { Category } = require('../../models');

const validateCategoryIds = async (categoryIds) => {
  if (categoryIds === undefined) {
    return { err: { status: 400, message: '"categoryIds" is required' } };
  }
  const categories = await Category.findAll();
  const idsCategory = categories.map((category) => category.dataValues.id);
  const existCategories = categoryIds.every((id) => idsCategory.includes(id));

  if (!existCategories) {
    return { err: { status: 400, message: '"categoryIds" not found' } };
  }
  return {};
};

module.exports = validateCategoryIds;
