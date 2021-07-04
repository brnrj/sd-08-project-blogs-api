const serviceCategorie = require('../services/categorieService');

async function getAllCategorie(_req, res) {
  const allCategories = await serviceCategorie.getAllCategorie();
  res.status(200).json(allCategories);
}

async function createCategorie(req, res) {
  const data = req.body;
  const categoryCreated = await serviceCategorie.createCategorie(data);
  res.status(201).json(categoryCreated);
}

module.exports = { createCategorie, getAllCategorie };
