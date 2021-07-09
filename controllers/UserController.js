const express = require('express');
const { User } = require('../models');

const router = express.Router();
const httpRequestSubmit = 201;
const httpRequestError = 500;
const httpRequestConflict = 409;

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userEmail = await User.findOne({ where: { email } });

  if (userEmail) {
    return res.status(httpRequestConflict).json({ message: 'User already registered' });
  }

  try {
    const user = await User.create({ displayName, email, password, image });
    return res.status(httpRequestSubmit).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(httpRequestError).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
