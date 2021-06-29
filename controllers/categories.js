const category = require('../services/categories');
const { STATUS } = require('../config/messages');

const createCategory = async (req, res) => {
  const { body } = req;
  try {
    const result = await category.createCategory(body);
    res.status(STATUS.created).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS.badRequest).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
};
