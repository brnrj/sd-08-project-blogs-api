const { Categorie } = require('../../database/models');

module.exports = {
  async execute({ name }) {
    const category = await Categorie.create({
      name,
    });

    return category;
  },
};
