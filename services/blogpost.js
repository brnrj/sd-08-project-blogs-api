const { BlogPost, User, Category, PostCategory } = require('../models/index');

const OK = 200;
const CREATED = 201;
const INTERNAL = 500;

const post = async (req, res) => {
    const { id: userId } = req.user;
    const { title, content, categoryIds } = req.body;
    const createdPost = await BlogPost.create({
      title, content, userId,
    });
    Promise.all(categoryIds.map(async (categoryId) => PostCategory
      .create({ categoryId, postId: createdPost.id })));
    res.status(CREATED).json(createdPost);
};

const getAll = async (_req, res) => {
  try {
    const postList = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { excludes: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    res.status(OK).json(postList);
  } catch (err) {
    res.status(INTERNAL).json({ message: err.message });
  }
};

module.exports = {
  post,
  getAll,
};
