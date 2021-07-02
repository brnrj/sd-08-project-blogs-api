const router = require('express').Router();
const UsersControllers = require('../controllers/UserControllers');
const { validateJWT } = require('../auth/validatJWT');

router.post('/', UsersControllers.CreateUser);
router.get('/', validateJWT, UsersControllers.ListUsers);
router.get('/:id', validateJWT, UsersControllers.ListUsersById);

module.exports = router;