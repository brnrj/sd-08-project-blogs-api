const router = require('express').Router();
const { PostController } = require('../controllers');
const AuthMiddleware = require('../middlewares/authMiddleware');

router.post('/', AuthMiddleware, PostController.create);
// router.get('/', AuthMiddleware, UserController.getAll);
// router.get('/:id', AuthMiddleware, UserController.getById);

module.exports = router;
