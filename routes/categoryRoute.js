const express = require('express');
const categoryContoller = require('../controllers/categoryContoller');
// const { validEmail } = require('../middlewares/validateEmail');
const { validCategoryName } = require('../middlewares/validateNameCategory');
// const { validPassword } = require('../middlewares/validatePassword');
const { validToken } = require('../middlewares/auth/validateJWT');

const router = express.Router();

router.use(express.json());

router.post(
  '/categories',
  validCategoryName,
  validToken,
  categoryContoller.addCategory,
);
router.get('/categories', validToken, categoryContoller.getAllCategories);

module.exports = router;
