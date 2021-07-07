const models = require('../models');

const CREATE = 201;
const SUCCESS = 200;
const ERROR = 500;
const BAD_REQUEST = 400;

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) res.status(BAD_REQUEST).json({ message: '"name" is required' });
  
  try {
    const newCategory = await models.Categories.create({ name });
    return res.status(CREATE).json(newCategory);
  } catch (error) {
    return res.status(ERROR).send();
  }
};
const getCategories = async (req, res) => {
  const categories = await models.Categories.findAll();
  return res.status(SUCCESS).json(categories);
};
module.exports = { createCategory, getCategories };