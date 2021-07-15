const ErrorsUser = require('./ErrorsUser');
const ErrorsLogin = require('./ErrorsLogin');
const { validateUser, validateCategory } = require('./ErrorsBlogPost');
const ErrorsUserDelete = require('./ErrorsUserDelete');

module.exports = { ErrorsUser, ErrorsLogin, ErrorsUserDelete, validateUser, validateCategory };
