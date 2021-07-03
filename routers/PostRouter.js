const router = require('express').Router();
const PostServices = require('../controllers/PostControllers');
const { validateJWT } = require('../auth/validatJWT');

router.post('/', validateJWT, PostServices.CreatePost);
router.get('/', validateJWT, PostServices.ListPosts);

module.exports = router;