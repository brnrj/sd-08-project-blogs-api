const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../middleware/validadeJWT');

const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', validateJWT, rescue(categoriesController.getAll));
router.post('/', validateJWT, rescue(categoriesController.create));

module.exports = router;