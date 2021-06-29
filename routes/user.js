const router = require('express').Router();
const UserController = require('../controllers/UserController');
const UserValidator = require('../validators/UserValidator');

router.post(
  '/user',
  UserValidator.emptyFields,
  UserValidator.validFields,
  UserController.addUser,
);

module.exports = router;
