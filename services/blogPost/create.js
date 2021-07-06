const boom = require('@hapi/boom');
const { Post } = require('../../models');
const { Category } = require('../../models');

const validationCategories = async (post) => {
  const categories = await Category.count({ where: { id: post.categoryIds } });
  return categories !== 0;
};

module.exports = async (post, userId) => {
  const categories = await validationCategories(post);

  if (!categories) throw boom.badRequest('"categoryIds" not found');

  const newPost = {
    ...post,
    userId,
    published: new Date(),
    updated: new Date(),
  };

  const postCreated = await Post.create(newPost);

  return postCreated;
};