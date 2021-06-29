const router = require('express').Router();
const rescue = require('express-rescue');
const controllerUser = require('../controllers/controllerUser');

router.post('/user', rescue(controllerUser.controllerAdd));

module.exports = router;
