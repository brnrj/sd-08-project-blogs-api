const { Op } = require('sequelize');
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

async function updatePost(id, body, authorization) {
  const { data: { id: userId } } = decodeToken(authorization);
  const { userId: postUserId } = await BlogPost.findOne({ where: { id } });
  if (userId !== postUserId) throw new Error('Unauthorized user');
  await BlogPost.update({ ...body, updated: new Date() }, {
    where: { id },
  });
  const data = await BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['published', 'updated'] },
    include: { model: Category, as: 'categories' },
  });
  return data;
}

async function deletePost(id, authorization) {
  const { data: { id: userId } } = decodeToken(authorization);
  const data = await BlogPost.findOne({ where: { id } });
  if (!data) throw new Error('Post does not exist');
  if (userId !== data.userId) throw new Error('Unauthorized user');
  await BlogPost.destroy({ where: { id } });
  return true;
}

async function searchPost(q) {
  if (!q) {
    return BlogPost.findAll({ include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
  }
  return BlogPost.findAll({
    where: {
    [Op.or]: [{ title: q }, { content: q }],
    },
    include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
}

module.exports = {
  createPost, getPosts, getPostById, updatePost, deletePost, searchPost,
};
