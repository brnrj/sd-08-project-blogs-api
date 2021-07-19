const router = require('express').Router();
const { UserController } = require('../controllers');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.post('/', UserController.create);
router.get('/', AuthMiddleware, UserController.getAll);
router.get('/:id', AuthMiddleware, UserController.getById);

module.exports = router;
