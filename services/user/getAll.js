const { User } = require('../../models');

module.exports = async () => User.findAll();