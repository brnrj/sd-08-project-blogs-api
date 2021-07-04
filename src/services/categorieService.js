const { Categorie } = require('../models');

async function getAllCategorie() {
  try {
    const allCategories = await Categorie.findAll().then((categories) => categories);
    return allCategories;
  } catch (err) {
    console.log(err.message);
  }
}
async function createCategorie(data) {
  try {
    const categoryCreated = await Categorie.create(data);
    return categoryCreated;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { createCategorie, getAllCategorie };
