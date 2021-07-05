const { StatusCodes: HTTP } = require('http-status-codes');

const { Categories } = require('../models');
const { categorySchema, tokenValidation } = require('./validation');

const generateError = require('../utils/generateError');

const createCategory = async (category, token) => {
  try {
    const isInvalid = categorySchema.validate(category).error;
    tokenValidation(token);

    if (isInvalid) {
      throw generateError(isInvalid.details[0].message);
    }

    const createdCategory = await Categories.create(category);
    console.log(createdCategory);

    return { status: HTTP.CREATED, result: createdCategory };
  } catch (err) {
    return err;
  }
};

const getCategories = async (token, id) => {
  try {
    tokenValidation(token);
    let responseData;

    if (!id) {
      responseData = await Categories.findAll();
    } else {
      responseData = await Categories.findOne({ where: { id } });
      if (!responseData) {
        throw generateError('Category does not exist', HTTP.NOT_FOUND);
      }
    }

    return { status: HTTP.OK, result: responseData };
  } catch (err) {
    return err;
  }
};

module.exports = { createCategory, getCategories };
