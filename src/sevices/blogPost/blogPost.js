const { BlogPost, Categorie, User } = require('../../models');
const helpers = require('../../helpers/helpers');

const {
  validBlogPost,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validBlogPost.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };
  try {
  const { categoryIds: id } = data;
  const exist = await Categorie.findOne({ where: { id } });
  if (!exist) return { status: helpers.QOO, message: '"categoryIds" not found' };
    const result = await BlogPost.create(data);
    await result.addCategorie(data.categoryIds, { through: {} });
    return result;
  } catch (error1) {
    console.log(error1);
  }
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

module.exports = {
  createServices,
  findServices,
  findIdServices,
};
