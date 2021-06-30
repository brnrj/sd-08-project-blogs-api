const { Op } = require('sequelize');
const { BlogPost, PostsCategorie } = require('../models');
const BlogPostValidation = require('../validations/blogPostValidations');

const create = async (blogPost, userId) => {
  const { title, content, categoryIds } = blogPost;

  BlogPostValidation.validateNewBlogPost(blogPost, userId);  
  await BlogPostValidation.validateAllCategoriesExists(categoryIds);

  const createdBlogPost = await BlogPost.create({ title, content, userId });

  const { id: postId } = createdBlogPost;

  // https://sequelize.org/master/manual/model-querying-basics.html#creating-in-bulk
  await PostsCategorie.bulkCreate(
    [...categoryIds.map((categoryId) => ({ postId, categoryId }))],
  );
  
  return createdBlogPost;
};

// https://sequelize.org/master/manual/eager-loading.html#fetching-an-aliased-association
const getAll = async () => BlogPost.findAll({
  include: [
      { association: 'user' },
      { association: 'categories', through: { attributes: [] } },
    ],
});

const getById = async (blogPostId) => {
  const blogPostFound = await BlogPostValidation.validateBlogPostExists(blogPostId);  

  return blogPostFound;
};

const updateById = async (blogPost, blogPostIdParam, reqUserId) => {
  const { title, content, categoryIds } = blogPost;

  BlogPostValidation.validateTryUpdateBlogPostCategories(categoryIds);
  BlogPostValidation.validateUpdateBlogPost(blogPost);
  await BlogPostValidation.validateOwnUser(blogPostIdParam, reqUserId);

  await BlogPost.update(
    { title, content },
    { where: { id: blogPostIdParam } },
  );
  
  return BlogPost.findByPk(
    blogPostIdParam, 
    {
      include: {
        association: 'categories', through: { attributes: [] },
      },
    },
  );
};

const excludeById = async (blogPostIdParam, reqUserId) => {
  await BlogPostValidation.validateBlogPostExists(blogPostIdParam);
  await BlogPostValidation.validateOwnUser(blogPostIdParam, reqUserId);

  await BlogPost.destroy({ where: { id: blogPostIdParam } });
};

// https://sequelize.org/master/manual/model-querying-basics.html#examples-with--code-op-and--code--and--code-op-or--code-
const searchTerms = async (terms) => BlogPost.findAll({
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${terms}%` } },
      { content: { [Op.like]: `%${terms}%` } },
    ],
  },
  include: [
    { association: 'user' },
    { association: 'categories', through: { attributes: [] } },
  ],
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  excludeById,
  searchTerms,
};
