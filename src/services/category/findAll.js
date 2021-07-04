const { Category } = require('../../database/models');

module.exports = async () => Category.findAll();
