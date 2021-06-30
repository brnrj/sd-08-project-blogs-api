const router = require('express').Router();
const rescue = require('express-rescue');
const middleware = require('../middlewares');
const controllerUser = require('../controllers/controllerUser');
const controllerLogin = require('../controllers/controllerLogin');
const controllerCategorie = require('../controllers/controllerCategorie');

router.post('/user', rescue(controllerUser.controllerAdd));
router.post('/login', rescue(controllerLogin.login));
router.get('/user', [rescue(middleware.authentication), rescue(controllerUser.getAll)]);
router.get('/user/:id', [rescue(middleware.authentication), rescue(controllerUser.getById)]);
router.post('/categories', 
  [
    rescue(middleware.authentication), 
    rescue(controllerCategorie.addCategorie),
  ]);
router.get('/categories',
  [
    rescue(middleware.authentication),
    rescue(controllerCategorie.getAll),
  ]);
module.exports = router;
