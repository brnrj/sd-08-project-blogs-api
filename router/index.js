const router = require('express').Router();
const rescue = require('express-rescue');
const controllerUser = require('../controllers/controllerUser');
const controllerLogin = require('../controllers/controllerLogin');

router.post('/user', rescue(controllerUser.controllerAdd));
router.post('/login', rescue(controllerLogin.login));
// router.get('/blogpost', rescue(controllerUser.controllerSelectAll));
module.exports = router;
