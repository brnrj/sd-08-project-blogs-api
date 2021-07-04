const serviceCategorie = require('../services/categorieService');

async function createCategorie(req, res) {
  const data = req.body;
  const categoryCreated = await serviceCategorie.createCategorie(data);
  res.status(201).json(categoryCreated);
}

module.exports = { createCategorie };
