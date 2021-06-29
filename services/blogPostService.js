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

module.exports = {
  create,
  getAll,
};
