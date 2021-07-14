const express = require('express');
const UsersControllers = require('../controllers/Users');
const validate = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/', UsersControllers.createUser);
router.get('/', validate.jwtValidate, UsersControllers.findAll);

module.exports = router;