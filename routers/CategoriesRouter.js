const router = require('express').Router();
const CategoriesControllers = require('../controllers/CategoriesControllers');
const { validateJWT } = require('../auth/validatJWT');

router.post('/', validateJWT, CategoriesControllers.AddCategories);
router.get('/', validateJWT, CategoriesControllers.ListCategories);

module.exports = router;
