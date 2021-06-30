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

const showPostsById = async (id) => {  
  const posts = await BlogPost.findOne({
    where: { id },
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
    });
  
  return posts;
};

const subscribePostsById = async ({ id, title, content, authorization }) => {
  const { data: { email } } = jwt.verify(authorization, SECRET);
  const user = await User.findOne({ where: { email } });
  const userId = user.toJSON().id;

  const searchPost = await BlogPost.findOne({ where: { id } });

  const compareIds = searchPost.toJSON().userId !== userId;
  if (compareIds) return { message: 'Unauthorized user' };
  
  await BlogPost.update({ title, content }, { where: { id } });

  const result = await BlogPost.findOne({ where: { id },
    include: [{ model: Categories, as: 'categories', through: { attributes: [] } }],
    attributes: { exclude: ['id', 'published', 'updated'] },
  });
  
  return result;
};

const destroyPostsById = async ({ id, authorization }) => {
  const { data: { email } } = jwt.verify(authorization, SECRET);
  const user = await User.findOne({ where: { email } });
  const userId = user.toJSON().id;

  const searchPost = await BlogPost.findOne({ where: { id } });
  if (!searchPost) return null;

  const compareIds = searchPost.toJSON().userId !== userId;
  if (compareIds) return { message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id } });

  return { message: 'deleted post' };
};

module.exports = {
  createPost,
  showPosts,
  showPostsById,
  subscribePostsById,
  destroyPostsById,
};