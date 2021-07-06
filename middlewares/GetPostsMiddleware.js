const { User, Category, BlogPost } = require('../models');

const GetPostsMiddleware = async (req, res) => {
  const data = await BlogPost.findAll({
    include: [
      {
        model: User, attributes: { exclude: ['password'] }, as: 'user',
      },
      {
        model: Category, as: 'categories',
      },
    ],
  });

  return res.status(200).json(data);
};

module.exports = GetPostsMiddleware;