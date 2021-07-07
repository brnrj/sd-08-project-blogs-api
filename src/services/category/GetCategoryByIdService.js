const { Categorie } = require('../../database/models');

module.exports = {
  async execute(id) {
    const categoryById = await Categorie.findByPk(id);

    if (categoryById) return categoryById;

    return false;
  },
};
