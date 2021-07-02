const { Op } = require('sequelize');
const { BlogPost, Categorie, PostsCategories, User } = require('../models');
const schema = require('../schema');
const CustomError = require('../utils/customError');

const { err, code, msg } = new CustomError();

const checkListForAddingNewPost = async (data) => {
  const validPost = schema.postBlog(data);
  if (validPost.err) return validPost;
  const ids = await Categorie.findAll({
    where: { id: data.categoryIds },
  });
  console.log(ids.length);
  if (ids.length !== data.categoryIds.length) {
    return err(msg.categoryIdsNotExists, code.badRequest);
  }
  return true;
};

const addPostsCategories = async (postId, categoryIds) => {
  if (!Array.isArray(categoryIds)) {
    return PostsCategories.create(
      { postId, categoryId: categoryIds },
    );
  }

  const value = categoryIds.reduce((cur, prev) => (
    cur.concat({ postId, categoryId: Number(prev) })
  ), []);
  await PostsCategories.bulkCreate(value);
};

const addPost = async (data) => {
  const result = await checkListForAddingNewPost(data);
  const { userId, title, content, categoryIds } = data;
  console.log(result);
  if (result.err) return result;
  const blogPost = await BlogPost.create({
    title, content, userId, published: new Date(), updated: new Date(),
  });
  await addPostsCategories(blogPost.id, categoryIds);
  return { blogPost };
};

const getAllPost = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log(result);
  return { post: result };
};

const getPostById = async (id) => {
  const schemaValid = schema.fields.checkId(id);
  if (schemaValid.err) return schemaValid;
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  console.log(result);
  if (!result || result.length === 0) {
    return err(msg.postNotExists, code.notFound);
  }
  return { post: result };
};

const checkDataToUpdatePost = async (data, id, userId) => {
  if (Object.keys(data).length > 2) {
    return err(msg.noPermissionEditCategorys, code.badRequest);
  }
  const getPostByUser = await BlogPost.findOne({ where: { id } });
  if (getPostByUser.userId !== userId) {
    return err(msg.withoutAuthorization, code.unauthorized);
  }
  const { checkTitle, checkContent } = schema.fields;
  if (checkTitle(data.title).err) {
    return checkTitle(data.title);
  }
  if (checkContent(data.content).err) {
    return checkContent(data.content);
  }
  return true;
};

const updatePost = async (data, id, userId) => {
  const result = await checkDataToUpdatePost(data, id, userId);
  if (result.err) return result;
  await BlogPost.update(
    { title: data.title, content: data.content }, { where: { id } },
  );
  const postAfterUpdate = await BlogPost.findOne({
    where: { id },
    include: [
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { post: postAfterUpdate };
};

const authorizationToDelete = async ({ id, userId }) => {
  const postById = await BlogPost.findOne({ where: { id } });
  if (!postById) {
    return err(msg.postNotExists, code.notFound);
  }

  if (postById.userId !== userId) {
    return err(msg.withoutAuthorization, code.unauthorized);
  }

  return true;
};

const deletePost = async (ids) => {
  const authDelete = await authorizationToDelete(ids);

  if (authDelete.err) return authDelete;
  
  await BlogPost.destroy({ where: { id: ids.id } });

  return true;
};

const searchPost = async (query) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.substring]: query.q },
        content: { [Op.substring]: query.q },
      },
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

module.exports = {
  addPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};
