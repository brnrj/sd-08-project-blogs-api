const router = require('express').Router();

const useController = require('../controller/userController');

router.post('/', useController.login);

module.exports = router;
