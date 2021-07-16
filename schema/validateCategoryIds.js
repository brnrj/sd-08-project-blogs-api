const { Categories } = require('../models');

module.exports = async (categoryIds) => {
  const categories = await Categories.findAll();
  const categoriesIds = categories.map((cat) => cat.id);

  if (categoriesIds.length === 0) return { status: 400, message: 'No "categories" created' };

  const categoriesExist = categoryIds.every((cat) => categoriesIds.includes(cat));
  if (!categoriesExist) {
    return { status: 400, message: '"categoryIds" not found' };
  }
  return undefined;
};
