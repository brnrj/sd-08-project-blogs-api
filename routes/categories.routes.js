const router = require('express').Router();

const useController = require('../controller/categoryController');

const auth = require('../middleware/auth');

router.post('/', auth, useController.create);
router.get('/', auth, useController.findAllCat);

module.exports = router;
