const { Category } = require('../../database/models');

module.exports = {
  async execute(id) {
    const categoryById = await Category.findByPk(id);

    if (categoryById) return categoryById;

    return false;
  },
};