const express = require('express');
const validateNewUser = require('../middlewares/validateNewUser');
const { createsUser, getsAllUsers, getsUserById } = require('../src/controllers/userController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, getsAllUsers);
router.get('/:id', validateToken, getsUserById);
router.post('/', validateNewUser, createsUser);

module.exports = router;
