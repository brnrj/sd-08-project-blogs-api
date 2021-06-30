const router = require('express').Router();
const rescue = require('express-rescue');
const middleware = require('../middlewares');
const controllerUser = require('../controllers/controllerUser');
const controllerLogin = require('../controllers/controllerLogin');

router.post('/user', rescue(controllerUser.controllerAdd));
router.post('/login', rescue(controllerLogin.login));
router.get('/user', [rescue(middleware.authentication), rescue(controllerUser.getAll)]);

module.exports = router;
