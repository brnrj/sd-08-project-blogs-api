const { joiValidate } = require('./joiValidate');

const {
  createUserValidate,
  createCategoryValidate,
  loginValidate,
  createPostValidate,
  editPostValidate,
} = require('./schemas');

module.exports = {
  createUserValidate,
  createCategoryValidate,
  editPostValidate,
  loginValidate,
  joiValidate,
  createPostValidate,
};
