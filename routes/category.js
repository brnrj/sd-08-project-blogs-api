const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const CategoryValidator = require('../validators/CategoryValidator');

router.post(
  '/categories',
  CategoryValidator.createCategory,
  CategoryController.addCategory,
);

module.exports = router;
