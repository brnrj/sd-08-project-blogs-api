const { BlogPost, Categorie, PostsCategories } = require('../models');

const models = require('../models');
const validations = require('../validations/blogpost');
const decodeToken = require('../helper/decodeToken');

const createPost = async (post, token) => {
  console.log(post);

  validations.verifyBodyRequest(post);

  const categories = await Categorie.findAll({ where: { id: post.categoryIds } });

  validations.categoriesExists(categories);

  const { data: { id } } = decodeToken(token);

  const { categoryIds, ...bpost } = post;

  const newBlogPost = {
    userId: id,
    ...bpost,
    published: new Date(),
    updated: new Date(),
  };

  const created = await BlogPost.create(newBlogPost);

  const postCategories = post.categoryIds
  .map((elem) => ({ postId: created.dataValues.id, categoryId: elem }));

  await PostsCategories.bulkCreate(postCategories);

  const { published, updated, ...response } = created.dataValues;
  return { ...response };
};

module.exports = {
  createPost,
};