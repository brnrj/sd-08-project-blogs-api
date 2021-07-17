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

// const findAll = async () => {
//   const [results] = await sequelize.query(
//     `SELECT
//     Post.id, Post.title, Post.content, Post.published,
//     Post.updated, Post.userId, user.id AS user.id,
//     user.displayName AS user.displayName, user.email AS user.email,
//     user.password AS user.password, user.image AS user.image,
//     categories.id AS categories.id, categories.name AS categories.name,
//     categories->PostsCategories.CategoryId AS categories.PostsCategories.CategoryId,
//     categories->PostsCategories.PostId AS categories.PostsCategories.PostId
//     FROM blogs_api.BlogPosts AS Post LEFT OUTER JOIN Users AS user
//     ON Post.userId = user.id
//     LEFT OUTER JOIN (
//     PostsCategories AS categories->PostsCategories
//     INNER JOIN Categories AS categories
//     ON categories.id = categories->PostsCategories.CategoryId
//     )
//     ON Post.id = categories->PostsCategories.PostId`,
//   );

//   return results;
// };

// const findAll = async () => PostModel.findAll({
//   include: ['user', 'categories'],
// });

const findAll = async () => PostModel.findAll({
  include: [
    'user',
    { association: 'categories', through: { attributes: [] } },
  ],
});

module.exports = {
  createOne,
  findAll,
};
