const router = require('express').Router();
const LoginControllers = require('../controllers/LoginControllers');

router.post('/', LoginControllers.loginUser);

module.exports = router;