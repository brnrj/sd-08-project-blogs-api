const boom = require('@hapi/boom');
const { Category: CategoryModel } = require('../models');
const CategorySchema = require('../schema/category');
const { sequelize } = require('../models');

const create = async (newCategory) => {
  const { error } = CategorySchema.validate(newCategory);

  if (error) throw error;

  const user = await CategoryModel.findOne({ where: { name: newCategory.name } });

  if (user) throw boom.conflict('Category already registered');

  return sequelize.transaction(async (transaction) => (
    CategoryModel.create({ ...newCategory }, { transaction })));
};

const findAll = async () => CategoryModel.findAll();

module.exports = {
  create,
  findAll,
};
