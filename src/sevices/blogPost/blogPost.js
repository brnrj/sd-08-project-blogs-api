const { BlogPost, Categorie } = require('../../models');
const helpers = require('../../helpers/helpers');

const {
  validBlogPost,
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

// const findServices = async () => {
//   const result = await Categorie.findAll();
//   return result;
// };

module.exports = {
  createServices,
  // findServices,
};
