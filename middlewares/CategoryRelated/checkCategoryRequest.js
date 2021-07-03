const { BAD_REQUEST, CONFLICT } = require('../../utils/errors');
const { Category: CategoryModel } = require('../../models');
const stringyErr = require('../../utils/stringfy');

const { Categories: { Register: { nameRequired } } } = BAD_REQUEST;
const { Category: { categoryNotUnique } } = CONFLICT;

const verifyRequestCampExists = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw new Error(stringyErr(BAD_REQUEST, nameRequired));
    next(req, res);
  } catch (e) {
    console.table('Middlewares, CategoryRelated, verifyRequestCampExists');
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyIfNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const searchCatName = await CategoryModel.findOne({ where: { name } });
    console.log(searchCatName, 'verifyIfNewCategory');
    if (searchCatName !== null) throw new Error(stringyErr(CONFLICT, categoryNotUnique));
    next();
  } catch (e) {
    console.log('Middlewares, CategoryRelated, verifyIfNewCategory');
    console.log(e.message);
    const errorCore = JSON.parse(e.message);
    res.status(errorCore.status).send(errorCore.message);
  }
};

const verifyCategoryRequest = (req, res, next) => {
  const checkIfNewCat = () => verifyIfNewCategory(req, res, next);
  verifyRequestCampExists(req, res, checkIfNewCat);
};

module.exports = verifyCategoryRequest;
