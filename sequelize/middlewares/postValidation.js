const { categorySchema } = require('../schema/PostSchema');

const validateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    await categorySchema.validate({ name });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

module.exports = {
  validateCategory,
};