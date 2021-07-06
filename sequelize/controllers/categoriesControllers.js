const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { validateCategory } = require('../middlewares/postValidation');
const { Categories } = require('../models');

const router = express.Router();
router.post('/', validateToken, validateCategory, (req, res) => {
  const { name } = req.body;
  Categories.create({ name })
  .then(((category) => 
    res.status(201).json(category)
  ));
});

router.get('/', validateToken, (req, res) => {
  Categories.findAll()
  .then(((category) => 
    res.status(200).json(category)
  ));
});

module.exports = router;