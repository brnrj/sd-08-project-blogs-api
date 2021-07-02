const { Category: CategoryModel } = require('../models');

const createNewCategory = async (name) => {
  try {
    const creatingCategory = await CategoryModel.create({ name });
    return creatingCategory;
  } catch (e) {
    console.log(e.message, 'CategoryServices, createNewCategory');
    return e.message;
  }
};

const searchAllCatgs = async () => {
  try {
    const searchAllCg = await CategoryModel.findAll();
    return searchAllCg;
  } catch (e) {
    console.log(e.message, 'CategoryServices, searchAllCatgs');
    return e.message;
  }
};

const searchSpecificCatg = async (id) => {
  try {
    const searchSpecificCg = await CategoryModel.findOne({ where: { id } });
    return searchSpecificCg;
  } catch (e) {
    console.log(e.message, 'CategoryServices, searchSpecificCatg');
    return e.message;
  }
};

module.exports = { createNewCategory, searchAllCatgs, searchSpecificCatg };
