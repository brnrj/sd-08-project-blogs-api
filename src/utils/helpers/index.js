const nameValidator = require('./nameValidator');
const emailValidator = require('./emailValidator');
const passwordValidator = require('./passwordValidator');
const tokenGenerator = require('./tokenGenerator');
const tokenValidator = require('./tokenValidator');
const titleValidator = require('./titleValidator');
const contentValidator = require('./contentValidator');
const categoryIdsValidator = require('./categoryIdsValidator');
const decodeToken = require('./decodeToken');

module.exports = {
  nameValidator,
  emailValidator,
  passwordValidator,
  tokenGenerator,
  tokenValidator,
  titleValidator,
  contentValidator,
  categoryIdsValidator,
  decodeToken,
};
