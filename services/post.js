const { BlogPosts, PostsCategories, Users, Categories } = require('../models');
const { validateNewPost, validateCategoryIds } = require('./postValidates');

  // Adicionando as categorias na tabela de PostCategories
  // Utilizando map para adicionar cada id junto ao postId da publicação
const creatPostCategory = async (categories, postId) => {
  await categories.map((id) => PostsCategories.create({
    categoryId: id,
    postId,
  }));
};

const createPost = async (date, user) => {
  validateNewPost(date);
  const { id } = await user.dataValues;
  const { title, content, categoryIds } = date;

  await validateCategoryIds(categoryIds);

  const newPost = await BlogPosts.create({
    title,
    content,
    userId: id,
  });

  await creatPostCategory(categoryIds, newPost.id);
  return newPost;
};

const getAll = async () => BlogPosts.findAll(
  {
    include:
    [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  },
);

module.exports = {
  createPost,
  getAll,
};
