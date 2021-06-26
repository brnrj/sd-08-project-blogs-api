const express = require('express');
const { User } = require('../models');
const { loginValidation } = require('../middlewares');

const router = express.Router();

const OK = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

router.use(loginValidation);

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    console.log(user);
    if (!user) return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
    res.status(OK).json({ token: 'token' });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = router;