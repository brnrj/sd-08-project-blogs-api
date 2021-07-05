const router = require('express').Router();

const useController = require('../controller/user.controller');

router.post('/', useController.add);
router.get('/', useController.getAll);
router.get('/:id', useController.find);

module.exports = router;
