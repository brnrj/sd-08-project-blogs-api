const { httpStatusCode } = require('../../constants');
const { BlogPosts, Users, Categories, PostsCategories } = require('../models');
const CustomErr = require('../utils');
const { postValidations } = require('../validations');

const postsCategoriesAssossiations = async (categoryIds) => {
  const allCategories = await Categories.findAll();
  const allCategoriesIds = allCategories.map((category) => category.dataValues.id);
  const idsFound = categoryIds.every((id) => allCategoriesIds.includes(id));

  if (!idsFound) throw new CustomErr(httpStatusCode.BAD_REQUEST, '"categoryIds" not found');
  return true;
};

const createPost = async (email, title, categoryIds, content) => {
  postValidations.titleValidate(title);
  postValidations.categoryIdsValidate(categoryIds);
  postValidations.contentValidate(content);
  await postsCategoriesAssossiations(categoryIds);

  const user = await Users.findOne({ where: { email } });
  const { id } = user;
  const newPost = await BlogPosts.create({ title, content, userId: id });

  categoryIds.forEach(async (categoryId) =>
    PostsCategories.create({ postId: newPost.id, categoryId }));

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

const editPost = async (id, email, updateInfo) => {
  postValidations.titleValidate(updateInfo.title);
  postValidations.contentValidate(updateInfo.content);
  if (updateInfo.categoryIds) {
    throw new CustomErr(httpStatusCode.BAD_REQUEST, 'Categories cannot be edited'); 
  }
  const user = await Users.findOne({ where: { email } });
  const post = await BlogPosts.findOne({ where: { userId: id } });
  if (!post) throw new CustomErr(httpStatusCode.NOT_FOUND, 'Post does not exist');
  const { userId } = post.dataValues;
  if (user.dataValues.id !== userId) {
    throw new CustomErr(httpStatusCode.UNAUTHORIZED, 'Unauthorized user'); 
  }
  await BlogPosts.update({ ...updateInfo }, { where: { id } });
    const postEdited = await BlogPosts.findOne({ where: { id },
    include: [{
        model: Categories, as: 'categories', through: { attributes: [] } }] });
    return postEdited;
};
const deletePost = async (id, email) => {
  const user = await Users.findOne({ where: { email } });
  const post = await BlogPosts.findOne({ where: { id } });
  if (!post) throw new CustomErr(httpStatusCode.NOT_FOUND, 'Post does not exist');
  const { userId } = post.dataValues;
  if (user.dataValues.id !== userId) {
    throw new CustomErr(httpStatusCode.UNAUTHORIZED, 'Unauthorized user');
  }
  await BlogPosts.destroy({ where: { id } });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
};
