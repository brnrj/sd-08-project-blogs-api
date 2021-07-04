// Op docs: https://sequelize.org/master/variable/index.html#static-variable-Op
const { Op } = require('sequelize');
const { BAD_REQUEST } = require('../../common/constants/statusCodes');
const { CATEGORY_IDS_NOT_FOUND } = require('../../common/constants/statusMessages');
const { 
  Category, 
  BlogPost,
  PostsCategory,
  User,
} = require('../../models');
const { generateError } = require('../../validations/errors/generateError');

const createBlogPost = async (title, content, categoryIds, userId) => {
    const allCategories = await Category.findAll({ where: {
      id: {
        [Op.in]: categoryIds,
      } } });
    // console.log('CATEGORIES', allCategories);

    if (allCategories.length !== categoryIds.length) {
      return generateError(BAD_REQUEST, CATEGORY_IDS_NOT_FOUND);
    }
    
      const createdBlogPost = await BlogPost.create({ title, content, userId });
      const postId = createdBlogPost.toJSON().id;
      console.log('POST_ID', postId);

      categoryIds.forEach(async (categoryId) => {
        await PostsCategory.create({ 
          postId,
          categoryId, 
        });
      });
      return createdBlogPost;
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: [{
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Category, as: 'categories', through: { attributes: [] },
    },
  ],
  });
  // console.log('ALL_POSTS', allPosts);
  return allPosts;
};
module.exports = {
  createBlogPost,
  getAllPosts,
};
