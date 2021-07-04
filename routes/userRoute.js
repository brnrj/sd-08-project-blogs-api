const express = require('express');
const userContoller = require('../controllers/userContoller');
const { validEmail } = require('../middlewares/validateEmail');
const { validDisplayName } = require('../middlewares/validateDisplayName');
const { validPassword } = require('../middlewares/validatePassword');

const router = express.Router();

router.use(express.json());

router.get('/user', userContoller.getAllUsers);
router.post('/user', validDisplayName, validEmail, validPassword, userContoller.addUser);

module.exports = router;
