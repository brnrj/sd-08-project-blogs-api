// const statusCode = require('../utils/statuscode');
const { User, BlogPost, Category } = require('../../models');

const getAllPosts = async () => {
  const getPosts = await BlogPost.findAll({
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  return getPosts;
};

const getPostsById = async (id) => {
  const postsById = await BlogPost.findOne({
    where: { id },
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  if (!postsById) {
    return { message: 'Post does not exist' };
  }

  return postsById;
};

const updatedPosts = async (title, content, id) => {
  if (!title) {
    return { message: '"title" is required' };
  }
  if (!content) {
    return { message: '"content" is required' };
  }

  const updatedPost = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  if (!updatedPost) {
    return { message: 'Post does not exist' };
  }

  return getPostsById(id);
};

const filterAllUserByEmail = async (email) => {
  const searchEmail = await User.findOne({ where: { email } });
  return searchEmail;
};

module.exports = {
  getAllPosts,
  getPostsById,
  updatedPosts,
  filterAllUserByEmail,
};
