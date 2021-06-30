const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const { BlogPost, User, Categories } = require('../models');

const createPost = async ({ title, content, authorization }) => {
  const { data: { email } } = jwt.verify(authorization, SECRET);
  const user = await User.findOne({ where: { email } });
  const userId = user.toJSON().id;
  const postCreate = await BlogPost.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });

  return postCreate;
};

const showPosts = async () => {  
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Categories, as: 'categories', through: { attributes: [] } },
  ] });
  
  return posts;
};

module.exports = {
  createPost,
  showPosts,
};