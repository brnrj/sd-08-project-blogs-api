const Category = require('../../database/models/Categories');
const { MissingParamError, CategoryNotFoundError } = require('../errors');

const categoryIdsValidator = async (...categoryIds) => {
  const isCategoryValid = await Promise.all(categoryIds.map(async (categoryId) => {
    if (!categoryId) throw new MissingParamError('categoryIds');
    const categories = await Category.findAll({ where: { id: categoryId } });
    return categories;
  }));
  if (isCategoryValid[0].length === 0) throw new CategoryNotFoundError();
};

module.exports = categoryIdsValidator;