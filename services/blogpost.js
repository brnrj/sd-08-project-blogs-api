const { Op } = require('sequelize');
const { BlogPost, Categorie, PostsCategories, User } = require('../models');

const validations = require('../validations/blogpost');
const decodeToken = require('../helper/decodeToken');

const createPost = async (post, token) => {
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

  await PostsCategories.bulkCreate(postCategories);

  const { published, updated, ...response } = created.dataValues;
  return { ...response };
};

const getPosts = async () => BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

const getPostById = async (id) => {
  const blogpost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  validations.blogExists(blogpost);
  return blogpost;
};

const updatePostById = async (id, token, newPost) => {
  const user = decodeToken(token);
  const blogPost = await getPostById(id);

  validations.updatePostBody(newPost);
  validations.userHavePermission(blogPost, user);

  await BlogPost.update(
    { ...newPost },
    { where: { id } },
  );

  const abc = {
    ...blogPost.dataValues,
    ...newPost,
    user: blogPost.dataValues.user.dataValues,
  };

  return abc;
};

const deletePostById = async (id, token) => {
  const user = decodeToken(token);
  const blogPost = await getPostById(id);

  validations.userHavePermission(blogPost, user);

  const deleted = await BlogPost.destroy({ where: { id } });

  console.log('deleted ----------------------------------------------------',
  deleted);
};

const searchPost = async (string) => BlogPost.findAll(
    {
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${string}%` } },
          { content: { [Op.like]: `%${string}%` } },
        ],
      },
      include: [
        { model: User, as: 'user' },
        { model: Categorie, as: 'categories', through: { attributes: [] } },
      ],
    },
    
  );

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  searchPost,
};