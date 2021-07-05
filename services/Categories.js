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

module.exports = { createCategory };
