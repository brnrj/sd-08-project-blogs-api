const express = require('express');
const UsersControllers = require('../controllers/Users');

const router = express.Router();

router.post('/', UsersControllers.createUser);

module.exports = router;