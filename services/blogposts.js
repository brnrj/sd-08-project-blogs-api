const { BlogPost, User, PostsCategory, Category } = require('../models');
const { CONFLICT, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = require('../helpers');

const errorPostExists = {
  status: CONFLICT,
  message: 'Post exists',
};

const errorCategoryNotFound = {
  status: BAD_REQUEST,
  message: '"categoryIds" not found',
};

const errorUnauthorizedUser = {
  status: UNAUTHORIZED,
  message: 'Unauthorized user',
};

const errorPostNotFound = {
  status: NOT_FOUND,
  message: 'Post does not exist',
};

const cannotEdit = {
  status: BAD_REQUEST,
  message: 'Categories cannot be edited',
};

const createPost = async ({ userId, title, content, categoryIds }) => {
  const postAlreadyExists = await BlogPost.findOne({ where: { title } });
  if (postAlreadyExists) throw errorPostExists;

  const categoryAlreadyExists = await Category.findOne({ where: { id: categoryIds } });
  if (!categoryAlreadyExists) throw errorCategoryNotFound;

  const newPost = await BlogPost.create({ userId, title, content, categoryIds });
  const { dataValues: { id } } = newPost;
  await PostsCategory.bulkCreate(...categoryIds
    .map((category) => ({ postId: id, categoryIds: category })));

    const { dataValues: { updated: _noUpdated, published: _noPublished, ...createPostWithoutDate },
  } = newPost;

  return createPostWithoutDate;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return posts;
};

const getPostByIds = async (id) => {
  const posts = await BlogPost.findOne({ where: { id }, 
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  if (!posts) throw errorPostNotFound;
  return posts;
};

const editPost = async ({ userId, id, title, content }) => {
  const postAlreadyExists = await BlogPost.findOne({ where: { id } });
  if (!postAlreadyExists) throw errorPostNotFound;

  const { dataValues: { userId: userIdPost } } = postAlreadyExists;
  if (userIdPost !== userId) throw errorUnauthorizedUser;

  const categoryAlreadyExists = await PostsCategory.findOne({ where: { postId: id } });
  if (!categoryAlreadyExists.dataValues.categoryId) throw cannotEdit;

  await BlogPost.update({ title, content }, { where: { id } });
  const updatePost = BlogPost.findByPk(id, {
    include: {
      association: 'categories', through: { attributes: [] },
    },
  });

  return updatePost;
};

const deletePost = async (id, userId) => {
  const postAlreadyExists = await BlogPost.findOne({ where: { id } });
  if (!postAlreadyExists) throw errorPostNotFound;

  const { dataValues: { userId: userIdPost } } = postAlreadyExists;
  if (userIdPost !== userId) throw errorUnauthorizedUser;

  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostByIds,
  editPost,
  deletePost,
};
