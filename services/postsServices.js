const { BlogPost } = require('../models');
const { validateCategory } = require('../middlewares/validateFormPost');

const createPost = async (body, user) => {
  // console.log(body);
  const categoryExist = await validateCategory(body);
  console.log(categoryExist);
  if (!categoryExist) throw new Error('"categoryIds" not found');
  const { id } = user;
  const newPost = await BlogPost.create({
    userId: id,
    ...body,
    published: new Date(),
    updated: new Date(),
  });
  // console.log(newPost);
  return newPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll();
  return allPosts;
};

module.exports = {
  createPost,
  getAllPosts,
};