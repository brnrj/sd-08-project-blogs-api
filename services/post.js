const { BlogPost, User, Category } = require('../models');
const { decodeToken } = require('../middleware');

async function createPost(body, authorization) {
  const {
    data: { id },
  } = decodeToken(authorization);
  const data = await BlogPost.create({
    ...body,
    userId: id,
    published: new Date(),
    updated: new Date(),
  });
  return data;
}

async function getPosts() {
  const data = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return data;
}

async function getPostById(id) {
  const [data] = await BlogPost.findAll({ where: { id },
include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  if (!data) throw new Error('Post does not exist');
  return data;
}
module.exports = {
  createPost, getPosts, getPostById,
};
