const router = require('express').Router();

const useController = require('../controller/userController');
const auth = require('../middleware/auth');

router.post('/', useController.createUser);
router.get('/', auth, useController.findAllUsers);
router.get('/:id', auth, useController.findOneUser);
router.delete('/me', auth, useController.removeUser);

module.exports = router;
