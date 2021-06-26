const express = require('express');
const { User } = require('../models');
const { userValidation } = require('../middlewares');

const router = express.Router();

const CREATED = 201;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

router.use(userValidation);

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(CONFLICT).json({ message: 'User already registered' });
    await User.create(req.body);
    res.status(CREATED).json({ token: 'asdbasdbaskdbasjkdbasjk' });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = router;
