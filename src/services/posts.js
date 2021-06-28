const { httpStatusCode } = require('../../constants');
const { BlogPosts, PostsCategories, Users, Categories } = require('../models');
const CustomErr = require('../utils');
const { postValidations, categoriesValidations } = require('../validations');

const createPost = async (email, title, categoryIds, content) => {
  postValidations.titleValidate(title);
  postValidations.categoryIdsValidate(categoryIds);
  postValidations.contentValidate(content);

  categoryIds.forEach((categoryId) => {
    const categoryIdFound = Categories.findOne({ where: { id: categoryId } })
      .then((data) => console.log('Data: ', data))
        .catch((err) => console.log('Erro: ', err));
    categoriesValidations.existCategoryValidate(categoryIdFound);
  });

  const user = await Users.findOne({ where: { email } });
  const { id } = user;
  const newPost = await BlogPosts.create({ title, content, userId: id });
  
  categoryIds.forEach(async (category) => {
    const postId = newPost.id;
    const categoryId = category;
    await PostsCategories.create({ postId, categoryId });
  });
  return newPost.dataValues;
};

const getAllPosts = async () => {
  const posts = await BlogPosts.findAll({
    include: [
      { model: Categories, as: 'categories' },
      { model: Users, as: 'user' },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
      { model: Users, as: 'user' },
    ],
  });
  if (!post) throw new CustomErr(httpStatusCode.NOT_FOUND, 'Post does not exist');
  return post.dataValues;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
