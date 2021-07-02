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

module.exports = {
  addPost,
  getAllPost,
};
