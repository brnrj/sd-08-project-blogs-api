const { Op } = require('sequelize');
const { Category } = require('../models');
const HandleError = require('../http/errors/HandleError');

exports.registerCategory = async ({ name }) => {
  const categoryExists = await Category.findAll({
    where: {
      name: {
        [Op.eq]: name,
      },
    },
  });
  if (categoryExists.length !== 0) throw new HandleError('category already registered', 409);

  const category = await Category.create({ name });
  return category;
};

exports.findByCategory = async ({ id }) => {
  const [category] = await Category.findAll({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  if (!category) throw new HandleError('category does not exist', 404);
  return category;
};
