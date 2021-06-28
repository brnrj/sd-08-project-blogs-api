const { categoriesService } = require('../services');
const { httpStatusCode } = require('../../constants');
const CustomErr = require('../utils');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newCategory = await categoriesService.createCategory(name);
    return res.status(httpStatusCode.CREATED).send(newCategory);
  } catch (error) {
    return next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const categoryFound = await categoriesService.getCategory();
    if (!categoryFound) throw new CustomErr(httpStatusCode.NOT_FOUND, 'Category not found');
    return res.status(httpStatusCode.OK).send(categoryFound);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCategory,
  getCategory,
};
