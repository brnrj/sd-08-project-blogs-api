// const statusCode = require('../utils/statuscode');
const { User, BlogPost, Category } = require('../../models');

const getAllPosts = async () => {
  const getPosts = await BlogPost.findAll(
    { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] },
  );

  return getPosts;
};

module.exports = {
  getAllPosts,
};
