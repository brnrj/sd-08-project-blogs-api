const { User } = require('../../database/models');

module.exports = async () => User.findAll();
