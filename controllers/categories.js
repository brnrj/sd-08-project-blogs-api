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

const getAllCategories = async (req, res) => {
  try {
    const result = await category.getAll();
    res.status(STATUS.ok).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS.fatalErr).json({ message: 'Algo deu errado.' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
