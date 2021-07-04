const boom = require('@hapi/boom');
const { Category } = require('../../database/models');
const CategorySchema = require('../../schema/category');

module.exports = async (newCategory) => {
  const { error } = CategorySchema.validate(newCategory);

  if (error) throw error;

  const user = await Category.findOne({ where: { name: newCategory.name } });

  if (user) throw boom.conflict('Category already registered');

  return Category.create({ ...newCategory });
};
