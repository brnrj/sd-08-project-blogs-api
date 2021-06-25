const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');
const userValidation = require('../services/userValidation');

const secret = process.env.SECRET;
const router = express.Router();

router.post('/', async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const validation = userValidation.validation(displayName, email, password);
    if (validation) return res.status(validation.code).json({ message: validation.message });

    const verifyIfExists = await User.findOne({
      where: { email },
    });
    if (verifyIfExists) res.status(409).json({ message: 'User already registered' });

    await User.create({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return res.status(201).json({ token });
});

module.exports = router;
