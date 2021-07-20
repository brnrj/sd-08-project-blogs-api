require('dotenv').config();
const jwt = require('jsonwebtoken');
const postSchema = require('../schemas/postSchema');
const commonSchema = require('../schemas/commonSchema');
const { BlogPost, PostsCategory, User, Category } = require('../models');
const { created, ok } = require('../helpers/statusCode');

const { JWT_SECRET } = process.env;

const clearCategoryData = ({ id, name }) => ({ id, name });
const clearCategoryDataFromArray = (categories) => categories.map(clearCategoryData);

const getDataValues = ({ dataValues }) => {
  const { dataValues: userData } = dataValues.user;

  const { password, ...userWithoutPass } = userData;
  const allCategories = clearCategoryDataFromArray(dataValues.categories);
  return { ...dataValues, user: userWithoutPass, categories: allCategories };
};
const getDataValuesFromArray = (blogPosts) => blogPosts.map(getDataValues);

const insertPost = async (token, data) => {
  const incompleteData = postSchema.incompleteData(data);
  if (incompleteData) return incompleteData;

  const unauthorizedToken = commonSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const invalidCategoryIds = await postSchema.invalidCategoryIds(data.categoryIds);
  if (invalidCategoryIds) return invalidCategoryIds;

  const { id: userId } = jwt.verify(token, JWT_SECRET);
  const { title, content, categoryIds } = data;
  const published = Date.now();
  const postData = { title, content, userId, published, updated: published };

  const newPost = await BlogPost.create(postData);
  const { dataValues } = newPost;

  categoryIds.forEach(async (categoryId) => {
    const postCategory = { postId: dataValues.id, categoryId };
    await PostsCategory.create(postCategory);
  });

  return { status: created, response: { id: dataValues.id, userId, title, content } };
};

const findAllPosts = async (token) => {
  const unauthorizedToken = commonSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });
  
  const clearData = getDataValuesFromArray(allPosts);
  return { status: ok, response: clearData };
};

const findPostById = async (token, id) => {
  const unauthorizedToken = commonSchema.unauthorizedToken(token);
  if (unauthorizedToken) return unauthorizedToken;

  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  const postDoesNotFound = postSchema.postDoesNotFound(post);
  if (postDoesNotFound) return postDoesNotFound;

  const postData = getDataValues(post);
  return { status: ok, response: postData };
};

module.exports = {
  insertPost,
  findAllPosts,
  findPostById,
};
