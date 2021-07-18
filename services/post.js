const { Post: PostModel, sequelize } = require('../models');
const { PostSchema, UpdatePostSchema } = require('../schema');
// const { customError } = require('../utils');

const createOne = async (newPost) => {
  const { error } = PostSchema.validate(newPost);

  if (error) return { err: { code: 'invalidData', message: error.details[0].message } };

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
  
  if (!post) return { err: { code: 'notFound', message: 'Post does not exist' } };

  return post;
};

const updateById = async (id, obj, userId) => {
  const post = await findById(id);
  // console.log('post line 43: ', post);

  if (!post) return { err: { code: 'notFound', message: 'Post does not exist' } };

  if (userId !== post.userId) {
    return { err: { code: 'unauthorized', message: 'Unauthorized user' } };
  }

  if (obj.categoryIds) {
    return { err: { code: 'invalidData', message: 'Categories cannot be edited' } };
  }

  const { error } = UpdatePostSchema.validate(obj);
  if (error) return { err: { code: 'invalidData', message: error.details[0].message } };
  
  await PostModel.update({ content: obj.content, title: obj.title }, { where: { id } });
  const newPost = await findById(id);
  // console.log('newPost line 55: ', newPost);
  return newPost.dataValues;
};

const deleteById = async (postId, userId) => {
  const post = await findById(postId);
  console.log('post line 66: ', post);
  if (post.err) return { err: { code: 'notFound', message: 'Post does not exist' } };

  const getAuthorization = async () => {
    const userPost = await findById(postId);
  
    return userPost.userId === userId;
  };

  const isAuthorized = await getAuthorization();
  console.log('isAuthorized line 70: ', isAuthorized);
  if (!isAuthorized) return { err: { code: 'unauthorized', message: 'Unauthorized user' } };
  return sequelize.transaction(async (transaction) => post.destroy({ transaction }));
};

module.exports = {
  createOne,
  findAll,
  findById,
  updateById,
  deleteById,
};
