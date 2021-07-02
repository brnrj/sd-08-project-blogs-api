const router = require('express').Router();
const rescue = require('express-rescue');
const middleware = require('../middlewares');
const controllerUser = require('../controllers/controllerUser');
const controllerLogin = require('../controllers/controllerLogin');
const controllerCategorie = require('../controllers/controllerCategorie');
const controllerBlogPosts = require('../controllers/controllerBlogPost');

router.post('/user', rescue(controllerUser.controllerAdd));
router.post('/login', rescue(controllerLogin.login));
router.get('/user', [rescue(middleware.authentication), rescue(controllerUser.getAll)]);
router.get('/user/:id', [rescue(middleware.authentication), rescue(controllerUser.getById)]);
router.post('/categories', 
  [
    rescue(middleware.authentication), 
    rescue(controllerCategorie.addCategorie),
  ]);
router.get('/categories',
  [
    rescue(middleware.authentication),
    rescue(controllerCategorie.getAll),
  ]);
router.post('/post',
  [
    rescue(middleware.authentication),
    rescue(controllerBlogPosts.addPost),
  ]);
router.get('/post/search', 
  [
    rescue(middleware.authentication),
    rescue(controllerBlogPosts.search),
  ]);
router.get('/post', 
  [
    rescue(middleware.authentication),
    rescue(controllerBlogPosts.getAll),
  ]);
router.get('/post/:id',
  [
    rescue(middleware.authentication),
    rescue(controllerBlogPosts.getById),
  ]);
router.put('/post/:id', 
  [
    rescue(middleware.authentication),
    rescue(controllerBlogPosts.postUpdate),
  ]);
router.delete('/post/:id',
  [
    rescue(middleware.authentication),
    rescue(controllerBlogPosts.deletePost),
  ]);
router.delete('/user/me', 
  [
    rescue(middleware.authentication),
    rescue(controllerUser.deleteUse),
  ]);
module.exports = router;
