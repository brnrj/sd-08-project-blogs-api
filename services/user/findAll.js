const { User: UserModel } = require('../../models');

module.exports = async (options) => UserModel.findAll(options);
