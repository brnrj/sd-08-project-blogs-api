const service = require('../services/Categories');

const createCategory = async (req, res) => {
  const newCategory = req.body;
  const token = req.headers.authorization;
  const { status, result } = await service.createCategory(newCategory, token);
  return res.status(status).json(result);
};

const getCategories = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { status, result } = await service.getCategories(token, id);
  return res.status(status).json(result);
};

module.exports = { createCategory, getCategories };
