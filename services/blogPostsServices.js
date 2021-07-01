const { BlogPost, User, Category } = require('../models');

const createBlogPosts = async (body, user) => {
  const { id } = user;
  const createBlogPost = await BlogPost.create({
     userId: id,
     ...body,
     published: new Date(),
     updated: new Date(),
  });
  return createBlogPost;
};

const findAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log(posts);
  return posts;
};

module.exports = {
  createBlogPosts,
  findAllPosts,
};
