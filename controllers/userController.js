const express = require('express');
const { userValidation } = require('../middlewares');
const { User } = require('../models');

const router = express.Router();

const CONFLICT = 409;
const CREATED = 201;
const INTERNAL_ERROR = 500;

router.post('/', userValidation, async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(CONFLICT).json({ message: 'User already registered' });
        await User.create(req.body);
        res.status(CREATED).json({ token: 'token' });
    } catch (error) {
        res.status(INTERNAL_ERROR).json({ message: error.message });
    }
});

module.exports = router;