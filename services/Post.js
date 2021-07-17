const boom = require('@hapi/boom');
const { User, BlogPosts, Categories, PostsCategories } = require('../models');

const post = async (postItem, user) => {
  const { title, content, categoryIds } = postItem;

  const result = await Categories.findAll();
  const idResult = result.map((item) => item.id);
  const verifyResult = categoryIds.every((id) => idResult.includes(id));
  if (!verifyResult) {
    throw boom.badRequest('"categoryIds" not found');
  }
  
  const { id } = await User.findOne({ where: { email: user } });
  const createPost = await BlogPosts.create({ title, content, userId: id });

  await categoryIds.forEach((catId) => PostsCategories.create(
    { categoryId: catId, postId: createPost.id },
));

  return createPost;
};

const findAll = async () => {
  const allPost = await BlogPosts.findAll({ include: ['user', 'categories'] });
  return allPost;
};

module.exports = { post, findAll };