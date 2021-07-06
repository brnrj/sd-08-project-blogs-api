const express = require('express');
const rescue = require('express-rescue');

const { User } = require('../models');
const { validateLogin, createToken } = require('../middlewares');

const router = express.Router();

router.post('/', validateLogin, createToken,
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (!user) throw Error('Invalid fields');
    return res.status(200).json({ token: res.token });
  }));

module.exports = router;
