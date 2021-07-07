// codigo inspirado no do Douglas Cajueiro https://github.com/tryber/sd-08-project-blogs-api/pull/53/files
require('dotenv').config({ path: './config.env' });
const { Op } = require('sequelize');
// const servicesCategories = require('./categoriesServices');
const { BlogPosts, PostsCategories, Categories, User } = require('../../models');
// const { PostsCategories } = require('../../models');
// const user = require('../../models/user');

const findByKey = async (key, value) => {
  try {
    const foundBlogPost = await BlogPosts.findOne({ where: { [key]: value } }) || null;
    return foundBlogPost;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findByPK = async (pk) => {
  try {
    const foundBlogPost = await BlogPosts.findByPk(pk, {
      include: [{
        model: User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: Categories, as: 'categories', through: { attributes: [] },
      },
    ],
    });
    return foundBlogPost;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const CreateBlogPost = async (BlogPostInfos, id) => {
  const { categoryIds, title, content } = BlogPostInfos;
  const lisfOfId = await Categories.findAll({ where: { id: { [Op.in]: categoryIds } } });
  console.log('listas ', categoryIds, lisfOfId);
  console.log('listas ', categoryIds.length, lisfOfId.length);

  if (lisfOfId.length !== categoryIds.length) { return { error: true }; }
  const created = await BlogPosts.create({ 
    title, content, userId: id, published: Date.now(), updated: Date.now() });
  // console.log('created info', created);
  console.log('created  id', created.id);
  categoryIds.forEach(async (categoryId) => { 
    PostsCategories.create({ postId: created.id, categoryId });
  });
  return created;
};

const findAll = async () => {
  const foundAll = await BlogPosts.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Categories, as: 'categories', through: { attributes: [] },
    },
  ],
  });
  // console.log('FOUND', foundAll);

  return foundAll;
};

module.exports = {
  CreateBlogPost,
  findAll,
  findByKey,
  findByPK,
};