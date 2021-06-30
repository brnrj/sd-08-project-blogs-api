const rescue = require('express-rescue');
const helpers = require('../../helpers/helpers');

const {
  createServices,
  findServices,
} = require('../../sevices/categories/categories');

const createCategories = rescue(async (req, res, next) => {
  const { name } = req.body;
  const result = await createServices({ name });
  if (result.status) return next(result);
  res.status(helpers.DOU).json(result);
});

const findCategories = rescue(async (_req, res) => {
  const result = await findServices();
  res.status(helpers.DOO).json(result);
});

module.exports = {
  createCategories,
  findCategories,
};
