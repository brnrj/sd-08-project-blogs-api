const express = require('express');
const { getToken } = require('../middlewares/auth');
const { Category } = require('../models');

const router = express.Router();

const BAD_REQUEST = 400;
const CREATED = 201;
const OK = 200;

router.post('/', getToken, async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(BAD_REQUEST).json({ message: '"name" is required' });
    const category = await Category.create(name);
    res.status(CREATED).json({ ...category.dataValues, name });
});

router.get('/', getToken, async (req, res) => {
    const categories = await Category.findAll();
    res.status(OK).json(categories);
});

module.exports = router;