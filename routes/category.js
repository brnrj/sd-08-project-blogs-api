const router = require('express').Router();
const { validationToken } = require('../middlewares');
const { 
  createCategory,
  getAllCategories,
} = require('../controllers');

router.route('/')
  .get(validationToken, getAllCategories)
  .post(validationToken, createCategory)
  .put()
  .delete();

module.exports = router;
