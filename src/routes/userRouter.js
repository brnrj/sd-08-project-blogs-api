const express = require('express');
const middleware = require('../middleware');
const { User } = require('../../models');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', (_req, res) => {
  User.findAll().then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

router.post('/', async (req, res, next) => {
  middleware.validateNewUser(req, res, next);
  try {
    await controllers.createsUser(req, res);
  } catch (error) {
    return error;
  }
});

module.exports = router;