const Sequelize = require('sequelize');
const { BlogPost, Categorie, PostsCategories } = require('../models');
const schema = require('../schema');
const CustomError = require('../utils/customError');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const { err, code, msg } = new CustomError();

const checkListForAddingNewPost = async (data) => {
  const validPost = schema.postBlog(data);
  if (validPost.err) return validPost;
  const ids = await Categorie.findAll({
    where: { id: data.categoryIds },
  });
  console.log(ids);
  if (ids.length !== data.categoryIds.length) {
    return err(msg.categoryIdsNotExists, code.badRequest);
  }
  return true;
};

const addPostsCategories = async (postId, categoryIds, t) => {
  if (!Array.isArray(categoryIds)) {
    return PostsCategories.create(
      { postId, categoryId: categoryIds },
    );
  }

  const value = categoryIds.reduce((cur, prev) => (
    cur.concat({ postId, categoryId: Number(prev) })
  ), []);
  await PostsCategories.create(value, { transaction: t });
  await t.commit();
};

const addPost = async (data) => {
  const t = await sequelize.transaction();
  const result = checkListForAddingNewPost(data);
  const { userId, title, content, categoryIds } = data;
  if (result.err) return result;
  const blogPost = await BlogPost.create({
    title, content, userId, published: new Date(), updated: new Date(),
  }, { transaction: t });
  await addPostsCategories(blogPost.id, categoryIds, t);
  return { blogPost };
};

module.exports = {
  addPost,
};
