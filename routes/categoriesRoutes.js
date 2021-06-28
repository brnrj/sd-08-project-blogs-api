const express = require('express');
const { validateJWT } = require('../middleware/validateJWT');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.post('/', validateJWT, categoriesController.create);
router.get('/', validateJWT, categoriesController.getAll);

module.exports = router;
