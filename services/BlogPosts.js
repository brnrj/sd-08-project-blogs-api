const { StatusCodes: HTTP } = require('http-status-codes');

const { BlogPosts, Categories } = require('../models');
const { postSchema, tokenValidation } = require('./validation');

const generateError = require('../utils/generateError');

const createPost = async (post, token) => {
  try {
    const isInvalid = postSchema.validate(post).error;
    const { title, content, categoryIds } = post;
    const { id: userId } = await tokenValidation(token);

    if (isInvalid) {
      throw generateError(isInvalid.details[0].message);
    }

    const categories = await Categories.findAll({ raw: true }).then(
      (response) => response.map((category) => category.id),
    );

    const matchCategories = categoryIds.every((id) => categories.includes(id));

    if (!matchCategories) throw generateError('"categoryIds" not found');

    const createdCategory = await BlogPosts.create({ userId, title, content });

    return { status: HTTP.CREATED, result: createdCategory };
  } catch (err) {
    return err;
  }
};

module.exports = { createPost };
