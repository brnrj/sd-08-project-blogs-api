const Joi = require('joi');
const { Error400, Error500 } = require('../errors');

const { BlogPost, Category } = require('../models');

const postDataSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const checkFields = (postData) => {
  const { error } = postDataSchema.validate(postData);
  if (error) {
    const { message } = error.details[0];
    throw new Error400(message);
  }
};

const checkCategoryIds = async (categoryIds) => {
  let registeredCategories;
  try {
    registeredCategories = await Category.findAll();
  } catch (err) {
    throw new Error500('Internal Error');
  }

  const registeredCategoriesIds = registeredCategories.map((category) => category.id);
  const everyCategoryExists = categoryIds.every((id) =>
    registeredCategoriesIds.includes(id));
  if (!everyCategoryExists) throw new Error400('"categoryIds" not found');
};

const add = async (postData, userData) => {
  checkFields(postData);
  await checkCategoryIds(postData.categoryIds);
  try {
    const { categoryIds, ...postDetails } = postData;
    const response = await BlogPost.create({
      ...postDetails,
      userId: userData.id,
      published: new Date(),
      updated: new Date(),
    });
    return response;
  } catch (err) {
    throw new Error500('Internal Error');
  }
};

module.exports = {
  add,
};
