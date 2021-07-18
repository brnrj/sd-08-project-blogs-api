const { Post: PostModel, sequelize } = require('../models');
const { PostSchema } = require('../schema');
const { customError } = require('../utils/index');

const createOne = async (newPost) => {
  const { error } = PostSchema.validate(newPost);

  if (error) return customError(error.details[0].message, 'invalidData');

  return sequelize.transaction(async (transaction) => {
    const { title, content, userId } = newPost;

    const post = await PostModel.create(
      { title, content, userId },
      { transaction },
    );

    return { id: post.id, userId, title, content };
  });
};

const findAll = async () => PostModel.findAll({
  include: [
    'user',
    { association: 'categories', through: { attributes: [] } },
  ],
});

const findById = async (id) => {
  const post = await PostModel.findByPk(id, {
    include: [
      'user',
      { association: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return customError('Post does not exist', 'notFound');

  return post;
};

const updateById = async (id, obj, userId) => {
  const post = await findById(id);
  console.log('post line 43: ', post);
  if (!post) return customError('Post does not exist', 'notFound');
  if (userId !== post.userId) {
    return customError('Unauthorized user', 'unauthorized');
    // return { error: { code: 'unauthenticated', message: 'Unauthorized user' } };
  }
  if (obj.categoryIds) {
    return customError('Categories cannot be edited', 'invalidData');
    // return { error: { code: 'badRequest', message: 'Categories cannot be edited' } };
  }

  await PostModel.update({ content: obj.content, title: obj.title }, { where: { id } });
  const newPost = await findById(id);
  console.log('newPost line 55: ', newPost);
  return { ...obj };
};

module.exports = {
  createOne,
  findAll,
  findById,
  updateById,
};
