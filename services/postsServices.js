const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

// const error = require('./errorMessages');
const { BlogPost, User } = require('../models');

const createPost = async ({ title, content, authorization }) => {
  const { data: { email } } = jwt.verify(authorization, SECRET);
  const user = await User.findOne({ where: { email } });

  // const userId = JSON.parse(JSON.stringify(user)).id;

  const userId = user.toJSON().id;

  const postCreate = await BlogPost.create({
    title,
    content,
    userId,
  });

  return postCreate;
};

// const createPost = async ({ title, content, authorization }) => {
//   const { data: { email } } = jwt.verify(authorization, SECRET);
//   const user = await User.findOne({ where: { email } });
//   // const userId = JSON.parse(JSON.stringify(user)).id;
//   const userId = user.toJSON().id;

//   const postCreate = await BlogPost.create({
//     title,
//     content,
//     userId,
//   });

//   return postCreate;
// };

module.exports = {
  createPost,
};