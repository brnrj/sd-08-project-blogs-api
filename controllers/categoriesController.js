const express = require('express');
const { Categories } = require('../models');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const allCategories = await Categories.findAll();
    res.status(200).json(allCategories);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;