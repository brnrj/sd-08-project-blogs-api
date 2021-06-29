const { Categorie } = require('../models');

async function createCategorie(name) {
    if (!name) throw new Error('"name" is required');
    const data = await Categorie.create({ name });
    return data;
}

async function getAllCategories() {
    const data = await Categorie.findAll();
    return data;
}

module.exports = {
    createCategorie,
    getAllCategories,
};
