const { BlogPosts, User, Categories } = require('../models');
// const userService = require('../services/userService');

const getAll = async () => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Categories,
        as: 'categories',
        // through: { attributes: [] }
      },
    ],
  });
  return posts;
};

const add = async ({ title, content, userId, categoryIds }) => {
  const categoriesExists = await Promise.all(
    categoryIds.map((catId) => Categories.findOne({ where: { id: catId } })),
  );

  if (categoriesExists.some((cat) => !cat)) {
    return 'CATEGORIES_NOT_FOUND';
  }
  const post = await BlogPosts.create({ title, content, userId });
  categoriesExists.forEach((cat) => post.addCategory(cat));

  return post.dataValues;
};

const findById = async (id) => {
  const searchEmail = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Categories,
        as: 'categories',
      },
    ],
  });
  return searchEmail;
};
module.exports = {
  getAll,
  add,
  findById,
};
