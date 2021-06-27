const { Category } = require('../models/index');

const CREATED = 201;

const post = async (req, res) => {
  const createdCategory = await Category.create(req.body);
  console.log(createdCategory);
  res.status(CREATED).json(createdCategory);
};

module.exports = {
  post,
};
