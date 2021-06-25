const express = require('express');
const { User } = require('../models');

const router = express.Router();
const { userValidation } = require('../middlewares');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;

router.use(userValidation);

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(CONFLICT).json({ message: 'User already registered' });
    await User.create(req.body);
    res.status(CREATED).json({ token: 'asdbasdbaskdbasjkdbasjk' });
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: error.message });
  }
});

module.exports = router;
