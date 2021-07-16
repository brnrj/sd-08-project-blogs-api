const express = require('express');
const { Categories } = require('../models');
const { validateCategorie } = require('../schema');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  try {
    const { name } = req.body;
    const invalid = validateCategorie(name);
    if (invalid) return res.status(invalid.status).json({ message: invalid.message });

    const newCategorie = await Categories.create({ name });

    return res.status(201).json({ name: newCategorie.name });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/', validateJWT, async (req, res) => {
  const categories = await Categories.findAll();
  if (!categories) res.status(401).json({ message: 'Algo deu errado' });

  return res.status(200).json(categories);
});

module.exports = router;
