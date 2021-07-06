// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
const boom = require('@hapi/boom');
const services = require('./index');
const { BlogPost } = require('../../models');
const { PostCategories } = require('../../models');
// const user = require('../../models/user');

const findByKey = async (key, value) => {
  try {
    const foundBlogPost = await BlogPost.findOne({ where: { [key]: value } }) || null;
    return foundBlogPost;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const CreateBlogPost = async (BlogPostInfos, user) => {
  const { categoryIds, title, content } = BlogPostInfos;
  console.log('BlogPost info', BlogPostInfos);
  console.log('user info', user);
  console.log('user  id', user.id);
  categoryIds.forEach(async (categoryId) => { 
    const foundBlogPost = await services.Categories.findByKey('id', categoryId);
    if (foundBlogPost !== null) {
      return boom.badRequest('"categoryIds" not found');
    }
  });
  const created = BlogPost.create({ title, content, userId: user.id });
  console.log('created info', created);
  console.log('created  id', created.id);
  categoryIds.forEach(async (categoryId) => { 
    PostCategories.create({ postId: created.id, categoryId });
  });
  return created;
};

const findAll = async () => {
  const foundAll = await BlogPost.findAll();
  // console.log('FOUND', foundAll);

  return foundAll;
};

module.exports = {
  CreateBlogPost,
  findAll,
  findByKey,
};