const Sequelize = require('sequelize');
const { BlogPost, Category, PostCategory } = require('../models');
const { resources: { BlogPosts } } = require('../.env.js');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const getAll = async () => {
  const resources = await BlogPost.findAll({
    include: [
      'user',
      { association: 'categories', through: { attributes: [] } },
    ],
  });
  return { result: resources };
};

const findById = async (id) => {
  const resource = await BlogPost.findByPk(id, {
    include: [
      'user',
      { association: 'categories', through: { attributes: [] } },
    ],
  });
  if (!resource) {
    return { error: { code: 'notFound', message: 'Post does not exist' } };
  }
  return { result: resource };
};

const mapCategories = (post) => (category) => ({
  postId: post.id,
  categoryId: category.id,
});

const insertOne = async (obj) => {
  const { categoryIds, ...post } = obj;
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categoryIds.length !== categories.length) {
    return { error: { code: 'badRequest', message: '"categoryIds" not found' } };
  }

  const t = await sequelize.transaction();
  try {
    const now = new Date();
    const newPost = await BlogPost.create({
      ...post, published: now, updated: now }, { transaction: t });

    const postCategories = categories.map(mapCategories(newPost));
    await PostCategory.bulkCreate(postCategories, { transaction: t });
    
    t.commit();
    return { result: newPost };
  } catch (err) {
    t.rollback();
    return { error: { code: 'internalError', message: err.message } };
  }
};

const deleteById = async (id) => {
  const resp = await BlogPost.deleteById(BlogPosts.tableOrCollec, id);
  if (!resp) {
    return { error: {
    code: 'not_found', message: 'not_found message delete' } };
  }
  return { result: {
    message: `The ${BlogPosts.singular} with id = ${id} was deleted successfully` } };
};

const updateById = async (id, obj, userId) => {
  const { error, result: post } = await findById(id);
  if (error) return { error };
  if (userId !== post.userId) {
    return { error: { code: 'unauthenticated', message: 'Unauthorized user' } };
  }
  if (obj.categoryIds) {
    return { error: { code: 'badRequest', message: 'Categories cannot be edited' } };
  }

  await BlogPost.update(obj, { where: { id } });

  return { result: { ...post.dataValues, ...obj } };
};

module.exports = {
  getAll,
  findById,
  insertOne,
  deleteById,
  updateById,
};
