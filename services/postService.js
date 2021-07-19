require('dotenv').config();
const jwt = require('jsonwebtoken');
const postSchema = require('../schemas/postSchema');
const commonSchema = require('../schemas/commonSchema');
const { BlogPost, PostsCategory } = require('../models');
const { created } = require('../helpers/statusCode');

const { JWT_SECRET } = process.env;

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

module.exports = {
  insertPost,
};
