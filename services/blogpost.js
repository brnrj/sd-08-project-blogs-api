const { BlogPost, User, Category } = require('../models/index');

const OK = 200;
const INTERNAL = 500;

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
  getAll,
};
