const { Category } = require('../models');

// const validations = require('../helpers/validations');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');

const result = (status, response) => ({ status, response });

const incompleteData = (data) => {
  const { badRequest } = statusCode;
  const { noContent, noCategoryIds, noTitle } = errors;
  if (!data.title) return result(badRequest, noTitle);
  if (!data.content) return result(badRequest, noContent);
  if (!data.categoryIds) return result(badRequest, noCategoryIds);
  return null;
};

const invalidCategoryIds = async (ids) => {
  const { badRequest } = statusCode;
  const { categoryIdNotFound } = errors;

  const allIds = await Category.findAll({ where: { id: ids } });
  if (allIds.length !== ids.length) return result(badRequest, categoryIdNotFound);

  return null;
};

module.exports = {
  incompleteData,
  invalidCategoryIds,
};
