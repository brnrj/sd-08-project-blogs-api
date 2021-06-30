const Joi = require('joi');
const { BlogPost } = require('../models');
const { PostsCategorie } = require('../models');

const CategorieService = require('./CategoriesService');

const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
    content: Joi.string().required(),
  }).validate(data);

  return schema;
};

const addPostCategorie = async (categoryIds, postId) => {
  try {
    await categoryIds.map((categorie) => PostsCategorie.create({ categorieId: categorie, postId }));
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

const addPost = async ({ title, content, categoryIds, userId }) => {
  const { error } = validatePost({ title, content, categoryIds });
  if (error) return { statusCode: 400, json: { message: error.details[0].message } };
  try {
    const categorie = await CategorieService.verifyCategory(categoryIds);
    if (!categorie) {
      return { statusCode: 400, json: { message: '"categoryIds" not found' } };
    }
    const createPost = await BlogPost.create(
      { title, content, userId },
    );
    delete createPost.dataValues.published;
    delete createPost.dataValues.updated;
    await addPostCategorie(categoryIds, createPost.dataValues.id);
    return { statusCode: 201, json: createPost.dataValues };
  } catch (err) {
    console.log(err.message);
    return { statusCode: 500, json: { message: 'Algo deu errado' } };
  }
};

module.exports = {
  addPost,
};
