const { Category } = require('../models');
const { 
  validateToken,
  validateName,
} = require('../validations');

const create = async (token, reqBody) => {
  validateToken(token);
  validateName.missingName(reqBody.name);

  const category = await Category.create(reqBody);

  return category;
};

module.exports = {
  create,
};
