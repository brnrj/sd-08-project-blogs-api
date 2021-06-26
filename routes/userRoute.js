// 1 - Sua aplicação deve ter o endpoint POST /user
// 3 - Sua aplicação deve ter o endpoint GET /user
// 4 - Sua aplicação deve ter o endpoint GET /user/:id
// 12 - Sua aplicação deve ter o endpoint DELETE /user/me

const express = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../middlewares/auteMiddleware');

const router = express.Router();
const USERME = '/user/me';
const USERID = '/user/:id';
const USER = '/user';

router.post(USER, userController.createUser);
router.get(USER, auth, userController.getAllUsers);
router.get(USERID, auth, userController.getUserById);
router.delete(USERME, auth, userController.deleteUser);

module.exports = router;
