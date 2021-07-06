const { Category } = require('../../database/models');

module.exports = {
  async execute({ name }) {
    const category = await Category.create({
      name,
    });

    console.log(category);

    return category;
  },
};
