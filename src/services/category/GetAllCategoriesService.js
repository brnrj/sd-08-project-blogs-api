const { Categorie } = require('../../database/models');

module.exports = {
  async execute() {
    const allCategories = await Categorie.findAll();

    if (allCategories) return allCategories;

    return false;
  },
};