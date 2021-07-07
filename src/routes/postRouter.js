const express = require('express');
const middleware = require('../middleware');
const controllers = require('../controllers');

const router = express.Router();

router.get('/:id', middleware.validateToken, async (req, res) => {
  console.log('Pesquisando ID');
  await controllers.blogPost.findById(req, res);
});
router.get('/', middleware.validateToken, async (_req, res) => {
  await controllers.blogPost.findAll(_req, res);
});

router.post('/', middleware.validateToken, middleware.validateBlogPost, async (req, res) => {
    await controllers.blogPost.createsBlogPost(req, res);
});

module.exports = router;