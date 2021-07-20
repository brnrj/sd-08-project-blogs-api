const Joi = require('joi');

const { Category } = require('../models');
const { Code400, Code500 } = require('../Error');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const addCategory = async (categoryInfo) => {
  const { error } = categorySchema.validate(categoryInfo);
  if (error) {
    throw new Code400(error.details[0].message);
  }

  try {
    const newCategory = await Category.create(categoryInfo);
    return newCategory;
  } catch (err) {
    throw new Code500('Internal server error');
  }
};

module.exports = {
  addCategory,
};
