const { NOT_FOUND } = require('../../utils/errors');

const { Category: { categoryNotFound } } = NOT_FOUND;
const { Category: CategoryModel } = require('../../models');
const stringyErr = require('../../utils/stringfy');

const verifyIfCatgIdMatches = async (req, res, next) => {
  try {
    const { id } = req.params;
    const searchCategoryId = await CategoryModel.findOne({ where: { id } });
    if (searchCategoryId === null) throw new Error(stringyErr(NOT_FOUND, categoryNotFound));
    return next();
  } catch (e) {
    console.log(e.message, 'Middlewares, CategoryRelated, verifyIfCatgIdMatches');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

module.exports = verifyIfCatgIdMatches;
