const { BlogPost, Categorie, User } = require('../../models');
const helpers = require('../../helpers/helpers');

const {
  validBlogPost,
  validEditPost,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validBlogPost.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };
  const { categoryIds: id } = data;
  const exist = await Categorie.findOne({ where: { id } });
  if (!exist) return { status: helpers.QOO, message: '"categoryIds" not found' };
  const result = await BlogPost.create(data);
  return result;
};

const findServices = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const findIdServices = async (id) => {
  const result = await BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (result.length === 0) return { status: helpers.QOQ, message: 'Post does not exist' };
  return result;
};

const validUser = async (userId, postId) => {
  const result = await BlogPost.findByPk(postId);
  const existId = result.userId;
  return Number(existId) === Number(userId);
};

const editIdServices = async (id, newData, userId) => {
  const isValid = await validUser(userId, id);
  if (!isValid) return { status: helpers.QOU, message: 'Unauthorized user' };

  if (newData.categoryIds) return { status: helpers.QOO, message: 'Categories cannot be edited' };
  const { error } = validEditPost.validate(newData);
  if (error) return { status: helpers.QOO, message: error.details[0].message };
  await BlogPost.update(
    { ...newData },
    { where: { id } },
  );
  const result = await BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include:
    { model: Categorie, as: 'categories', through: { attributes: [] } },
  });
  return result;
};

module.exports = {
  createServices,
  findServices,
  findIdServices,
  editIdServices,
};
