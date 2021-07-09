const nameValidator = require('./nameValidator');
const emailValidator = require('./emailValidator');
const passwordValidator = require('./passwordValidator');
const tokenGenerator = require('./tokenGenerator');
const tokenValidator = require('./tokenValidator');

module.exports = {
  nameValidator,
  emailValidator,
  passwordValidator,
  tokenGenerator,
  tokenValidator,
};
