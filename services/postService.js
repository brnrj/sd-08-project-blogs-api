const { BlogPosts, Categories } = require('../models');

const getAll = async () => {
  const posts = await BlogPosts.findAll();
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
  
    return post.dataValues;
  };

  module.exports = {
  getAll,
  add,
};
