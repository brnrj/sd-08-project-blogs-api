const { Category: CategoryModel } = require('../models');

const createNewCategory = async (name) => {
  try {
    const creatingCategory = await CategoryModel.create({ name });
    console.log(creatingCategory);
    return creatingCategory;
  } catch (e) {
    console.log(e.message, 'CategoryServices, createNewCategory');
    return e.message;
  }
};

module.exports = { createNewCategory };
