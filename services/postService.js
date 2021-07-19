const jwt = require('jsonwebtoken');

const { newPostValidate } = require('../schema/postSchema');
const Utils = require('../utils');
const { BlogPost: BlogPostModel,
    PostCategory: PostCategoryModel,
    Category: CategoryModel } = require('../models');

const { JWT_SECRET } = process.env;

const create = async (token, title, content, categoryIds) => {
  const { error } = newPostValidate.validate({ title, content, categoryIds });
  if (error) Utils.throwError(error, 400);
  const categories = await Utils.categoryExists(categoryIds, CategoryModel);
  if (categories.includes(null)) Utils.throwError(new Error(), 400, '"categoryIds" not found');
  const { id: userId } = jwt.verify(token, JWT_SECRET);
  const { id: postId } = await BlogPostModel.create({ title, content, userId });
  const post = {
    id: postId,
    userId,
    title,
    content,
  };
  await Utils.postCategory(postId, PostCategoryModel, categories);
  return {
    statusCode: 201,
    post,
  };
};

module.exports = {
  create,
};
