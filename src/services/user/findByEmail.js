const { User } = require('../../database/models');

module.exports = async (email) => User.findOne({ where: { email } });
