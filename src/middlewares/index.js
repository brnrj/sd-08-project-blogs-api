const loginDataValidation = require('./loginDataValidation');
const postCreateDataValidation = require('./postCreateDataValidation');
const postDeleteValidation = require('./postDeleteValidation');
const postUpdateDataValidation = require('./postUpdateDataValidation');
const tokenValidation = require('./tokenAuth');
const userDataValidation = require('./userDataValidation');

module.exports = {
  loginDataValidation,
  postCreateDataValidation,
  postDeleteValidation,
  postUpdateDataValidation,
  tokenValidation,
  userDataValidation,
};
