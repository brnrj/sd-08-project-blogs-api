const Joi = require('joi');
const { Error400, Error500, Error404 } = require('../errors');

const { BlogPost, Category, User } = require('../models');

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
    const { categoryIds, ...toAddPostDetails } = postData;
    const post = await BlogPost.create({
      ...toAddPostDetails,
      userId: userData.id,
      published: new Date(),
      updated: new Date(),
    });
    await post.addCategory(categoryIds, { through: {} });
    const { published, updated, ...showPostData } = post.toJSON();
    return showPostData;
  } catch (err) {
    throw new Error500('Internal Error');
  }
};

const getAll = async () => {
  try {
    const response = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { excludes: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    return response;
  } catch (err) {
    throw new Error500('Internal Error');
  }
};

const getById = async (id) => {
  let response;
  try {
    response = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { excludes: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
  } catch (err) {
    throw new Error500('Internal Error');
  }
  if (!response) throw new Error404('Post does not exist');
  return response;
};

module.exports = {
  add,
  getAll,
  getById,
};
