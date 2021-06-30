const { Category } = require('../models/index');

const OK = 200;
const CREATED = 201;

const post = async (req, res) => {
  const createdCategory = await Category.create(req.body);
  res.status(CREATED).json(createdCategory);
};

const getAll = async (req, res) => {
  const categoryList = await Category.findAll({
    attributes: ['id', 'name'],
  });
  res.status(OK).json(categoryList);
};

module.exports = {
  post,
  getAll,
};
