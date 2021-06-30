const express = require('express');
const validateNewUser = require('../middlewares/validateNewUser');
const { User } = require('../models');
const { createsUser } = require('../src/controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  User.findAll().then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

router.post('/', validateNewUser, createsUser);

module.exports = router;
