const { categorySchema } = require('../schema/CategorySchema');
const { postSchema } = require('../schema/PostSchema');
const { categoryExists } = require('./validations');

const validateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    await categorySchema.validate({ name });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

const validatePost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    await postSchema.validate({ title, content, categoryIds });
    await categoryExists(req, res, next);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

module.exports = {
  validateCategory,
  validatePost,
};