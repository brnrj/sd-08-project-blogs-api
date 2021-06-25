const express = require('express');
const { Categories } = require('../models');
const tokenValidation = require('../middlewares/tokenAuth');

const router = express.Router();

router.post('/', tokenValidation, async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });
    const newCategory = await Categories.create({ name });

    return res.status(201).json(newCategory);
});

module.exports = router;
