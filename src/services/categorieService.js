const { Categorie } = require('../models');

async function createCategorie(data) {
  try {
    const categoryCreated = await Categorie.create(data);
    return categoryCreated;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { createCategorie };
