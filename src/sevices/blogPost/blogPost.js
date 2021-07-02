const { BlogPost, Categories, User } = require('../../models');
const helpers = require('../../helpers/helpers');

const {
  validBlogPost,
} = require('../validator');

const createServices = async (data) => {
  const { error } = validBlogPost.validate(data);
  if (error) return { status: helpers.QOO, message: error.details[0].message };

  const { categoryIds: id } = data;
  const exist = await Categories.findOne({ where: { id } });
  if (!exist) return { status: helpers.QOO, message: '"categoryIds" not found' };
  const result = await BlogPost.create(data);
  await result.addCategorie(data.categoryIds, { through: {} });
  return result;
};

const findServices = async () => {
  const result1 = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result1;
};

module.exports = {
  createServices,
  findServices,
};
