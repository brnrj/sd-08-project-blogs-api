const express = require('express');
const { User } = require('../models');
const { loginValidation } = require('../middlewares');
const { create } = require('../middlewares/auth');

const router = express.Router();

const OK = 200;
const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

router.use(loginValidation);

router.post('/', loginValidation, create, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    console.log('proxima linha');
    console.log(user);
    if (!user) return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
    const { token } = req;
    res.status(OK).json({ token });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

module.exports = router;
