const { BlogPost, Categorie, PostsCategory } = require('../models');
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

  console.log(postCategories, 'aaaa', PostsCategory, Categorie);

  await PostsCategory.bulkCreate(postCategories);

  return newBlogPost;
};

module.exports = {
  createPost,
};