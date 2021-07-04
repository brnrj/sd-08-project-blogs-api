const express = require('express');
const middleware = require('../middleware');
const { User } = require('../../models');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', middleware.validateToken, (_req, res) => {
  User.findAll().then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

router.post('/', middleware.validateNewUser, async (req, res) => {
    await controllers.user(req, res);
});

module.exports = router;