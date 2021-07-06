const { Category } = require('../../database/models');

module.exports = {
  async execute() {
    const allCategory = await Category.findAll();

    if (allCategory) return allCategory;

    return false;
  },
};