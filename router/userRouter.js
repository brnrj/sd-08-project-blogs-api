const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

console.log('aquiRouter');
router.post('/user', userController.createUsers);

module.exports = router;
