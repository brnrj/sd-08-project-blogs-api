const router = require('express').Router();
const { UserController } = require('../controllers');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.post('/', UserController.create);
router.get('/', AuthMiddleware, UserController.getAll);
router.get('/:id', AuthMiddleware, UserController.getById);
router.delete('/me', AuthMiddleware, UserController.destroy);

module.exports = router;
